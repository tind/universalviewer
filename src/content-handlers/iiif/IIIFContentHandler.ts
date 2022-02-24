const $ = require("jquery");
require("jsviews")($);
import jQueryPlugins from "./JQueryPlugins";
jQueryPlugins($);
const merge = require("lodash/merge");
import { BaseEvents } from "../../BaseEvents";
import {
  ExtensionLoader,
  IExtension,
} from "./modules/uv-shared-module/IExtension";
import { IIIFExtensionHost } from "./IIIFExtensionHost";
import { IUVData } from "@/IUVData";
import { EventHandlerWithName, PubSub } from "./PubSub";
import {
  RenderingFormat,
  MediaType,
  ExternalResourceType,
} from "@iiif/vocabulary/dist-commonjs/";
import { Helper, loadManifest, IManifoldOptions } from "@iiif/manifold";
import { Annotation, AnnotationBody, Canvas } from "manifesto.js";
import "../../uv.css";
import "./themes/theme.less";
import { IContentHandler } from "@/IContentHandler";
import { IUVOptions } from "@/UniversalViewer";
import { IIIFData } from "./IIIFData";
import { defaultLocale } from "../../Utils";
import BaseContentHandler from "../../BaseContentHandler";

interface IExtensionRegistry {
  [key: string]: ExtensionLoader;
}

// use static paths (not based on variable) so webpack can use publicPath: "auto"
const Extension: IExtensionRegistry = {
  AV: {
    name: "uv-av-extension",
    loader: () =>
      /* webpackMode: "lazy" */ import(
        "./extensions/uv-av-extension/Extension"
      ),
  },
  ALEPH: {
    name: "uv-aleph-extension",
    loader: () =>
      /* webpackMode: "lazy" */ import(
        "./extensions/uv-aleph-extension/Extension"
      ),
  },
  DEFAULT: {
    name: "uv-default-extension",
    loader: () =>
      /* webpackMode: "lazy" */ import(
        "./extensions/uv-default-extension/Extension"
      ),
  },
  EBOOK: {
    name: "uv-ebook-extension",
    loader: () =>
      /* webpackMode: "lazy" */ import(
        "./extensions/uv-ebook-extension/Extension"
      ),
  },
  MEDIAELEMENT: {
    name: "uv-mediaelement-extension",
    loader: () =>
      /* webpackMode: "lazy" */ import(
        "./extensions/uv-mediaelement-extension/Extension"
      ),
  },
  MODELVIEWER: {
    name: "uv-model-viewer-extension",
    loader: () =>
      /* webpackMode: "lazy" */ import(
        "./extensions/uv-model-viewer-extension/Extension"
      ),
  },
  OSD: {
    name: "uv-openseadragon-extension",
    loader: () =>
      /* webpackMode: "lazy" */ import(
        "./extensions/uv-openseadragon-extension/Extension"
      ),
  },
  PDF: {
    name: "uv-pdf-extension",
    loader: () =>
      /* webpackMode: "lazy" */ import(
        "./extensions/uv-pdf-extension/Extension"
      ),
  },
  SLIDEATLAS: {
    name: "uv-openseadragon-extension",
    loader: () =>
      /* webpackMode: "lazy" */ import(
        "./extensions/uv-openseadragon-extension/Extension"
      ),
  },
};

