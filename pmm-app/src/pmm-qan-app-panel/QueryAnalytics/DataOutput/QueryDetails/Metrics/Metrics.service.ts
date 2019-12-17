import { apiRequest } from '../../../../../react-plugins-deps/components/helpers/api';

class MetricsService {
  static async getMetrics({ filterBy, groupBy, labels, periodStartFrom, periodStartTo, tables }) {
    const body = {
      filter_by: filterBy,
      group_by: groupBy,
      labels: labels || [],
      period_start_from: periodStartFrom,
      period_start_to: periodStartTo,
      tables: tables || [],
    };

    return apiRequest.post<any, any>('/v0/qan/ObjectDetails/GetMetrics', body);
  }
}

export default MetricsService;
