import MongoDBService from './service';

export const mongodbMethods = {
  getExplainJSON: async ({ example }) => {
    try {
      const result = await MongoDBService.getTraditionalExplainJSONMongo({
        pmm_agent_id: example.pmm_agent_id,
        service_id: example.service_id,
        query: example.example,
      });

      return result.action_id;
    } catch (e) {
      console.error(e);

      return null;
    }
  },
};
