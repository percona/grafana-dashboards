import { AppEvents } from '@grafana/data';
import appEvents from 'grafana/app/core/app_events';

export const showSuccessNotification = ({ message }) => {
  appEvents.emit(AppEvents.alertSuccess, [message]);
};

export const showWarningNotification = ({ message }) => {
  appEvents.emit(AppEvents.alertWarning, [message]);
};

export const showErrorNotification = ({ message }) => {
  appEvents.emit(AppEvents.alertError, [message]);
};
