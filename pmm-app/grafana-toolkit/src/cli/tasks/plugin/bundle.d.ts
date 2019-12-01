export interface PluginBundleOptions {
    watch: boolean;
    production?: boolean;
    yarnlink?: boolean;
}
export declare const bundlePlugin: ({ watch, production }: PluginBundleOptions) => Promise<void>;
