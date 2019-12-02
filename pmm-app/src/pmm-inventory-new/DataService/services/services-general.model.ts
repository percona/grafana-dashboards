import { CustomLabelsModel } from '../custom-labels.model';

export class ServicesGeneralModel {
  address: string;
  cluster: string;
  custom_labels: Array<CustomLabelsModel>;
  environment: string;
  node_id: string;
  port: number;
  replication_set: string;
  service_id: string;
  service_name: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.address = params.address || '';
    this.cluster = params.cluster || '';
    this.custom_labels = params.custom_labels && Object.keys(params.custom_labels).length ?
      Object.entries(params.custom_labels).map(item => new CustomLabelsModel(item)) : [];
    this.environment = params.environment || '';
    this.node_id = params.node_id || '';
    this.port = params.port || '';
    this.replication_set = params.replication_set || '';
    this.service_id = params.service_id || '';
    this.service_name = params.service_name || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}
