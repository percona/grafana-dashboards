import { Task } from './task';
interface StartTaskOptions {
    watchThemes: boolean;
    noTsCheck: boolean;
    hot: boolean;
}
export declare const startTask: Task<StartTaskOptions>;
export {};
