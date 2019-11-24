import { Task, TaskRunner } from './task';
import { PluginBundleOptions } from './plugin/bundle';
interface PluginBuildOptions {
    coverage: boolean;
}
interface Fixable {
    fix?: boolean;
}
export declare const bundlePlugin: (options: PluginBundleOptions) => Promise<void>;
export declare const clean: any;
export declare const prepare: (options: void) => Promise<void>;
export declare const prettierCheckPlugin: (options: Fixable) => Promise<void>;
export declare const lintPlugin: (options: Fixable) => Promise<void>;
export declare const pluginBuildRunner: TaskRunner<PluginBuildOptions>;
export declare const pluginBuildTask: Task<PluginBuildOptions>;
export {};
