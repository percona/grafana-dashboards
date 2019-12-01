import { Task } from './task';
export interface PluginCIOptions {
    backend?: boolean;
    full?: boolean;
    upload?: boolean;
}
export declare const ciBuildPluginTask: Task<PluginCIOptions>;
export declare const ciBuildPluginDocsTask: Task<PluginCIOptions>;
export declare const ciPackagePluginTask: Task<PluginCIOptions>;
export declare const ciTestPluginTask: Task<PluginCIOptions>;
export declare const ciPluginReportTask: Task<PluginCIOptions>;
