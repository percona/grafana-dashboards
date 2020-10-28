import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

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

export type FailedChecks = [number, number, number];

export interface ActiveCheck {
  key: string;
  name: string;
  failed: FailedChecks;
  details: Array<{ description: string, labels: { [key: string]: string }}>;
}

export interface CheckDetails {
  name: string;
  description: string;
  disabled: boolean;
}

export interface AllChecks {
  checks: CheckDetails[];
}

export enum TabKeys {
  allChecks = 'allChecks',
  failedChecks = 'failedChecks',
}

export interface TabEntry {
  label: string,
  key: TabKeys,
  component: React.ReactNode,
}

export type CheckPanelProps = { component: FC } & RouteComponentProps;

export type SeverityMap = Record<Severity, string>;

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
  startsAt: string;
  endsAt: string;
  createdBy: string;
  comment: string;
  id: string;
}

export interface SilenceResponse {
  silenceID: string;
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
  fetchAlerts: () => Promise<void>;
}
