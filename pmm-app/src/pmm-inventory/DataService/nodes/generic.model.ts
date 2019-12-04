import { CustomLabelsModel } from '../custom-labels.model';

export class GenericModel {
  address: string;
  az: string;
  custom_labels: Array<CustomLabelsModel>;
  distro: string;
  distro_version: string;
  machine_id: string;
  node_id: string;
  node_name: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.address = params.address || '';
    this.az = params.az || '';
    this.custom_labels = params.custom_labels && Object.keys(params.custom_labels).length ?
      Object.entries(params.custom_labels).map(item => new CustomLabelsModel(item)) : [];
    this.distro = params.distro || '';
    this.distro_version = params.distro_version || '';
    this.machine_id = params.machine_id || '';
    this.node_id = params.node_id || '';
    this.node_name = params.node_name || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}
