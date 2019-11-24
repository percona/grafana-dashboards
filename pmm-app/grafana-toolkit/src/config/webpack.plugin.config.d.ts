/// <reference types="webpack-dev-server" />
import * as webpack from 'webpack';
interface WebpackConfigurationOptions {
    watch?: boolean;
    production?: boolean;
}
declare type WebpackConfigurationGetter = (options: WebpackConfigurationOptions) => webpack.Configuration;
export declare const findModuleFiles: (base: string, files?: string[] | undefined, result?: string[] | undefined) => string[];
export declare const getWebpackConfig: WebpackConfigurationGetter;
export {};
