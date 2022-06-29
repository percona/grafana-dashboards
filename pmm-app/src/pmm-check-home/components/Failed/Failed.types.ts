import { FailedCheckSummary } from 'pmm-check-home/types';

export interface FailedProps {
    failed: FailedCheckSummary[];
    hasNoAccess: boolean;
    isSttEnabled: boolean;
}
