import { Task } from './task';
export declare const clean: any;
export declare const savePackage: (options: {
    path: string;
    pkg: {};
}) => Promise<void>;
interface ToolkitBuildOptions {
}
export declare const toolkitBuildTask: Task<ToolkitBuildOptions>;
export {};
