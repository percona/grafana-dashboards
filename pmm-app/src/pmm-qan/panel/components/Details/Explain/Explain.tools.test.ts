import { base64Decode, parseExplain } from './Explain.tools';

jest.mock('@percona/platform-core', () => {
  const originalModule = jest.requireActual('@percona/platform-core');

  return {
    ...originalModule,
    logger: {
      error: jest.fn(),
    },
  };
});

describe('Explain.tools::', () => {
  it('should decode base64', () => {
    expect(base64Decode('dGVzdA==')).toEqual('test');
  });
  it('should return original string on base64 decode fail', () => {
    expect(base64Decode('test=')).toEqual('test=');
  });
  it('should parse explain', () => {
    const explain = {
      explain_result: btoa('test explain'),
      explained_query: 'test original query',
      is_dml: false,
    };
    const actionResult = {
      error: '',
      loading: false,
      value: JSON.stringify(explain),
    };
    const result = parseExplain(actionResult);

    expect(result.explain_result).toEqual('test explain');
  });
  it('should return original value when not JSON encoded', () => {
    const actionResult = {
      error: '',
      loading: false,
      value: 'not encoded',
    };

    expect(parseExplain(actionResult)).toEqual('not encoded');
  });
  it('should return null when value is null', () => {
    const actionResult = {
      error: '',
      loading: false,
      value: null,
    };

    expect(parseExplain(actionResult)).toBeNull();
  });
  it('should return orignal explain result when base64 decode fails', () => {
    const explain = {
      explain_result: 'test=',
      explained_query: 'test original query',
      is_dml: false,
    };
    const actionResult = {
      error: '',
      loading: false,
      value: JSON.stringify(explain),
    };
    const result = parseExplain(actionResult);

    expect(result.explain_result).toEqual('test=');
  });
});
