import { apiRequestManagement } from '../../../../../react-plugins-deps/helpers/api';

class DetailsService {
  static getActionResult({ action_id }) {
    const body = {
      action_id,
    };
    return apiRequestManagement.post<any, any>('/Actions/Get', body);
  }
}

export default DetailsService;
