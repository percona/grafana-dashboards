import { PanelPlugin } from '@grafana/data';
import QueryAnalyticsPanel from 'pmm-qan-app-panel/panel/panel';

export const plugin = new PanelPlugin(QueryAnalyticsPanel);
