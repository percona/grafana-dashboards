import { PaginatedPayload } from 'shared/core';

export interface CheckPanelOptions {
  title?: string;
}

interface CheckResultSummary {
  service_name: string;
  service_id: string;
  critical_count: number;
  warning_count: number;
  notice_count: number;
}

export interface CheckResultSummaryPayload extends PaginatedPayload {
  result: CheckResultSummary[];
}

export interface FailedCheckSummary {
  serviceName: string;
  serviceId: string;
  criticalCount: number;
  warningCount: number;
  noticeCount: number;
}

export interface Settings {
  settings: {
    stt_enabled?: boolean;
    telemetry_enabled?: boolean;
  };
}
