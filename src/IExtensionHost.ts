import { IExtension } from "./modules/uv-shared-module/IExtension";
import { IExtensionHostAdaptor } from "./IExtensionHostAdaptor";
import { BaseComponent } from "@iiif/base-component";
import { EventHandler, EventHandlerWithName } from "./PubSub";

export interface IExtensionHost extends BaseComponent {
  extension: IExtension | null;
  isFullScreen: boolean;
  adaptor: IExtensionHostAdaptor;
  publish(event: string, args?: any): void;
  subscribe(event: string, handler: EventHandler): void;
  subscribeAll(handler: EventHandlerWithName): void;
  resize(): void;
  exitFullScreen(): void;
}
