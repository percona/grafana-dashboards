export interface FailedChecksProps {
  hasNoAccess: boolean;
  isSttEnabled: boolean;
}

export type FailedChecks = [number, number, number];

export interface ActiveCheck {
  key: string;
  name: string;
  failed: FailedChecks;
  details: Array<{ description: string, labels: { [key: string]: string }}>;
}
