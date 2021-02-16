import {
  DataQueryResponse,
  DataSourceApi,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';
import { getActionResult } from 'shared/components/Actions';
import { PTSummaryService } from './PTSummary.service';
import { DatasourceType, PTSummaryResponse } from './PTSummary.types';

/* eslint-disable no-useless-constructor, class-methods-use-this */
export class PTSummaryDataSource extends DataSourceApi {
  private queryType?: string;

  constructor(instanceSettings: any) {
    super(instanceSettings);
    this.queryType = instanceSettings.jsonData?.queryType;
  }

  async query(options): Promise<DataQueryResponse> {
    const { variableName } = options.targets[0].queryType;

    const getRequest = (type) => {
      switch (type) {
        case DatasourceType.node:
          return PTSummaryService.getPTSummary(variableName);
        case DatasourceType.mysql:
          return PTSummaryService.getMysqlPTSummary(variableName);
        case DatasourceType.mongodb:
          return PTSummaryService.getMongodbPTSummary(variableName);
        case DatasourceType.postgresql:
          return PTSummaryService.getPostgresqlPTSummary(variableName);
        default:
          return PTSummaryService.getPTSummary(variableName);
      }
    };

    return getRequest(this.queryType)
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
