import { KeyValue } from '@grafana/data';
import { PluginDevInfo, ExtensionSize, ZipFileInfo, PluginBuildReport, PluginHistory } from './types';
export declare function getGrafanaVersions(): KeyValue<string>;
export declare function getFileSizeReportInFolder(dir: string, info?: ExtensionSize): ExtensionSize;
export declare function getPackageDetails(zipFile: string, zipSrc: string, writeChecksum?: boolean): Promise<ZipFileInfo>;
export declare function findImagesInFolder(dir: string, prefix?: string, append?: string[]): string[];
export declare function appendPluginHistory(report: PluginBuildReport, info: PluginDevInfo, history: PluginHistory): void;
