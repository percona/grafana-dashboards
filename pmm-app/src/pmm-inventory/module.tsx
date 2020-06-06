import { PanelPlugin } from '@grafana/data';
import { InventoryPanel } from './panel';
import '../core-dependencies/styles.scss';
import '../core-dependencies/style.less';
import './panel.scss';

export const plugin = new PanelPlugin(InventoryPanel);
