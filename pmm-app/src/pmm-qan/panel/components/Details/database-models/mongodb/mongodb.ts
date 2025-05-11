import MongoDBService from './service';
import { stripPrefix } from '../utils';

export const mongodbMethods = {
  getExplainJSON: async ({ example }, disableNotifications = false) => {
    try {
      const result = await MongoDBService.getTraditionalExplainJSONMongo(
        {
          pmm_agent_id: example.pmm_agent_id,
          service_id: stripPrefix(example.service_id, '/service_id/'),
          query: example.example,
        },
        disableNotifications,
      );

      return result.mongodb_explain.action_id;
    } catch (e) {
      console.error(e);

      return null;
    }
  },
};
