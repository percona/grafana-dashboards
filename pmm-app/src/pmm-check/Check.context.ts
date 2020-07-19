import { createContext } from 'react';
import { AlertsReload } from 'pmm-check/types';

export const AlertsReloadContext = createContext<AlertsReload>({ fetchAlerts: () => {} });
