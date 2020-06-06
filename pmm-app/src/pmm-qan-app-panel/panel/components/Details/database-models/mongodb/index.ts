import MongoDBService from './service';

export default class Mongodb {
  static async getExplainJSON({ example, setActionId }) {
    try {
      const result = await MongoDBService.getTraditionalExplainJSONMongo({
        pmm_agent_id: example.pmm_agent_id,
        service_id: example.service_id,
        query: example.example,
      });
      setActionId(result.action_id);
    } catch (e) {
      console.error(e);
    }
  }

  static getExplains({ example, setActionIdJSON, setErrorText }) {
    if (!('example' in example) || example.example === '') {
      setErrorText('Cannot display query explain without query example at this time.');
      return;
    }
    this.getExplainJSON({ example, setActionId: setActionIdJSON });
  }

  static async getShowCreateTables() {
    console.error('Does not exist for MongoDB');
  }

  static async getIndexes() {
    console.error('Does not exist for MongoDB');
  }

  static async getStatuses() {
    console.error('Does not exist for MongoDB');
  }
}
