import { PanelPlugin } from '@grafana/data';
import { OnboardPanel } from './panel/OnboardPanel';

export const plugin = new PanelPlugin<any>(OnboardPanel);
