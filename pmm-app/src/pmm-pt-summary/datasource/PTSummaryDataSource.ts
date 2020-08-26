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

/* eslint-disable no-useless-constructor, class-methods-use-this */
export class PTSummaryDataSource extends DataSourceApi {
  constructor(instanceSettings: DataSourceInstanceSettings) {
    super(instanceSettings);
  }

  async query(): Promise<DataQueryResponse> {
    return PTSummaryService.getPTSummary({ node_id: getTemplateSrv().replace('$node_id') }).then(
      async (response) => {
        const result = await getActionResult(response.action_id);

        return {
          data: [
            new MutableDataFrame({
              fields: [
                {
                  name: 'summary',
                  values: [result.error ? result.error : result.value],
                  type: FieldType.string,
                },
              ],
            }),
          ],
        };
      },
    );
  }

  async testDatasource() {
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
