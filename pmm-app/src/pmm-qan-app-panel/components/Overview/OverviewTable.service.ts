import { apiRequestQAN } from '../../../react-plugins-deps/helpers/api';
import { OverviewServiceInterface } from './OverviewTable.types';

class OverviewTableService {
  static async getReport(body: OverviewServiceInterface) {
    const columns = body.columns;
    const labels =
      Object.keys(body.labels).map(key => {
        return {
          key: key,
          value: body.labels[key],
        };
      }) || [];
    const request = {
      columns: columns,
      group_by: body.groupBy,
      include_only_fields: [],
      keyword: '',
      labels: labels,
      limit: body.pageSize,
      offset: (body.pageNumber - 1) * body.pageSize,
      order_by: body.orderBy,
      main_metric: columns[0],
      period_start_from: body.from,
      period_start_to: body.to,
    };
    return apiRequestQAN.post<any, any>('/GetReport', request);
  }
}

export default OverviewTableService;
