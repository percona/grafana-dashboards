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

    return result.map(
      ({
        service_name,
        service_id,
        emergency_count = '0',
        alert_count = '0',
        critical_count = '0',
        error_count = '0',
        warning_count = '0',
        notice_count = '0',
        info_count = '0',
        debug_count = '0',
      }) => ({
        serviceName: service_name,
        serviceId: service_id,
        counts: {
          emergency: parseInt(emergency_count, 10),
          alert: parseInt(alert_count, 10),
          critical: parseInt(critical_count, 10),
          error: parseInt(error_count, 10),
          warning: parseInt(warning_count, 10),
          notice: parseInt(notice_count, 10),
          info: parseInt(info_count, 10),
          debug: parseInt(debug_count, 10),
        },
      }),
    );
  },
  async getSettings() {
    return apiRequest.post<Settings, {}>(API.SETTINGS, {}, true);
  },
};
