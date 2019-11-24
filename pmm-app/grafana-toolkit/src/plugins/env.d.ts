import { PluginBuildInfo } from '@grafana/ui';
export declare const job: string;
export declare const getPluginBuildInfo: () => Promise<PluginBuildInfo>;
export declare const getBuildNumber: () => number | undefined;
export declare const getPullRequestNumber: () => number | undefined;
export declare const getJobFolder: () => string;
export declare const getCiFolder: () => string;
export declare const writeJobStats: (startTime: number, workDir: string) => void;
export declare function getCircleDownloadBaseURL(): Promise<string | undefined>;
