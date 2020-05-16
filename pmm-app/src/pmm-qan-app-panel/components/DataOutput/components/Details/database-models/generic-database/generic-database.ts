// @ts-nocheck

export class GenericDatabase {
  constructor() {}

  getShowCreateTables({ example, tableName, setActionId }) {
    console.error('Not implemented');
  }

  async getIndexes({ example, tableName, setActionId }) {
    console.error('Not implemented');
  }

  getStatuses({ example, tableName, setActionId }) {
    console.error('Not implemented');
  }

  async getExplainJSON({ example, setActionId }) {
    console.error('Not implemented');
  }

  async getExplainTraditional({ example, setActionId }) {
    console.error('Not implemented');
  }

  getExplains({ example, setActionIdTraditional, setActionIdJSON, setErrorText }) {
    console.error('Not implemented');
  }
}
