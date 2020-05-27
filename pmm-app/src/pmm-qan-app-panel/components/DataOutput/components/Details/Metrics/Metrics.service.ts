import { apiRequestQAN } from '../../../../../../react-plugins-deps/components/helpers/api';
import { getLabelQueryParams } from '../../../../../panel/panel.tools';

class MetricsService {
  static getMetrics({ filterBy, groupBy, labels = [], from, to, tables = [], totals }) {
    const body = {
      filter_by: filterBy || '',
      group_by: groupBy,
      labels: getLabelQueryParams(labels),
      period_start_from: from,
      period_start_to: to,
      tables: tables,
      totals: totals,
    };

    return apiRequestQAN.post<any, any>('/ObjectDetails/GetMetrics', body);
  }
}

export default MetricsService;
