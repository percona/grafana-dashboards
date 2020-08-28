import { PanelPlugin } from '@grafana/data';
import { PTSummaryPanel } from './PTSummary';

export const plugin = new PanelPlugin(PTSummaryPanel);
