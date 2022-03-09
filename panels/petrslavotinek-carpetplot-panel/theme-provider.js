'use strict';

System.register(['app/core/core'], function (_export, _context) {
  "use strict";

  var contextSrv, getTheme;
  return {
    setters: [function (_appCoreCore) {
      contextSrv = _appCoreCore.contextSrv;
    }],
    execute: function () {
      getTheme = function getTheme() {
        return contextSrv.user.lightTheme ? 'light' : 'dark';
      };

      _export('default', {
        getTheme: getTheme
      });
    }
  };
});
//# sourceMappingURL=theme-provider.js.map
