import { CustomLabelsModel } from '../custom-labels.model';

export class RemoteModel {
  custom_labels: Array<CustomLabelsModel>;
  node_id: string;
  node_name: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.custom_labels = params.custom_labels && Object.keys(params.custom_labels).length ?
      Object.entries(params.custom_labels).map(item => new CustomLabelsModel(item)) : [];
    this.node_id = params.node_id || '';
    this.node_name = params.node_name || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}
