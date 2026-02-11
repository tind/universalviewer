const $ = window.$;
// import "@webcomponents/webcomponentsjs/webcomponents-bundle.js";
// import "@google/model-viewer/dist/model-viewer-legacy";
import "@google/model-viewer/dist/model-viewer";
import { AnnotationBody, Canvas, IExternalResource } from "manifesto.js";
import { sanitize, debounce } from "../../../../Utils";
import { IIIFEvents } from "../../IIIFEvents";
import { CenterPanel } from "../uv-shared-module/CenterPanel";
import { ModelViewerExtensionEvents } from "../../extensions/uv-model-viewer-extension/Events";
import { Orbit } from "../../extensions/uv-model-viewer-extension/Orbit";
import { Async } from "../../Utils";
import { AnnotationGroup } from "@iiif/manifold";
import ModelViewerExtension from "../../extensions/uv-model-viewer-extension/Extension";
import { Events } from "../../../../Events";
import { Config } from "../../extensions/uv-model-viewer-extension/config/Config";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class ModelViewerCenterPanel extends CenterPanel<
  Config["modules"]["modelViewerCenterPanel"]
> {
  $modelviewer: JQuery;
  $spinner: JQuery;

  isLoaded: boolean = false;

  // Three.js OBJ rendering state
  private _threeRenderer: THREE.WebGLRenderer | null = null;
  private _threeScene: THREE.Scene | null = null;
  private _threeCamera: THREE.PerspectiveCamera | null = null;
  private _threeControls: OrbitControls | null = null;
  private _threeAnimationId: number | null = null;
  private _isObjMode: boolean = false;

  constructor($element: JQuery) {
    super($element);
  }

  create(): void {
    this.setConfig("modelViewerCenterPanel");

    super.create();

    const that = this;

    this.extensionHost.subscribe(
      IIIFEvents.OPEN_EXTERNAL_RESOURCE,
      (resources: IExternalResource[]) => {
        that.openMedia(resources);
      }
    );

    this.extensionHost.subscribe(IIIFEvents.SET_TARGET, (target: Orbit) => {
      this.whenLoaded(() => {
        (that.$modelviewer[0] as any).cameraOrbit = target.toAttributeString();
      });
    });

    this.extensionHost.subscribe(IIIFEvents.ANNOTATIONS, (args: any) => {
      this.overlayAnnotations();
      // this.zoomToInitialAnnotation();
    });

    this.title = this.extension.helper.getLabel();

    this.$spinner = $('<div class="spinner"></div>');
    this.$content.prepend(this.$spinner);

    this.$modelviewer = $(
      `<model-viewer
        ${this.config.options.autoRotateEnabled ? "auto-rotate" : ""}
        ${
          this.config.options.interactionPromptEnabled
            ? 'interaction-prompt="auto"'
            : 'interaction-prompt="none"'
        }
        camera-controls
        style="background-color: unset;"></model-viewer>`
    );

    this.$content.prepend(this.$modelviewer);

    this.$modelviewer[0].addEventListener("model-visibility", () => {
      this.isLoaded = true;
      this.$content.removeClass("loading");
      this.$spinner.hide();
      this.extensionHost.publish(Events.LOAD);
      this.extensionHost.publish(
        ModelViewerExtensionEvents.CAMERA_CHANGE,
        this.getCameraOrbit()
      );
    });

    const debouncedCameraChange = debounce((obj: any) => {
      if (this.isLoaded) {
        //if (obj.detail.source === "user-interaction") {
        this.extensionHost.publish(
          ModelViewerExtensionEvents.CAMERA_CHANGE,
          this.getCameraOrbit()
        );
        //}
      }
    }, this.config.options.cameraChangeDelay);

    this.$modelviewer[0].addEventListener(
      "camera-change",
      debouncedCameraChange
    );

    this.$modelviewer[0].addEventListener("dblclick", (e: any) => {
      if (this.config.options.doubleClickAnnotationEnabled) {
        const point = (this.$modelviewer[0] as any).positionAndNormalFromPoint(
          e.clientX,
          e.clientY
        );
        const canvas: Canvas = that.extension.helper.getCurrentCanvas();
        this.extensionHost.publish(ModelViewerExtensionEvents.DOUBLECLICK, {
          target: `${canvas.id}#xyz=${point.position.x},${point.position.y},${point.position.z}&nxyz=${point.normal.x},${point.normal.y},${point.normal.z}`,
        });
      }
    });
  }

  whenLoaded(cb: () => void): void {
    Async.waitFor(() => {
      return this.isLoaded;
    }, cb);
  }

  private overlayAnnotations(): void {
    // clear existing annotations
    this.clearAnnotations();

    const annotationGroups: AnnotationGroup[] | null = (
      this.extension as ModelViewerExtension
    ).annotations;

    annotationGroups.forEach((annoGroup) => {
      annoGroup.points3D.forEach((point, index) => {
        const div = document.createElement("DIV");
        div.id = "annotation-" + point.canvasIndex + "-" + index;

        div.title = sanitize(point.bodyValue);
        div.className = "annotationPin";
        div.setAttribute("slot", `hotspot-${index}`);
        div.setAttribute("data-position", `${point.x} ${point.y} ${point.z}`);
        div.setAttribute("data-normal", `${point.nx} ${point.ny} ${point.nz}`);
        div.onclick = (e: any) => {
          e.preventDefault();
          this.extensionHost.publish(
            IIIFEvents.PINPOINT_ANNOTATION_CLICKED,
            index
          );
        };
        const span: HTMLSpanElement = document.createElement("SPAN");
        span.innerText = String(index + 1);
        div.appendChild(span);
        this.$modelviewer[0].appendChild(div);
      });
    });
  }

  private clearAnnotations(): void {
    const nodes = this.$modelviewer[0].querySelectorAll(".annotationPin");
    [].forEach.call(nodes, (node) => {
      node.parentNode.removeChild(node);
    });
  }

  private getCameraOrbit(): Orbit | null {
    if (this.$modelviewer && !this._isObjMode) {
      const orbit: any = (this.$modelviewer[0] as any).getCameraOrbit();
      const tpr: Orbit = new Orbit(orbit.theta, orbit.phi, orbit.radius);
      return tpr;
    }
    return null;
  }

  private disposeThreeJs(): void {
    if (this._threeAnimationId !== null) {
      cancelAnimationFrame(this._threeAnimationId);
      this._threeAnimationId = null;
    }
    if (this._threeControls) {
      this._threeControls.dispose();
      this._threeControls = null;
    }
    if (this._threeRenderer) {
      this._threeRenderer.dispose();
      this._threeRenderer.domElement.remove();
      this._threeRenderer = null;
    }
    this._threeScene = null;
    this._threeCamera = null;
  }

  private async openObjMedia(mediaUri: string): Promise<void> {
    // Hide <model-viewer> and use Three.js directly for OBJ files
    this._isObjMode = true;
    this.$modelviewer.hide();
    this.disposeThreeJs();

    const width = this.$content.width();
    const height = this.$content.height();

    // Scene
    this._threeScene = new THREE.Scene();
    this._threeScene.background = new THREE.Color(0x222222);

    // Camera
    this._threeCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    // Renderer
    this._threeRenderer = new THREE.WebGLRenderer({ antialias: true });
    this._threeRenderer.setSize(width, height);
    this._threeRenderer.setPixelRatio(window.devicePixelRatio);
    this.$content[0].appendChild(this._threeRenderer.domElement);

    // Controls
    this._threeControls = new OrbitControls(
      this._threeCamera,
      this._threeRenderer.domElement
    );
    this._threeControls.enableDamping = true;
    this._threeControls.dampingFactor = 0.1;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this._threeScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this._threeScene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-1, -0.5, -1);
    this._threeScene.add(backLight);

    // Load OBJ
    const loader = new OBJLoader();
    try {
      const obj = await new Promise<THREE.Group>((resolve, reject) => {
        loader.load(
          mediaUri,
          resolve,
          undefined,
          reject
        );
      });

      // Apply a default material since OBJ files without MTL have no material
      const material = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.1,
        roughness: 0.8,
      });
      obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = material;
        }
      });

      this._threeScene.add(obj);

      // Auto-center and auto-scale to fit viewport
      const box = new THREE.Box3().setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fitDistance = maxDim * 1.5;

      obj.position.sub(center);
      this._threeCamera.position.set(0, fitDistance * 0.5, fitDistance);
      this._threeCamera.lookAt(0, 0, 0);
      this._threeControls.target.set(0, 0, 0);
      this._threeControls.update();

      this.$spinner.hide();
      this.isLoaded = true;
      this.$content.removeClass("loading");
      this.extensionHost.publish(Events.LOAD);
    } catch (err) {
      console.error("Failed to load OBJ model:", err);
      this.$spinner.hide();
    }

    // Render loop
    const animate = () => {
      this._threeAnimationId = requestAnimationFrame(animate);
      if (this._threeControls) {
        this._threeControls.update();
      }
      if (this._threeRenderer && this._threeScene && this._threeCamera) {
        this._threeRenderer.render(this._threeScene, this._threeCamera);
      }
    };
    animate();

    this.extensionHost.publish(Events.EXTERNAL_RESOURCE_OPENED);
  }

  async openMedia(resources: IExternalResource[]) {
    this.$spinner.show();
    await this.extension.getExternalResources(resources);

    let mediaUri: string | null = null;
    const canvas: Canvas = this.extension.helper.getCurrentCanvas();
    const formats: AnnotationBody[] | null =
      this.extension.getMediaFormats(canvas);

    if (formats && formats.length) {
      mediaUri = formats[0].id;
    } else {
      mediaUri = canvas.id;
    }

    // Detect OBJ format from the annotation body's format field or URL extension
    const format = formats && formats.length ? formats[0].getFormat() : null;
    const isObj =
      (format && format.toString() === "model/obj") ||
      (mediaUri && mediaUri.toLowerCase().endsWith(".obj"));

    if (isObj && mediaUri) {
      await this.openObjMedia(mediaUri);
      return;
    }

    // Default path: use <model-viewer> for GLB/glTF and other supported formats
    if (this._isObjMode) {
      // Switching back from OBJ to model-viewer
      this.disposeThreeJs();
      this._isObjMode = false;
      this.$modelviewer.show();
    }

    this.$modelviewer.attr("src", mediaUri);

    // todo: look for choice of usdz, if found, add ar attribute or hide ar button using --ar-button-display
    // use choice for this? https://github.com/edsilv/biiif/issues/13#issuecomment-383504734
    // mediaUri = mediaUri.substr(0, mediaUri.lastIndexOf(".")) + ".usdz";
    // this.$modelviewer.attr("ios-src", mediaUri);
    this.extensionHost.publish(Events.EXTERNAL_RESOURCE_OPENED);
  }

  resize() {
    super.resize();

    this.$spinner.css(
      "top",
      this.$content.height() / 2 - this.$spinner.height() / 2
    );
    this.$spinner.css(
      "left",
      this.$content.width() / 2 - this.$spinner.width() / 2
    );

    if (this.title) {
      this.$title.text(sanitize(this.title));
    }

    if (this._isObjMode && this._threeRenderer && this._threeCamera) {
      const width = this.$content.width();
      const height = this.$content.height();
      this._threeRenderer.setSize(width, height);
      this._threeCamera.aspect = width / height;
      this._threeCamera.updateProjectionMatrix();
    } else if (this.$modelviewer) {
      this.$modelviewer.width(this.$content.width());
      this.$modelviewer.height(this.$content.height());
    }
  }
}