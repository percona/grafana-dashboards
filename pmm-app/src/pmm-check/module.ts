import { PanelPlugin } from '@grafana/data';
import { CheckPanelOptions } from './types';
import { DEFAULTS } from './CheckPanel.constants';
import { CheckPanelRouter } from './CheckPanel';
import { CheckPanelEditor } from './CheckPanelEditor';

export const plugin = new PanelPlugin<CheckPanelOptions>(CheckPanelRouter)
  .setDefaults(DEFAULTS)
  .setEditor(CheckPanelEditor);
