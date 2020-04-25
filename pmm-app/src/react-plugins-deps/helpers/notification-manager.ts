import AppEvents from 'grafana/app/core/app_events';

export const showSuccessNotification = ({ message }) => {
  AppEvents.emit('alert-success', [message]);
};

export const showWarningNotification = ({ message }) => {
  AppEvents.emit('alert-warning', [message]);
};

export const showErrorNotification = ({ message }) => {
  AppEvents.emit('alert-error', [message]);
};
