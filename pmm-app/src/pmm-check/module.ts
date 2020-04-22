import { PanelPlugin } from '@grafana/data';
import { CheckPanelOptions } from './types';
import { DEFAULTS } from './CheckPanel.constants';
import { CheckPanel } from './CheckPanel';
import { CheckPanelEditor } from './CheckPanelEditor';

export const plugin = new PanelPlugin<CheckPanelOptions>(CheckPanel)
  .setDefaults(DEFAULTS)
  .setEditor(CheckPanelEditor);
