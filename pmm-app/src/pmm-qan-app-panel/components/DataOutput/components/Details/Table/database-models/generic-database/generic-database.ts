import DetailsService from '../../../Details.service';

export class GenericDatabase {
  constructor() {}

  getShowCreateTables() {
    throw new Error('Not available in superclass');
  }

  async getIndexes() {
    throw new Error('Not available in superclass');
  }

  getStatuses() {
    throw new Error('Not available in superclass');
  }

  private async getExplainJSON() {
    throw new Error('Not available in superclass');
  }

  private async getExplainTraditional() {
    throw new Error('Not available in superclass');
  }

  getExplains() {
    throw new Error('Not implemented');
  }
}
