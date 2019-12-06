import { PanelPlugin } from '@grafana/ui';
import SettingsPanel from './panel';

export const plugin = new PanelPlugin(SettingsPanel);
