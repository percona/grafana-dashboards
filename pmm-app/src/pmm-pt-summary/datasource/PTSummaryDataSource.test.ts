import { FieldType, MutableDataFrame, DataQueryRequest } from '@grafana/data';
import { ActionResult } from 'shared/components/Actions';
import { PTSummaryDataSource } from './PTSummaryDataSource';
import { PTSummaryService } from './PTSummary.service';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('@grafana/runtime', () => ({
  getTemplateSrv: () => ({
    replace: () => 'node',
  }),
}));
jest.mock('shared/components/Actions/Actions.utils', () => ({
  getActionResult: async (): Promise<ActionResult> => new Promise((resolve) => {
    resolve({
      loading: false,
      value: 'Test data',
      error: '',
    });
  }),
}));

describe('PTSummaryDatasource::', () => {
  it('Returns correct data for Node summary', async () => {
    const expected = {
      data: [
        new MutableDataFrame({
          fields: [{ name: 'summary', values: ['Test data'], type: FieldType.string }],
        }),
      ],
    };
    const instance = new PTSummaryDataSource({} as any);

    PTSummaryService.getPTSummary = jest.fn().mockResolvedValueOnce({ value: 'Test data' });

    const result = await instance.query({ targets: [{ refId: 'A' }] } as DataQueryRequest);

    expect(result).toEqual(expected);
  });

  it('Returns correct data for MySQL summary', async () => {
    const expected = {
      data: [
        new MutableDataFrame({
          fields: [{ name: 'summary', values: ['Test data'], type: FieldType.string }],
        }),
      ],
    };
    const instance = new PTSummaryDataSource({} as any);

    PTSummaryService.getMysqlPTSummary = jest.fn().mockResolvedValueOnce({ value: 'Test data' });

    const result = await instance.query({
      targets: [{ refId: 'A', queryType: 'mysql' }],
    } as DataQueryRequest);

    expect(result).toEqual(expected);
  });

  it('Returns correct data for MongoDB summary', async () => {
    const expected = {
      data: [
        new MutableDataFrame({
          fields: [{ name: 'summary', values: ['Test data'], type: FieldType.string }],
        }),
      ],
    };
    const instance = new PTSummaryDataSource({} as any);

    PTSummaryService.getMongodbPTSummary = jest.fn().mockResolvedValueOnce({ value: 'Test data' });

    const result = await instance.query({
      targets: [{ refId: 'A', queryType: 'mongodb' }],
    } as DataQueryRequest);

    expect(result).toEqual(expected);
  });

  it('Returns correct data for PostgreSQL summary', async () => {
    const expected = {
      data: [
        new MutableDataFrame({
          fields: [{ name: 'summary', values: ['Test data'], type: FieldType.string }],
        }),
      ],
    };
    const instance = new PTSummaryDataSource({} as any);

    PTSummaryService.getPostgresqlPTSummary = jest.fn().mockResolvedValueOnce({ value: 'Test data' });

    const result = await instance.query({
      targets: [{ refId: 'A', queryType: 'postgresql' }],
    } as DataQueryRequest);

    expect(result).toEqual(expected);
  });
});
