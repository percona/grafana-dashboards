import { PanelPlugin } from '@grafana/data';
import QueryAnalyticsPanel from 'pmm-qan-app-panel/panel/panel';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';

export const plugin = new PanelPlugin(QueryAnalyticsPanel);
