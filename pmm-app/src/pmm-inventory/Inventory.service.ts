import { apiRequestInventory } from '../react-plugins-deps/helpers/api';

export class InventoryService {
  static async getAgents(body) {
    return apiRequestInventory.post<any, any>('/Agents/List', body);
  }
  static async getServices(body) {
    return apiRequestInventory.post<any, any>('/Services/List', body);
  }
  static async getNodes(body) {
    return apiRequestInventory.post<any, any>('/Nodes/List', body);
  }
}
