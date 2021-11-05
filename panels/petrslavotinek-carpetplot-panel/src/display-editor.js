import kbn from 'app/core/utils/kbn';

export class CarpetplotDisplayEditorCtrl {
  constructor($scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.unitFormats = kbn.getUnitFormats();

    this.panelCtrl.render();
  }

  setUnitFormat(subItem) {
    this.panel.data.unitFormat = subItem.value;
    this.panelCtrl.render();
  }
}

export function carpetplotDisplayEditor() {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/plugins/petrslavotinek-carpetplot-panel/partials/display-editor.html',
    controller: CarpetplotDisplayEditorCtrl,
  };
}
