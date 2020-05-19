import { ActiveCheck, FailedChecks } from '../types';
import { Alert } from '../types';
import { alertsStub } from './stubs';

/**
 * A mock version of CheckService
 */
export const CheckService = {
  async getActiveAlerts(): Promise<ActiveCheck[] | undefined> {
    return processData(alertsStub as Alert[]);
  },
  async getFailedChecks(): Promise<FailedChecks | undefined> {
    return sumFailedChecks(processData(alertsStub as Alert[]));
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

export const sumFailedChecks = (checks: ActiveCheck[]): FailedChecks => {
  return checks
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
};
