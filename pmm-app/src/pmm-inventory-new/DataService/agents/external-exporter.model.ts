import { CustomLabelsModel } from '../custom-labels.model';

export class ExternalExporterModel {
  agent_id: string;
  custom_labels: Array<CustomLabelsModel>;
  metrics_url: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.agent_id = params.agent_id || '';
    this.custom_labels = params.custom_labels && Object.keys(params.custom_labels).length ?
      Object.entries(params.custom_labels).map(item => new CustomLabelsModel(item)) : [];
    this.metrics_url = params.metrics_url || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}
