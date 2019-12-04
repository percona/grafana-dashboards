import { PanelPlugin } from '@grafana/ui';
import InventoryPanel from './panel';

export const plugin = new PanelPlugin(InventoryPanel);
