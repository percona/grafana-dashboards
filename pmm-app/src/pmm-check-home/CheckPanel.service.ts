import { API } from 'shared/core';
import { apiRequest } from 'shared/components/helpers/api';
import {
  CheckResultSummaryPayload,
  FailedCheckSummary,
  Settings,
} from 'pmm-check-home/types';

export const makeApiUrl: (segment: string) => string = (segment) => `${API.ALERTMANAGER}/${segment}`;
const BASE_URL = '/v1/management/SecurityChecks';

/**
 * A service-like object to store the API methods
 */
export const CheckService = {
  async getAllFailedChecks(): Promise<FailedCheckSummary[]> {
    const { result = [] } = await apiRequest.post<CheckResultSummaryPayload, Object>(
      `${BASE_URL}/ListFailedServices`,
      {},
      false,
    );

    return result.map(({
      service_name,
      service_id,
      critical_count = 0,
      major_count = 0,
      trivial_count = 0,
    }) => ({
      serviceName: service_name,
      serviceId: service_id,
      criticalCount: critical_count,
      majorCount: major_count,
      trivialCount: trivial_count,
    }));
  },
  async getSettings() {
    return apiRequest.post<Settings, {}>(API.SETTINGS, {}, true);
  },
};
