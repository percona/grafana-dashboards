import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { defaults } from './CheckPanel.constants';
import { CheckPanel } from './CheckPanel';
import { CheckPanelEditor } from './CheckPanelEditor';

export const plugin = new PanelPlugin<SimpleOptions>(CheckPanel)
  .setDefaults(defaults)
  .setEditor(CheckPanelEditor);
