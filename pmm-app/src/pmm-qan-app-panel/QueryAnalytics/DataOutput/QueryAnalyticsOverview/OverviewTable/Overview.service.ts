import { apiRequestQAN } from '../../../../../react-plugins-deps/components/helpers/api';

interface OverviewServiceInterface {
  columns: string[];
  first_seen: boolean;
  group_by: string;
  include_only_fields?: any[]; // ?????
  keyword?: string; // ?????
  labels?: string[];
  limit?: number;
  main_metric: string;
  offset?: number;
  orderBy: string;
  from?: any; // ISO8601
  to?: any; // ISO8601
  pageSize?: number;
  pageNumber?: number;
  groupBy?: string;
  firstSeen?: boolean;
}
class OverviewService {
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
      first_seen: body.firstSeen,
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

export default OverviewService;
