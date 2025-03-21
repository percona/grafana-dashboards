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
  it('should render filters correct', async () => {
    render(<TimeMetric value={10} percentage={10} cnt={10} />);
  });
});

describe('NonTimeMetric::', () => {
  it('should render filters correct', async () => {
    render(<NonTimeMetric value={10} percentage={10} cnt={10} units="test" />);
  });
});
