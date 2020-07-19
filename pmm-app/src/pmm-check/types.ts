import { WeakOpaque, ISOTimestamp } from 'shared/core/types';

export type SilenceID = WeakOpaque<string, 'SilenceID'>;

export interface CheckPanelOptions {
  title?: string;
}

export interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: Record<string, any>) => React.ReactNode;
  width?: number;
}

export enum Severity {
  error = 'error',
  warning = 'warning',
  notice = 'notice',
}

export type SeverityMap = Record<Severity, string>;

export type FailedChecks = [number, number, number];

export interface ActiveCheck {
  key: string;
  name: string;
  failed: FailedChecks;
  details: Array<{ description: string, labels: { [key: string]: string }}>;
}

export interface Alert {
  annotations: {
    description: string;
    summary: string;
  };
  labels: {
    stt_check?: string;
    service_name: string;
    severity: Severity;
  };
}

export interface AlertRequestParams {
  active?: boolean;
  silenced?: boolean;
  filter?: string;
}

export interface Settings {
  settings: {
    stt_enabled?: boolean;
    telemetry_enabled?: boolean;
  };
}

interface SilenceMatcher {
  name: string;
  value: string;
  isRegex: boolean;
}

export interface SilenceBody {
  matchers: SilenceMatcher[];
  startsAt: ISOTimestamp;
  endsAt: ISOTimestamp;
  createdBy: string;
  comment: string;
  id: string;
}

export interface SilenceResponse {
  silenceID: SilenceID;
}

export type Labels = { [key: string]: string };

export interface DetailProps {
  details: {
    description: string;
    labels: Labels;
  },
}

export interface DetailsItem {
  description: string;
  labels: Labels
}

export interface TableDataAlertDetailsProps {
  detailsItem: DetailsItem
}

export interface AlertsReload {
  fetchAlerts: () => void;
}
