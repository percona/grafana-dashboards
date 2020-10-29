export type ChangeCheck = (checkName: string, enabled: boolean) => Promise<void>;

export type FetchChecks = () => Promise<void>;
