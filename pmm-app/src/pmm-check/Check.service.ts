import { apiRequest } from '../shared/components/helpers/api';
import { API } from '../shared/core';
import { ActiveCheck, Alert, AlertRequestParams, FailedChecks, Settings } from './types';

export const makeApiUrl: (segment: string) => string = segment => `${API.ALERTMANAGER}/${segment}`;

/**
 * A service-like object to store the API methods
 */
export const CheckService = {
  async getActiveAlerts(): Promise<ActiveCheck[] | undefined> {
    const data = await apiRequest.get<Alert[], AlertRequestParams>(makeApiUrl('alerts'), {
      params: { active: true, silenced: false, filter: 'stt_check=1' },
    });

    return Array.isArray(data) && data.length ? processData(data as Alert[]) : undefined;
  },
  async getFailedChecks(): Promise<FailedChecks | undefined> {
    const data = await apiRequest.get<Alert[], AlertRequestParams>(makeApiUrl('alerts'), {
      params: { active: true, silenced: false, filter: 'stt_check=1' },
    });

    return Array.isArray(data) && data.length ? sumFailedChecks(processData(data as Alert[])) : undefined;
  },

  async getSettings() {
    return apiRequest.post<Settings, {}>(API.SETTINGS, {}, true);
  },
  runDbChecks(): Promise<void | {}> {
    return apiRequest.post<{}, {}>('/v1/management/SecurityChecks/Start', {});
  },
};

export const processData = (data: Alert[]): ActiveCheck[] => {
  const result: Record<string, Array<{ summary: string; description: string; severity: string }>> = data
    .filter(alert => !!alert.labels.stt_check)
    .reduce((acc, alert) => {
      const {
        labels,
        annotations: { summary, description },
      } = alert;
      const serviceName = labels.service_name;

      if (!serviceName) {
        return acc;
      }

      const item = { summary, description, severity: labels.severity };

      if (acc[serviceName]) {
        acc[serviceName] = acc[serviceName].concat(item);
      } else {
        acc[serviceName] = [item];
      }

      return acc;
    }, {});

  return Object.entries(result).map(([name, value], i) => {
    const failed = value.reduce(
      (acc, val) => {
        if (val.severity === 'error') {
          acc[0] += 1;
        }

        if (val.severity === 'warning') {
          acc[1] += 1;
        }

        if (val.severity === 'notice') {
          acc[2] += 1;
        }

        return acc;
      },
      [0, 0, 0] as FailedChecks
    );
    const details = value.map(val => `${val.summary}${val.description ? `: ${val.description}` : ''}`);

    return {
      key: String(i),
      name,
      failed,
      details,
    };
  });
};

export const sumFailedChecks = (checks: ActiveCheck[]): FailedChecks =>
  checks
    .map(rec => rec.failed)
    .reduce(
      (acc, failed) => {
        acc[0] += failed[0];
        acc[1] += failed[1];
        acc[2] += failed[2];

        return acc;
      },
      [0, 0, 0]
    );
