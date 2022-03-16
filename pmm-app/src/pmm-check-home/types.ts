import { PaginatedPayload } from 'shared/core';

export interface CheckPanelOptions {
  title?: string;
}

interface CheckResultSummary {
  service_name: string;
  service_id: string;
  critical_count: number;
  major_count: number;
  trivial_count: number;
}

export interface CheckResultSummaryPayload extends PaginatedPayload {
  result: CheckResultSummary[];
}

export interface FailedCheckSummary {
  serviceName: string;
  serviceId: string;
  criticalCount: number;
  majorCount: number;
  trivialCount: number;
}

export interface Settings {
  settings: {
    stt_enabled?: boolean;
    telemetry_enabled?: boolean;
  };
}
