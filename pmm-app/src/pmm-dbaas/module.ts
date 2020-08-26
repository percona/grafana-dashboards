import { PanelPlugin } from '@grafana/data';
import DBAASPanel from 'pmm-dbaas/panel/DBAAS';

export const plugin = new PanelPlugin(DBAASPanel);
