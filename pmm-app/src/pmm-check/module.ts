import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { DEFAULTS } from './CheckPanel.constants';
import { CheckPanel } from './CheckPanel';
import { CheckPanelEditor } from './CheckPanelEditor';

export const plugin = new PanelPlugin<SimpleOptions>(CheckPanel)
  .setDefaults(DEFAULTS)
  .setEditor(CheckPanelEditor);
