/* tslint:disable */
import { CustomLabelsModel } from '../custom-labels.model';

export class RemoteAmazonRdsModel {
  custom_labels: CustomLabelsModel[];
  instance: string;
  node_id: string;
  node_name: string;
  region: string;
  agentType: string;
  isDeleted: boolean;
  address: string;
  constructor(params, type) {
    this.custom_labels =
      params.custom_labels && Object.keys(params.custom_labels).length
        ? Object.entries(params.custom_labels).map(item => new CustomLabelsModel(item))
        : [];
    this.address = params.address || '';
    this.instance = params.instance || '';
    this.node_id = params.node_id || '';
    this.node_name = params.node_name || '';
    this.region = params.region || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}
