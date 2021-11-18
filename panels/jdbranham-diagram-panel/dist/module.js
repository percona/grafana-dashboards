'use strict';

System.register(['./properties', './diagramControl'], function (_export, _context) {
  "use strict";

  var pluginName, DiagramCtrl;
  return {
    setters: [function (_properties) {
      pluginName = _properties.pluginName;
    }, function (_diagramControl) {
      DiagramCtrl = _diagramControl.DiagramCtrl;
    }],
    execute: function () {
      _export('PanelCtrl', DiagramCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
