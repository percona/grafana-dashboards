import AWS from 'aws-sdk';
import { PluginPackageDetails, TestResultsInfo } from './types';
import { PluginMetaInfo } from '@grafana/ui';
interface UploadArgs {
    local: string;
    remote: string;
}
export declare class S3Client {
    readonly bucket: string;
    readonly prefix: string;
    readonly s3: AWS.S3;
    constructor(bucket?: string);
    private uploadPackage;
    uploadPackages(packageInfo: PluginPackageDetails, folder: UploadArgs): Promise<void>;
    uploadTestFiles(tests: TestResultsInfo[], folder: UploadArgs): Promise<void>;
    uploadLogo(meta: PluginMetaInfo, folder: UploadArgs): Promise<string | undefined>;
    uploadFile(fpath: string, path: string, md5?: string): Promise<string>;
    exists(key: string): Promise<boolean>;
    readJSON<T>(key: string, defaultValue: T): Promise<T>;
    writeJSON(key: string, obj: {}, params?: Partial<AWS.S3.Types.PutObjectRequest>): Promise<AWS.S3.Types.PutObjectOutput>;
}
export {};
