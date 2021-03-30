import { API } from 'shared/core';
import { apiRequest } from 'shared/components/helpers/api';
import {
  ActiveCheck,
  Alert,
  AlertRequestParams,
  AlertState,
  AllChecks,
  ChangeCheckBody,
  CheckDetails,
  FailedChecks,
  Settings,
  SilenceBody,
  SilenceResponse,
} from 'pmm-check-home/types';
import { SEVERITIES_ORDER } from 'pmm-check-home/CheckPanel.constants';

export const makeApiUrl: (segment: string) => string = (segment) => `${API.ALERTMANAGER}/${segment}`;

/**
 * A service-like object to store the API methods
 */
export const CheckService = {
  async getActiveAlerts(includeSilenced = false): Promise<ActiveCheck[] | undefined> {
    const data = await apiRequest.get<Alert[], AlertRequestParams>(makeApiUrl('alerts'), {
      params: { active: true, silenced: includeSilenced, filter: 'stt_check=1' },
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
  silenceAlert(body: SilenceBody): Promise<void | SilenceResponse> {
    return apiRequest.post<SilenceResponse, SilenceBody>(makeApiUrl('silences'), body);
  },
  runDbChecks(): Promise<void | {}> {
    return apiRequest.post<{}, {}>('/v1/management/SecurityChecks/Start', {});
  },
  async getAllChecks(): Promise<CheckDetails[] | undefined> {
    const response = await apiRequest.post<AllChecks, {}>('/v1/management/SecurityChecks/List', {});

    return response ? response.checks : undefined;
  },
  changeCheck(body: ChangeCheckBody): Promise<void | {}> {
    return apiRequest.post<{}, ChangeCheckBody>('/v1/management/SecurityChecks/Change', body);
  },
};

export const processData = (data: Alert[]): ActiveCheck[] => {
  const result: Record<
    string,
    Array<{
      summary: string;
      description: string;
      severity: string;
      labels: { [key: string]: string },
      silenced: boolean;
      readMoreUrl: string;
    }>
    > = data
      .filter((alert) => !!alert.labels.stt_check)
      .reduce((acc, alert) => {
        const {
          labels,
          annotations: { summary, description, read_more_url },
          status: { state },
        } = alert;
        const serviceName = labels.service_name;

        if (!serviceName) {
          return acc;
        }

        const item = {
          summary,
          description,
          severity: labels.severity,
          labels,
          silenced: state === AlertState.suppressed,
          readMoreUrl: read_more_url,
        };

        acc[serviceName] = (acc[serviceName] ?? []).concat(item);

        return acc;
      }, {});

  return Object.entries(result).map(([name, value], i) => {
    const failed = value.reduce(
      (acc, val) => {
        if (val.severity === 'error') {
          acc[SEVERITIES_ORDER.error] += 1;
        }

        if (val.severity === 'warning') {
          acc[SEVERITIES_ORDER.warning] += 1;
        }

        if (val.severity === 'notice') {
          acc[SEVERITIES_ORDER.notice] += 1;
        }

        return acc;
      },
      [0, 0, 0] as FailedChecks,
    );

    const details = value
      .map((val) => ({
        description: `${val.summary}${val.description ? `: ${val.description}` : ''}`,
        labels: val.labels ?? [],
        silenced: val.silenced,
        readMoreUrl: val.readMoreUrl,
      }))
      .sort((a, b) => {
        const aSeverity = a.labels.severity;
        const bSeverity = b.labels.severity;

        return SEVERITIES_ORDER[aSeverity] - SEVERITIES_ORDER[bSeverity];
      });

    return {
      key: String(i),
      name,
      failed,
      details,
    };
  });
};

export const sumFailedChecks = (checks: ActiveCheck[]): FailedChecks => checks
  .map((rec) => rec.failed)
  .reduce(
    (acc, failed) => {
      acc[0] += failed[0];
      acc[1] += failed[1];
      acc[2] += failed[2];

      return acc;
    },
    [0, 0, 0],
  );
