import { apiRequestQAN } from 'shared/components/helpers/api';
import { getLabelQueryParams } from 'pmm-qan/panel/QueryAnalytics.tools';
import { OverviewServiceInterface } from './Overview.types';

export default {
  getReport: async (body: OverviewServiceInterface) => {
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
      search: body.dimensionSearchText,
    };

    return apiRequestQAN.post<any, any>('/GetReport', request);
  },
};
