import { PluginMeta } from '@grafana/ui';
export interface Settings {
    plugin: PluginMeta;
    outputFolder: string;
}
export declare function getEndToEndSettings(): Settings;
