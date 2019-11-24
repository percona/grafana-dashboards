declare type FnToSpin<T> = (options: T) => Promise<void>;
export declare const useSpinner: <T = any>(spinnerLabel: string, fn: FnToSpin<T>, killProcess?: boolean) => (options: T) => Promise<void>;
export {};
