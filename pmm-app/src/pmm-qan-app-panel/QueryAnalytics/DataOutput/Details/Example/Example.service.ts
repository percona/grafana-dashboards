import { apiRequestQAN } from '../../../../../react-plugins-deps/components/helpers/api';

class ExampleService {
  static async getExample({ filterBy, groupBy, labels = [], from, to, tables = [] }) {
    const data = {
      filter_by: filterBy,
      group_by: groupBy,
      labels: labels,
      period_start_from: from,
      period_start_to: to,
      tables: tables,
    };

    return apiRequestQAN.post<any, any>('/ObjectDetails/GetQueryExample', data);
  }
}

export default ExampleService;
