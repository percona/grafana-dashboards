import { PanelPlugin } from '@grafana/ui';
import SettingsPanel from './panel';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
export const plugin = new PanelPlugin(SettingsPanel);
