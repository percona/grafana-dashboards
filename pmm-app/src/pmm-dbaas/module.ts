import { PanelPlugin } from '@grafana/data';
import '../shared/styles.scss';
import { DBaaSPanel } from './DBaaS';

export const plugin = new PanelPlugin(DBaaSPanel);
