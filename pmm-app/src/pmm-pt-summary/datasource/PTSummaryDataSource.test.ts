import { FieldType, MutableDataFrame } from '@grafana/data';
import { PTSummaryDataSource } from './PTSummaryDataSource';
import { PTSummaryService } from './PTSummary.service';

jest.mock('shared/components/helpers/notification-manager');

describe('PTSummaryDatasource::', () => {
  it('Returns correct data', async () => {
    const expected = {
      data: [
        new MutableDataFrame({
          fields: [
            { name: 'summary', values: ['Test data'], type: FieldType.string }
          ]
        })
      ]
    };
    const mockResponse = new Promise((resolve) => resolve({ fingerprint: 'Test data' }));
    const instance = new PTSummaryDataSource({} as any);

    PTSummaryService.getPTSummary = jest.fn().mockResolvedValueOnce(mockResponse);

    const result = await instance.query();

    expect(result).toEqual(expected);
  });
});
