import { MongoDBService } from './service';

export default class Mongodb {
  static async getExplainJSON({ example, setActionId }) {
    try {
      // setLoading(true);
      const { action_id } = await MongoDBService.getTraditionalExplainJSONMongo({
        pmm_agent_id: example.pmm_agent_id,
        service_id: example.service_id,
        query: example.example,
      });
      setActionId(action_id);
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      // TODO: add error handling
    }
  }

  static getExplains({
    example, setActionIdTraditional, setActionIdJSON, setErrorText,
  }) {
    if (!('example' in example) || example.example === '') {
      setErrorText('Cannot display query explain without query example at this time.');
      return;
    }
    this.getExplainJSON({ example, setActionId: setActionIdJSON });
  }
}
