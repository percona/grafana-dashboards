import {
  FailedCheckSummary,
  Settings,
} from 'pmm-check-home/types';

/**
 * A mock version of CheckService
 */
export const CheckService = {
  async getActiveAlerts(): Promise<FailedCheckSummary[]> {
    return [];
  },
  async getSettings(): Promise<Settings | {}> {
    return {};
  },
};
