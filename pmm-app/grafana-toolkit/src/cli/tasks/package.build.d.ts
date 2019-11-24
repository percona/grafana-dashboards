import { Task } from './task';
export declare const clean: any;
interface SavePackageOptions {
    path: string;
    pkg: {};
}
export declare const savePackage: (options: SavePackageOptions) => Promise<void>;
interface PackageBuildOptions {
    scope: string;
}
export declare const buildPackageTask: Task<PackageBuildOptions>;
export {};
