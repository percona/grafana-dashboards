import { apiRequestQAN } from '../../../../../react-plugins-deps/components/helpers/api';

class MetricsService {
  static getMetrics({ filterBy, groupBy, labels = [], from, to, tables = [] }) {
    const body = {
      filter_by: filterBy,
      group_by: groupBy,
      labels: labels,
      period_start_from: from,
      period_start_to: to,
      tables: tables,
    };

    return apiRequestQAN.post<any, any>('/ObjectDetails/GetMetrics', body);
  }
}

export default MetricsService;
