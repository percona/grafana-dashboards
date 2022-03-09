'use strict';

System.register(['app/core/utils/kbn', 'lodash'], function (_export, _context) {
  "use strict";

  var kbn, _, valueFormatter;

  return {
    setters: [function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {
      _export('valueFormatter', valueFormatter = function valueFormatter(format, decimals) {
        return function (value) {
          return kbn.valueFormats[format](value, _.isInteger(value) ? 0 : decimals === null || decimals === undefined ? 5 : decimals);
        };
      });

      _export('valueFormatter', valueFormatter);
    }
  };
});
//# sourceMappingURL=formatting.js.map
