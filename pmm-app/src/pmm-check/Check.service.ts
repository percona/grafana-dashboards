import { apiRequest } from '../react-plugins-deps/components/helpers/api';
import { BASER_URL } from './CheckPanel.constants';
import { ActiveCheck, Alert, FailedChecks } from './types';

export const makeApiUrl: (segment: string) => string = segment => `${BASER_URL}/${segment}`;

/**
 * A service-like object to store the API methods
 */
export const CheckService = {
  async getActiveAlerts(): Promise<ActiveCheck[] | undefined> {
    const data = await apiRequest.get<Alert[], any>(makeApiUrl('alerts'), {
      // TODO(atymchuk): add `filter: 'stt_check=1'` once API is ready
      params: { active: true, silenced: false },
    });
    return Array.isArray(data) && data.length ? processData(data as Alert[]) : undefined;
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
          acc[0]++;
        }
        if (val.severity === 'warning') {
          acc[1]++;
        }
        if (val.severity === 'notice') {
          acc[2]++;
        }
        return acc;
      },
      [0, 0, 0] as FailedChecks
    );
    const details = value.map(val => `${val.summary}${val.description ? `: ${val.description}` : ''}`);
    return { key: String(i), name, failed, details };
  });
};
