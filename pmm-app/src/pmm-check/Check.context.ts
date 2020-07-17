import { createContext } from 'react';

interface AlertsReload {
  fetchAlerts: () => void;
}

export const AlertsReloadContext = createContext<AlertsReload>({ fetchAlerts: () => {} });
