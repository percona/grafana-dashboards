import {
  DataQueryResponse,
  DataSourceApi,
  MutableDataFrame,
  FieldType,
  DataSourceInstanceSettings,
} from '@grafana/data';
import { PTSummaryService } from './PTSummary.service';

/* eslint-disable no-useless-constructor, class-methods-use-this */
export class PTSummaryDataSource extends DataSourceApi {
  constructor(instanceSettings: DataSourceInstanceSettings) {
    super(instanceSettings);
  }

  async query(): Promise<DataQueryResponse> {
    const body = {
      filter_by: '3781167706683981963',
      group_by: 'queryid',
      labels: [
        {
          key: 'database',
          value: ['All', 'postgres']
        }
      ],
      period_start_from: '2020-08-10T05:39:14.349Z',
      period_start_to: '2020-09-10T17:39:14+00:00',
      tables: [],
      totals: false
    };

    // TODO: call correct BE and add response interface
    return PTSummaryService.getPTSummary(body)
      .then((response: any) => ({
        data: [
          new MutableDataFrame({
            fields: [
              { name: 'summary', values: [response.fingerprint], type: FieldType.string }
            ]
          })
        ]
      }));
  }

  async testDatasource() {
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
