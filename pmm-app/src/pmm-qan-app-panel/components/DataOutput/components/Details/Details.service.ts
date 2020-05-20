import {
  apiRequestManagement,
  apiRequestQAN,
} from '../../../../../react-plugins-deps/components/helpers/api';

class DetailsService {
  static async getExample({ filterBy, groupBy, labels = [], from, to, tables = [] }) {
    const data = {
      filter_by: filterBy,
      group_by: groupBy,
      labels:
        Object.keys(labels).map(key => {
          return {
            key: key,
            value: labels[key],
          };
        }) || [],
      period_start_from: from,
      period_start_to: to,
      tables: tables,
    };

    return apiRequestQAN.post<any, any>('/ObjectDetails/GetQueryExample', data);
  }

  static getActionResult({ action_id }) {
    const body = {
      action_id,
    };
    return apiRequestManagement.post<any, any>('/Actions/Get', body);
  }
}

export default DetailsService;
