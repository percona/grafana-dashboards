export declare type TaskRunner<T> = (options: T) => Promise<any>;
export declare class Task<TOptions> {
    name: string;
    runner: TaskRunner<TOptions>;
    options: TOptions;
    constructor(name: string, runner: TaskRunner<TOptions>);
    setName: (name: string) => void;
    setRunner: (runner: TaskRunner<TOptions>) => void;
    setOptions: (options: TOptions) => void;
    exec: () => Promise<any>;
}
