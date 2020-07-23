import { PanelPlugin } from '@grafana/data';
import '../shared/styles.scss';
import '../shared/style.less';
import './panel.scss';
import { SettingsPanel } from './Settings';

export const plugin = new PanelPlugin(SettingsPanel);
