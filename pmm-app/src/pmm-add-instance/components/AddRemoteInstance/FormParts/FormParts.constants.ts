import { SelectableValue } from '@grafana/data';
import { Messages } from '../AddRemoteInstance.messages';
import { TrackingOptions } from '../AddRemoteInstance.types';

export const trackingOptions = [
  { key: TrackingOptions.none, value: Messages.form.trackingOptions.none },
  { key: TrackingOptions.pgStatements, value: Messages.form.trackingOptions.pgStatements },
  { key: TrackingOptions.pgMonitor, value: Messages.form.trackingOptions.pgMonitor },
];

export const rdsTrackingOptions = [
  { key: TrackingOptions.none, value: Messages.form.trackingOptions.none },
  { key: TrackingOptions.pgStatements, value: Messages.form.trackingOptions.pgStatements },
];

export const schemaOptions: SelectableValue[] = [
  { key: 'https', value: 'HTTPS' },
  { key: 'http', value: 'HTTP' },
];
