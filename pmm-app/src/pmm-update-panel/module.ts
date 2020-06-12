// import { DEFAULTS } from './CheckPanel.constants';
// import { UpdatePanelOptions } from './types';
// import { UpdatePanelRouter } from './UpdatePanel';

// export const plugin = new PanelPlugin<UpdatePanelOptions>(UpdatePanelRouter)
//   .setDefaults(DEFAULTS)
//   .setEditor(UpdatePanelEditor);

import { PanelPlugin } from '@grafana/data';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import { UpdatePanel } from './UpdatePanel';

export const plugin = new PanelPlugin(UpdatePanel);
