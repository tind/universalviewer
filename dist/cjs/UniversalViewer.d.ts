import { IUVData } from "./IUVData";
import { IContentHandler } from "./IContentHandler";
import BaseContentHandler from "./BaseContentHandler";
export interface IUVOptions {
    target: HTMLElement;
    data: IUVData;
}
export declare class UniversalViewer extends BaseContentHandler<IUVData> {
    options: IUVOptions;
    private _contentType;
    private _assignedContentHandler;
    private _externalEventListeners;
    constructor(options: IUVOptions);
    get(): IContentHandler<IUVData>;
    on(name: string, cb: Function, ctx?: any): void;
    private _assignContentHandler;
    set(data: IUVData, initial?: boolean): void;
    exitFullScreen(): void;
    resize(): void;
    dispose(): void;
}
