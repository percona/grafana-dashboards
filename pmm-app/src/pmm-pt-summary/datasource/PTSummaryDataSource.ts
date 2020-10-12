import {
  DataQueryResponse,
  DataSourceApi,
  MutableDataFrame,
  FieldType,
  DataSourceInstanceSettings,
} from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import { getActionResult } from 'shared/components/Actions';
import { PTSummaryService } from './PTSummary.service';
import { PTSummaryResponse } from './PTSummary.types';

/* eslint-disable no-useless-constructor, class-methods-use-this */
export class PTSummaryDataSource extends DataSourceApi {
  constructor(instanceSettings: DataSourceInstanceSettings) {
    super(instanceSettings);
  }

  async query(): Promise<DataQueryResponse> {
    return PTSummaryService.getPTSummary({ node_id: getTemplateSrv().replace('$node_id') })
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
