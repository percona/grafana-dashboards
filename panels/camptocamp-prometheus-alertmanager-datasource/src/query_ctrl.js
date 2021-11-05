import {QueryCtrl} from 'app/plugins/sdk';
import './css/query-editor.css!'

export class GenericDatasourceQueryCtrl extends QueryCtrl {

constructor($scope, $injector, uiSegmentSrv)  {
  super($scope, $injector);

  this.scope = $scope;
  this.uiSegmentSrv = uiSegmentSrv;
  this.target.target = this.target.target || 'Query';
  this.target.type = this.target.type || 'timeserie';
  this.target.annotations = this.target.annotations || false;
  this.target.expr = this.target.expr || '';
  this.target.legendFormat = this.target.legendFormat || '';
  this.target.labelSelector = this.target.labelSelector || '*';
}

getOptions(query) {
  // Options have to be transformed by uiSegmentSrv to be usable by metric-segment-model directive
  return this.datasource.metricFindQuery(query || '')
  .then(this.uiSegmentSrv.transformToSegments(false));
}

toggleEditorMode() {
  this.target.rawQuery = !this.target.rawQuery;
}

onChangeInternal() {
  this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }
}

GenericDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
