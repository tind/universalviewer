import { CenterPanel } from "../uv-shared-module/CenterPanel";
import { AnnotationBody, IExternalResource, Rendering } from "manifesto.js";
import "mediaelement/build/mediaelement-and-player";
import "mediaelement-plugins/dist/source-chooser/source-chooser";
import "mediaelement-plugins/dist/source-chooser/source-chooser.css";
import { Config } from "../../extensions/uv-mediaelement-extension/config/Config";
declare type TextTrackDescriptor = {
    language?: string;
    label?: string;
    id: string;
};
declare type MediaSourceDescriptor = {
    label: string;
    type: string;
    src: string;
};
export declare class MediaElementCenterPanel extends CenterPanel<Config["modules"]["mediaelementCenterPanel"]> {
    $wrapper: JQuery;
    $container: JQuery;
    $media: JQuery;
    mediaHeight: number;
    mediaWidth: number;
    player: any;
    title: string | null;
    constructor($element: JQuery);
    create(): void;
    openMedia(resources: IExternalResource[]): Promise<void>;
    appendTextTracks(subtitles: Array<TextTrackDescriptor>): void;
    appendMediaSources(sources: Array<MediaSourceDescriptor>): void;
    isTypeMedia(element: Rendering | AnnotationBody): boolean;
    isTypeCaption(element: Rendering | AnnotationBody): boolean;
    isVideo(): boolean;
    resize(): void;
}
export {};
