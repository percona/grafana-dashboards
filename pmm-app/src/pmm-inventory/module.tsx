import { PanelPlugin } from '@grafana/data';
import { InventoryPanel } from './panel';
import '../react-plugins-deps/styles.scss';
import './panel.scss';

export const plugin = new PanelPlugin(InventoryPanel);
