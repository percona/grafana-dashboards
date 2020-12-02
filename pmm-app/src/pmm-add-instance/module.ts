import { PanelPlugin } from '@grafana/data';
import AddInstancePanel from './panel';

export const plugin = new PanelPlugin(AddInstancePanel);
