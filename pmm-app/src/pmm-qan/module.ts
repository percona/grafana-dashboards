import { PanelPlugin } from '@grafana/data';
import QueryAnalyticsPanel from 'pmm-qan/panel/qan';

export const plugin = new PanelPlugin(QueryAnalyticsPanel);
