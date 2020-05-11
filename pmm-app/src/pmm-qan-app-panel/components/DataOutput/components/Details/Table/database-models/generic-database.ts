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
}
