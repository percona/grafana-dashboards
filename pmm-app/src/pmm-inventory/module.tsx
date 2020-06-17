import { PanelPlugin } from '@grafana/data';
import { InventoryPanel } from './panel';
import '../shared/styles.scss';
import '../shared/style.less';
import './panel.scss';

export const plugin = new PanelPlugin(InventoryPanel);
