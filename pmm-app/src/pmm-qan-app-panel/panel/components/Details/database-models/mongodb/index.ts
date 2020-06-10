import MongoDBService from './service';

export default class Mongodb {
  static async getExplainJSON({ example }) {
    try {
      const result = await MongoDBService.getTraditionalExplainJSONMongo({
        pmm_agent_id: example.pmm_agent_id,
        service_id: example.service_id,
        query: example.example,
      });
      return result.action_id
    } catch (e) {
      console.error(e);
    }
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
