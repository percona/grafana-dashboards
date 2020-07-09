import { apiRequest } from 'shared/components/helpers/api';

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
  getAgents(body = {}) {
    return apiRequest.post<any, any>('/v1/inventory/Agents/List', body);
  },
  removeAgent(body: RemoveAgentBody) {
    return apiRequest.post<any, any>('/v1/inventory/Agents/Remove', body);
  },
  getServices(body = {}) {
    return apiRequest.post<any, any>('/v1/inventory/Services/List', body);
  },
  removeService(body: RemoveServiceBody) {
    return apiRequest.post<any, any>('/v1/inventory/Services/Remove', body);
  },
  getNodes(body = {}) {
    return apiRequest.post<any, any>('/v1/inventory/Nodes/List', body);
  },
  removeNode(body: RemoveNodeBody) {
    return apiRequest.post<any, any>('/v1/inventory/Nodes/Remove', body);
  },
};
