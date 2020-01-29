import { apiRequest } from '../../../../../react-plugins-deps/components/helpers/api';

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
  order_by: string;
  period_start_from?: any; // ISO8601
  period_start_to?: any; // ISO8601
}
class OverviewService {
  static async getReport(body: OverviewServiceInterface) {
    const request = {
      columns: body.columns || ['load', 'num_queries', 'query_time'],
      first_seen: false,
      group_by: 'queryid',
      include_only_fields: [],
      keyword: '',
      labels: body.labels || [],
      limit: 10,
      offset: 0,
      order_by: '-load',
      main_metric: 'load',
      period_start_from: '2020-01-29T14:02:10+00:00',
      period_start_to: '2020-01-30T04:02:10+00:00',
    };
    return apiRequest.post<any, any>('/v0/qan/GetReport', request);
  }
}

export default OverviewService;
