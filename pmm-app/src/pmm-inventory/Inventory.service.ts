import { apiRequestQAN } from '../react-plugins-deps/components/helpers/api';

class InventoryService {
  static async getAgents(body) {
    return apiRequestQAN.post<any, any>('/v1/inventory/Agents/List', body);
  }
  static async getServices(body) {
    return apiRequestQAN.post<any, any>('/v1/inventory/Services/List', body);
  }
  static async getNodes(body) {
    return apiRequestQAN.post<any, any>('/v1/inventory/Nodes/List', body);
  }
}

export default InventoryService;
