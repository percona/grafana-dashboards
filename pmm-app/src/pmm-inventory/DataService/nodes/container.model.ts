/* tslint:disable */
import { CustomLabelsModel } from '../custom-labels.model';

export class ContainerModel {
  address: string;
  az: string;
  docker_container_id: string;
  docker_container_name: string;
  custom_labels: CustomLabelsModel[];
  machine_id: string;
  node_id: string;
  node_model: string;
  node_name: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.address = params.address || '';
    this.az = params.az || '';
    this.custom_labels =
      params.custom_labels && Object.keys(params.custom_labels).length
        ? Object.entries(params.custom_labels).map(item => new CustomLabelsModel(item))
        : [];
    this.docker_container_id = params.docker_container_id || '';
    this.docker_container_name = params.docker_container_name || '';
    this.machine_id = params.machine_id || '';
    this.node_id = params.node_id || '';
    this.node_model = params.node_model || '';
    this.node_name = params.node_name || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}
