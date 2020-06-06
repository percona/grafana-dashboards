import { PanelPlugin } from '@grafana/data';
import '../core-dependencies/styles.scss';
import '../core-dependencies/style.less';
import './panel.scss';
import SettingsPanel from './panel';

export const plugin = new PanelPlugin(SettingsPanel);
