import { PanelPlugin } from '@grafana/data';
import QueryAnalyticsPanel from './panel/panel';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';

export const plugin = new PanelPlugin(QueryAnalyticsPanel);
