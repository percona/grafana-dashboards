import { PanelPlugin } from '@grafana/data';
import QueryAnalyticsPanel from 'pmm-qan/panel/QueryAnalytics';

export const plugin = new PanelPlugin(QueryAnalyticsPanel);
