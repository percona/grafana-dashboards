import { apiRequestQAN } from 'react-plugins-deps/components/helpers/api';
import { OverviewServiceInterface } from './OverviewTable.types';
import { getLabelQueryParams } from 'pmm-qan-app-panel/panel/panel.tools';

class OverviewTableService {
  static async getReport(body: OverviewServiceInterface) {
    const { columns } = body;
    const request = {
      columns,
      group_by: body.groupBy,
      include_only_fields: [],
      keyword: '',
      labels: getLabelQueryParams(body.labels),
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
