import { apiRequestQAN } from '../../../../../../react-plugins-deps/helpers/api';

class MetricsService {
  static getMetrics({ filterBy, groupBy, labels = [], from, to, tables = [], totals }) {
    const body = {
      filter_by: filterBy || '',
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
      totals: totals,
    };

    return apiRequestQAN.post<any, any>('/ObjectDetails/GetMetrics', body);
  }
}

export default MetricsService;
