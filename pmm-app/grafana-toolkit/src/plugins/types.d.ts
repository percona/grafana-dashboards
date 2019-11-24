import { PluginMeta, PluginBuildInfo } from '@grafana/ui';
import { DataFrame, KeyValue } from '@grafana/data';
export interface PluginPackageDetails {
    plugin: ZipFileInfo;
    docs?: ZipFileInfo;
}
export interface PluginBuildReport {
    plugin: PluginMeta;
    packages: PluginPackageDetails;
    workflow: WorkflowInfo;
    coverage: CoverageInfo[];
    tests: TestResultsInfo[];
    pullRequest?: number;
    artifactsBaseURL?: string;
    grafanaVersion?: KeyValue<string>;
}
export interface JobInfo {
    job?: string;
    startTime: number;
    endTime: number;
    elapsed: number;
    status?: string;
    buildNumber?: number;
}
export interface WorkflowInfo extends JobInfo {
    workflowId?: string;
    jobs: JobInfo[];
    user?: string;
    repo?: string;
}
export interface CoverageDetails {
    total: number;
    covered: number;
    skipped: number;
    pct: number;
}
export interface CoverageInfo {
    job: string;
    summary: {
        [key: string]: CoverageDetails;
    };
    report?: string;
}
export interface TestResultsInfo {
    job: string;
    grafana?: any;
    error?: string;
    passed: number;
    failed: number;
    screenshots: string[];
}
export interface PluginHistory {
    last: {
        info: PluginDevInfo;
        report: PluginBuildReport;
    };
    size: DataFrame[];
    coverage: DataFrame[];
    timing: DataFrame[];
}
export interface PluginDevInfo {
    pluginId: string;
    name: string;
    logo?: string;
    build: PluginBuildInfo;
    version: string;
}
export interface DevSummary {
    [key: string]: PluginDevInfo;
}
export interface PluginDevSummary {
    branch: DevSummary;
    pr: DevSummary;
}
export declare const defaultPluginHistory: PluginHistory;
export interface CountAndSize {
    count: number;
    bytes: number;
}
export interface ExtensionSize {
    [key: string]: CountAndSize;
}
export interface ZipFileInfo {
    name: string;
    size: number;
    contents: ExtensionSize;
    sha1?: string;
    md5?: string;
}
