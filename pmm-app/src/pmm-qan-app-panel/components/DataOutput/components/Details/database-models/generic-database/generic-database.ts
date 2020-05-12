// @ts-nocheck

export class GenericDatabase {
  constructor() {}

  getShowCreateTables({ example, tableName, setErrorText, setActionId }) {
    throw new Error('Not available in superclass');
  }

  async getIndexes({ example, tableName, setErrorText, setActionId }) {
    throw new Error('Not available in superclass');
  }

  getStatuses({ example, tableName, setErrorText, setActionId }) {
    throw new Error('Not available in superclass');
  }

  async getExplainJSON({ example, setActionId }) {
    throw new Error('Not available in superclass');
  }

  async getExplainTraditional({ example, setActionId }) {
    throw new Error('Not available in superclass');
  }

  getExplains({ example, setActionIdTraditional, setActionIdJSON, setErrorText }) {
    throw new Error('Not implemented');
  }
}
