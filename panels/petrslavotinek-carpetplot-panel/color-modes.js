'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var CUSTOM, SPECTRUM, colorModesMap;
  return {
    setters: [],
    execute: function () {
      CUSTOM = 'CUSTOM';
      SPECTRUM = 'SPECTRUM';

      _export('colorModesMap', colorModesMap = [{ name: 'Spectrum', value: SPECTRUM }, { name: 'Custom', value: CUSTOM }]);

      _export('colorModesMap', colorModesMap);

      _export('default', {
        CUSTOM: CUSTOM,
        SPECTRUM: SPECTRUM
      });
    }
  };
});
//# sourceMappingURL=color-modes.js.map
