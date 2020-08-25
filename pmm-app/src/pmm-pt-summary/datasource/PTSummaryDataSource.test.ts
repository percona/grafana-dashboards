import { FieldType, MutableDataFrame } from '@grafana/data';
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
  it('Returns correct data', async () => {
    const expected = {
      data: [
        new MutableDataFrame({
          fields: [{ name: 'summary', values: ['Test data'], type: FieldType.string }],
        }),
      ],
    };
    // const mockResponse = new Promise((resolve) => resolve({ value: 'Test data' }));
    const instance = new PTSummaryDataSource({} as any);

    PTSummaryService.getPTSummary = jest.fn().mockResolvedValueOnce({ value: 'Test data' });

    const result = await instance.query();

    expect(result).toEqual(expected);
  });
});
