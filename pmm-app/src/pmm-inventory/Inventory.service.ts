import { apiRequest } from 'react-plugins-deps/components/helpers/api';

interface RemoveServiceBody {
  service_id: string;
  force: boolean;
}
interface RemoveAgentBody {
  agent_id: string;
  force: boolean;
}
interface RemoveNodeBody {
  node_id: string;
  force: boolean;
}

export const InventoryService = {
  async getAgents(body) {
    return apiRequest.post<any, any>('/v1/inventory/Agents/List', body);
  },
  async removeAgent(body: RemoveAgentBody) {
    return apiRequest.post<any, any>('/v1/inventory/Agents/Remove', body);
  },
  async getServices(body) {
    return apiRequest.post<any, any>('/v1/inventory/Services/List', body);
  },
  async removeService(body: RemoveServiceBody) {
    return apiRequest.post<any, any>('/v1/inventory/Services/Remove', body);
  },
  async getNodes(body) {
    return apiRequest.post<any, any>('/v1/inventory/Nodes/List', body);
  },
  async removeNode(body: RemoveNodeBody) {
    return apiRequest.post<any, any>('/v1/inventory/Nodes/Remove', body);
  },
};
