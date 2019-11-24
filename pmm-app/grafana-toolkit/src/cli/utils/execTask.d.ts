import { Task } from '../tasks/task';
interface TaskBasicOptions {
    silent?: boolean;
}
export declare const execTask: <TOptions>(task: Task<TOptions>) => (options: TOptions & TaskBasicOptions) => Promise<void>;
export {};
