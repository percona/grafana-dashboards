import React from 'react';
import { render } from '@testing-library/react';
import { NonTimeMetric, TimeMetric } from './MetricColumns';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('antd/es/tooltip', () => <div className="tooltip" />);

jest.mock('shared/components/helpers/getPmmTheme', () => ({
  getPmmTheme: jest.fn(() => ({
    mainTextColor: 'black',
    table: {
      backgroundColor: 'black',
      borderColor: 'black',
      headerBackground: 'black',
      textColor: 'black',
    },
  })),
}));

describe('TimeMetric::', () => {
  it('should render time metric correct with value', async () => {
    const { container } = render(<TimeMetric value={10} percentage={10} cnt={10} />);
    const span = container.querySelector('div > span');

    expect(span?.textContent).toBe('10.00 sec');
  });

  it('should render time metric correct without value but with positive cnt', async () => {
    const { container } = render(<TimeMetric value={undefined} percentage={10} cnt={10} />);
    const span = container.querySelector('div > span');

    expect(span?.textContent).toBe('0');
  });

  it('should render time metric correct without value but with negative cnt', async () => {
    const { container } = render(<TimeMetric value={undefined} percentage={10} cnt={-10} />);
    const span = container.querySelector('div > span');

    expect(span?.textContent).toBe('');
  });

  it('should render time metric correct without value and without cnt', async () => {
    const { container } = render(<TimeMetric value={undefined} percentage={10} cnt={undefined} />);
    const span = container.querySelector('div > span');

    expect(span?.textContent).toBe('N/A');
  });
});

describe('NonTimeMetric::', () => {
  it('should render non metric correct with value', async () => {
    const { container } = render(<NonTimeMetric value={10} percentage={10} cnt={10} units="test" />);
    const span = container.querySelector('div > span');

    expect(span?.textContent).toBe('10.00 test');
  });

  it('should render non metric correct without value but with positive cnt', async () => {
    const { container } = render(<NonTimeMetric value={undefined} percentage={10} cnt={10} units="test" />);
    const span = container.querySelector('div > span');

    expect(span?.textContent).toBe('0 test');
  });

  it('should render non metric correct without value but with negative cnt', async () => {
    const { container } = render(<NonTimeMetric value={undefined} percentage={10} cnt={-10} units="test" />);
    const span = container.querySelector('div > span');

    expect(span?.textContent).toBe('');
  });

  it('should render time metric correct without value and without cnt', async () => {
    const { container } = render(<NonTimeMetric value={undefined} percentage={10} cnt={undefined} units="test" />);
    const span = container.querySelector('div > span');

    expect(span?.textContent).toBe('N/A');
  });
});
