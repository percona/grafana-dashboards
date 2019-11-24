export interface PluginTestOptions {
    updateSnapshot: boolean;
    coverage: boolean;
    watch: boolean;
    testPathPattern?: string;
    testNamePattern?: string;
}
export declare const testPlugin: (options: PluginTestOptions) => Promise<void>;
