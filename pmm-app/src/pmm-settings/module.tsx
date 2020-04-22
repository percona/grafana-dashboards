import { PanelPlugin } from '@grafana/data';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import './panel.scss';
import SettingsPanel from './panel';

export const plugin = new PanelPlugin(SettingsPanel);
