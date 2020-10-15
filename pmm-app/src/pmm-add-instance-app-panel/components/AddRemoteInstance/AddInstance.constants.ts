import { Messages } from '../AddInstance/AddInstance.messages';
import { TrackingOptions } from './AddInstance.types';

export const trackingOptions = [
  { key: TrackingOptions.none, value: Messages.form.trackingOptions.none },
  { key: TrackingOptions.pgStatements, value: Messages.form.trackingOptions.pgStatements },
  { key: TrackingOptions.pgMonitor, value: Messages.form.trackingOptions.pgMonitor },
];