export default class IIIFContentHandler extends BaseContentHandler<IIIFData>
  implements IIIFExtensionHost, IContentHandler<IIIFData> {
  private _extensionRegistry: IExtensionRegistry;
  private _pubsub: PubSub;
  public extension: IExtension | null;
  public isFullScreen: boolean = false;
  public disposed = false;

  constructor(options: IUVOptions) {
    super(options);
    // console.log("create IIIFContentHandler");

    this._pubsub = new PubSub();

    this._init();
    this.resize();
  }

  protected _init(): boolean {
    this._extensionRegistry = {};
    this._extensionRegistry[ExternalResourceType.CANVAS] = Extension.OSD;
    this._extensionRegistry[ExternalResourceType.DOCUMENT] = Extension.PDF;
    this._extensionRegistry[ExternalResourceType.IMAGE] = Extension.OSD;
    this._extensionRegistry[ExternalResourceType.MOVING_IMAGE] =
      Extension.MEDIAELEMENT;
    this._extensionRegistry[ExternalResourceType.PHYSICAL_OBJECT] =
      Extension.MODELVIEWER;
    this._extensionRegistry[ExternalResourceType.SOUND] =
      Extension.MEDIAELEMENT;
    this._extensionRegistry[MediaType.AUDIO_MP4] = Extension.AV;
    this._extensionRegistry[MediaType.DICOM] = Extension.ALEPH;
    this._extensionRegistry[MediaType.DRACO] = Extension.MODELVIEWER;
    this._extensionRegistry[MediaType.EPUB] = Extension.EBOOK;
    this._extensionRegistry[MediaType.GIRDER] = Extension.SLIDEATLAS;
    this._extensionRegistry[MediaType.GLB] = Extension.MODELVIEWER;
    this._extensionRegistry[MediaType.GLTF] = Extension.MODELVIEWER;
    this._extensionRegistry[MediaType.JPG] = Extension.OSD;
    this._extensionRegistry[MediaType.MP3] = Extension.AV;
    this._extensionRegistry[MediaType.MPEG_DASH] = Extension.AV;
    this._extensionRegistry[MediaType.OPF] = Extension.EBOOK;
    this._extensionRegistry[MediaType.PDF] = Extension.PDF;
    this._extensionRegistry[MediaType.USDZ] = Extension.MODELVIEWER;
    this._extensionRegistry[MediaType.VIDEO_MP4] = Extension.AV;
    this._extensionRegistry[MediaType.WEBM] = Extension.AV;
    this._extensionRegistry[RenderingFormat.PDF] = Extension.PDF;

    this.set(this.options.data);

    return true;
  }

  private async _getExtensionByType(
    type: ExtensionLoader,
    format?: string
  ): Promise<any> {
    // previously: /* webpackChunkName: "uv-av-extension" */ /* webpackMode: "lazy" */ "./extensions/uv-av-extension/Extension"
    // const m = (await import(
    //   /* webpackMode: "lazy" */ `./extensions/${name}/Extension`
    // )) as any;
    const m = await type.loader();
    const extension: IExtension = new m.default();
    extension.format = format;
    extension.type = type;
    return extension;
  }

  private _getExtensionByFormat(format: string): any {
    if (!this._extensionRegistry[format]) {
      return this._getExtensionByType(Extension.DEFAULT, format);
    }

    return this._getExtensionByType(this._extensionRegistry[format], format);
  }

  public set(data: IUVData): void {
    this.fire(BaseEvents.SET, data);

    // this.mergeDefaults(data);

    // if this is the first set
    if (!this.extension) {
      if (!data.iiifManifestId) {
        console.warn(`iiifManifestId is required.`);
        return;
      }

      this._reload(data);
    } else {
      // changing any of these data properties forces the UV to reload.
      const newData: IUVData = Object.assign({}, this.extension.data, data);
      if (
        newData.isReload ||
        newData.iiifManifestId !== this.extension.data.iiifManifestId ||
        newData.manifestIndex !== this.extension.data.manifestIndex ||
        newData.collectionIndex !== this.extension.data.collectionIndex
      ) {
        this.extension.data = newData;
        this._reload(this.extension.data);
      } else {
        // no need to reload, just update.
        this.extension.data = newData;
        this.extension.render();
      }
    }
  }

  // public get<T>(key: string): T | undefined {
  //   if (this.extension) {
  //     return this.extension.data[key];
  //   }
  //   return undefined;
  // }

  public publish(event: string, args?: any): void {
    this._pubsub.publish(event, args);
  }

  public subscribe(event: string, handler: any) {
    this._pubsub.subscribe(event, handler);

    return () => {
      this._pubsub.unsubscribe(event, handler);
    };
  }

  public subscribeAll(handler: EventHandlerWithName) {
    this._pubsub.subscribeAll(handler);

    return () => {
      this._pubsub.unsubscribeAll();
    };
  }

  public dispose() {
    // console.log("dispose IIIFContentHandler");
    this._pubsub.dispose();
    this.adapter?.dispose();
    this.disposed = true;
    const $elem: JQuery = $(this.options.target);
    $elem.empty();
    // remove all classes
    $elem.attr("class", "");
  }

  private async _reload(data: IUVData): Promise<void> {
    console.log("_reload");

    this._pubsub.dispose(); // remove any existing event listeners

    data.target = ""; // clear target

    this.subscribe(BaseEvents.RELOAD, (data?: IUVData) => {
      this.fire(BaseEvents.RELOAD, data);
    });

    const $elem: JQuery = $(this.options.target);

    // empty the containing element
    $elem.empty();

    const that = this;

    const helper: Helper = await loadManifest({
      manifestUri: data.iiifManifestId,
      collectionIndex: data.collectionIndex, // this has to be undefined by default otherwise it's assumed that the first manifest is within a collection
      manifestIndex: data.manifestIndex || 0,
      canvasIndex: data.canvasIndex || 0,
      rangeId: data.rangeId,
      locale: data.locales ? data.locales[0].name : undefined,
    } as IManifoldOptions);

    let trackingLabel: string | null = helper.getTrackingLabel();

    if (trackingLabel) {
      trackingLabel +=
        ", URI: " + (window.location !== window.parent.location)
          ? document.referrer
          : document.location;
      window.trackingLabel = trackingLabel;
    }

    let canvas: Canvas | undefined;

    canvas = helper.getCurrentCanvas();

    if (!canvas) {
      that._error(`Canvas ${data.canvasIndex} not found.`);
      return;
    }

    let extension: IExtension | undefined;

    const content: Annotation[] = canvas.getContent();
    let format: string | undefined;

    if (content.length) {
      const annotation: Annotation = content[0];
      const body: AnnotationBody[] = annotation.getBody();

      if (body && body.length) {
        format = body[0].getFormat() as string;

        if (format) {
          extension = await that._getExtensionByFormat(format);

          if (!extension) {
            // try type
            const type: ExternalResourceType | null = body[0].getType();

            if (type) {
              extension = await that._getExtensionByFormat(type);
            }
          }
        } else {
          const type: ExternalResourceType | null = body[0].getType();

          if (type) {
            extension = await that._getExtensionByFormat(type);
          }
        }
      }
    } else {
      const canvasType: ExternalResourceType | null = canvas.getType();

      if (canvasType) {
        // try using canvasType
        extension = await that._getExtensionByFormat(canvasType);
      }

      // if there isn't an extension for the canvasType, try the format
      if (!extension) {
        const format: any = canvas.getProperty("format");
        extension = await that._getExtensionByFormat(format);
      }
    }

    // if using uv-av-extension and there is no structure, fall back to uv-mediaelement-extension
    const hasRanges: boolean = helper.getRanges().length > 0;

    if (extension!.type === Extension.AV && !hasRanges) {
      extension = await that._getExtensionByType(
        Extension.MEDIAELEMENT,
        format
      );
    }

    // if there still isn't a matching extension, use the default extension.
    if (!extension) {
      extension = await that._getExtensionByFormat(Extension.DEFAULT.name);
    }

    data.config = await that._configure(data, extension);

    that._createExtension(extension, data, helper);
  }

  private _error(message: string): void {
    this.fire(BaseEvents.ERROR, message);
  }

  private async _configure(data: IUVData, extension: any): Promise<any> {
    if (!data.locales) {
      data.locales = [];
      data.locales.push(defaultLocale);
    }

    // import the config file
    let config = await extension.loadConfig(data.locales[0].name);

    let promises: Promise<any>[] = [] as any;

    this.fire(BaseEvents.CONFIGURE, {
      config,
      cb: (promise) => {
        promises.push(promise);
      },
    });

    if (promises.length) {
      const configs = await Promise.all(promises);

      const mergedConfigs = configs.reduce((previous, current) => {
        return merge(previous, current);
      });

      config = merge(config, mergedConfigs);
    }

    return config;
  }

  private _createExtension(
    extension: any,
    data: IUVData,
    helper: Helper
  ): void {
    this.extension = extension;
    if (this.extension) {
      this.extension.extensionHost = this;
      this.extension.data = data;
      this.extension.helper = helper;
      this.extension.create();
    }
  }

  public exitFullScreen(): void {
    if (this.extension) {
      this.extension.exitFullScreen();
    }
  }

  public resize(): void {
    if (this.extension && !this.disposed) {
      this.extension.resize();
    }
  }
}
