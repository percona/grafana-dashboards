import { PanelPlugin } from '@grafana/data';
import QueryAnalyticsPanel from 'pmm-qan/panel/panel';

export const plugin = new PanelPlugin(QueryAnalyticsPanel);
