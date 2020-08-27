import { PanelPlugin } from '@grafana/data';
import { DBaaSPanel } from './DBaaS';

export const plugin = new PanelPlugin(DBaaSPanel);
