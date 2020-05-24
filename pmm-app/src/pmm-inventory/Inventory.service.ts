import { apiRequest } from '../react-plugins-deps/components/helpers/api';

interface RemoveServiceInterface {
  service_id: string;
  force: boolean;
}

export class InventoryService {
  static async getAgents(body) {
    return apiRequest.post<any, any>('/v1/inventory/Agents/List', body);
  }
  static async removeAgent(body) {
    return apiRequest.post<any, any>('/v1/inventory/Agents/Remove', body);
  }
  static async getServices(body) {
    return apiRequest.post<any, any>('/v1/inventory/Services/List', body);
  }
  static async removeService(body: RemoveServiceInterface) {
    return apiRequest.post<any, any>('/v1/inventory/Services/Remove', body);
  }
  static async getNodes(body) {
    return apiRequest.post<any, any>('/v1/inventory/Nodes/List', body);
  }
  static async removeNode(body) {
    return apiRequest.post<any, any>('/v1/inventory/Nodes/Remove', body);
  }
}
