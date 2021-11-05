import kbn from 'app/core/utils/kbn';

export class CarpetplotAxesEditorCtrl {
  constructor($scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;

    this.panelCtrl.render();
  }
}

export function carpetplotAxesEditor() {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/plugins/petrslavotinek-carpetplot-panel/partials/axes-editor.html',
    controller: CarpetplotAxesEditorCtrl,
  };
}
