import { buildShareLink, toUnixTimestamp } from './QueryAnalytics.tools';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('@grafana/runtime', () => ({
  config: { bootData: { user: { orgId: 1 } } },
}));

let windowSpy;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('QueryAnalytics.tools::', () => {
  test('toUnixTimestamp', () => {
    expect(toUnixTimestamp('2022-01-17T11:07:29+00:00')).toBe(1642417649000);
    expect(toUnixTimestamp('Mon, 17 Jan 2022 11:09:12 +0000')).toBe(1642417752000);
    expect(toUnixTimestamp('Tue, 22 June 2021 23:30:10 +0100')).toBe(1624401010000);
  });
  test('buildShareLink', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        origin: 'https://localhost.com',
        pathname: '/graph',
        search: '?page_number=2&page_size=25',
      },
    }));
    const result = buildShareLink(1624401010000, 1642417914429);
    const expected = 'https://localhost.com/graph?page_number=2&page_size=25&from=1624401010000&to=1642417914429&orgId=1';

    expect(result).toBe(expected);
  });
});
