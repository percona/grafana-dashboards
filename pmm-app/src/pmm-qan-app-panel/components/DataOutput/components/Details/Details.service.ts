import {
  apiRequestManagement,
  apiRequestQAN,
} from '../../../../../react-plugins-deps/components/helpers/api';
import { getLabelQueryParams } from '../../../../panel/panel.tools';

class DetailsService {
  static async getExample({
    filterBy, groupBy, labels = [], from, to, tables = [],
  }) {
    const data = {
      filter_by: filterBy,
      group_by: groupBy,
      labels: getLabelQueryParams(labels),
      period_start_from: from,
      period_start_to: to,
      tables,
    };

    return apiRequestQAN.post<any, any>('/ObjectDetails/GetQueryExample', data);
  }

  static getActionResult(body) {
    return apiRequestManagement.post<any, any>('/Actions/Get', body);
  }
}

export default DetailsService;
