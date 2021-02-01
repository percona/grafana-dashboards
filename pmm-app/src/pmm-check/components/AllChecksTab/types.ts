import { CheckDetails } from 'pmm-check/types';

export type ChangeCheck = (checkName: string, enabled: boolean) => Promise<void>;

export type FetchChecks = () => Promise<void>;

export interface CheckTableRowProps {
  check: CheckDetails;
  onSuccess: (check: CheckDetails) => void;
}
