'use strict';

System.register(['app/core/utils/kbn'], function (_export, _context) {
  "use strict";

  var kbn, CarpetplotAxesEditorCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function carpetplotAxesEditor() {
    'use strict';

    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'public/plugins/petrslavotinek-carpetplot-panel/partials/axes-editor.html',
      controller: CarpetplotAxesEditorCtrl
    };
  }

  _export('carpetplotAxesEditor', carpetplotAxesEditor);

  return {
    setters: [function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }],
    execute: function () {
      _export('CarpetplotAxesEditorCtrl', CarpetplotAxesEditorCtrl = function CarpetplotAxesEditorCtrl($scope) {
        _classCallCheck(this, CarpetplotAxesEditorCtrl);

        $scope.editor = this;
        this.panelCtrl = $scope.ctrl;
        this.panel = this.panelCtrl.panel;

        this.panelCtrl.render();
      });

      _export('CarpetplotAxesEditorCtrl', CarpetplotAxesEditorCtrl);
    }
  };
});
//# sourceMappingURL=axes-editor.js.map
