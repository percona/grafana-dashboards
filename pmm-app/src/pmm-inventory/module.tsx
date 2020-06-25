import { PanelPlugin } from '@grafana/data';
import { InventoryPanel } from './Inventory';
import '../shared/styles.scss';
import './Inventory.scss';

export const plugin = new PanelPlugin(InventoryPanel);
