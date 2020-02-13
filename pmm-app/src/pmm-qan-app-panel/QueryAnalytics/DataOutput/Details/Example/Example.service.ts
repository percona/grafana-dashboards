import { apiRequestQAN } from '../../../../../react-plugins-deps/components/helpers/api';

class ExampleService {
  static async getExample({ filterBy, groupBy, labels, periodStartFrom, periodStartTo, tables }) {
    const data = {
      filter_by: filterBy,
      group_by: groupBy,
      labels: labels || [],
      period_start_from: periodStartFrom,
      period_start_to: periodStartTo,
      tables: tables || [],
    };

    return apiRequestQAN.post<any, any>('/ObjectDetails/GetQueryExample', data);
  }
}

export default ExampleService;
