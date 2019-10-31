import { PanelPlugin } from '@grafana/ui';
import SimplePanel  from './panel';

export const plugin = new PanelPlugin(SimplePanel)
