import {
  DataQueryResponse,
  DataSourceApi,
  MutableDataFrame,
  FieldType,
  DataSourceInstanceSettings,
  DataQueryRequest,
} from '@grafana/data';
import { getActionResult } from 'shared/components/Actions';
import { PTSummaryService } from './PTSummary.service';
import { DatasourceType, PTSummaryResponse } from './PTSummary.types';

/* eslint-disable no-useless-constructor, class-methods-use-this */
export class PTSummaryDataSource extends DataSourceApi {
  constructor(instanceSettings: DataSourceInstanceSettings) {
    super(instanceSettings);
  }

  async query(options: DataQueryRequest): Promise<DataQueryResponse> {
    const summaryType = options.targets[0].queryType;

    const getRequest = (type) => {
      switch (type) {
        case DatasourceType.node:
          return PTSummaryService.getPTSummary();
        case DatasourceType.mysql:
          return PTSummaryService.getMysqlPTSummary();
        case DatasourceType.mongodb:
          return PTSummaryService.getMongodbPTSummary();
        case DatasourceType.postgresql:
          return PTSummaryService.getPostgresqlPTSummary();
        default:
          return PTSummaryService.getPTSummary();
      }
    };

    return getRequest(summaryType)
      .then(async (response) => {
        const result = await getActionResult((response as PTSummaryResponse).action_id);

        return this.newDataFrame(result.error ? result.error : result.value);
      })
      .catch((error) => this.newDataFrame(error.response.data.message));
  }

  async testDatasource() {
    return {
      status: 'success',
      message: 'Success',
    };
  }

  newDataFrame(value: string) {
    return {
      data: [
        new MutableDataFrame({
          fields: [
            {
              name: 'summary',
              values: [value],
              type: FieldType.string,
            },
          ],
        }),
      ],
    };
  }
}
