import { CustomLabelsModel } from '../custom-labels.model';

export class PmmAgentModel {
  agent_id: string;
  connected: boolean;
  custom_labels: Array<CustomLabelsModel>;
  runs_on_node_id: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.agent_id = params.agent_id || '';
    this.connected = params.connected || '';
    this.custom_labels = params.custom_labels && Object.keys(params.custom_labels).length ?
      Object.entries(params.custom_labels).map(item => new CustomLabelsModel(item)) : [];
    this.runs_on_node_id = params.runs_on_node_id || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}

