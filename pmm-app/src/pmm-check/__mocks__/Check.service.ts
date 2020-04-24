import { ActiveCheck, FailedChecks } from '../types';
import data from '../stub.json';
import { Alert } from '../types';

/**
 * A mock version of CheckService
 */
export const CheckService = {
  async getActiveAlerts(): Promise<ActiveCheck[] | undefined> {
    return processData(data as Alert[]);
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
        if (val.severity === 'info') {
          acc[2]++;
        }
        return acc;
      },
      [0, 0, 0] as FailedChecks
    );
    const details = value.map(val => val.description);
    return { key: String(i), name, failed, details };
  });
};
