import React from 'react';
import { mount } from 'enzyme';
import { dataTestId } from '@percona/platform-core';
import { Databases } from 'shared/core';
import Metrics from './Metrics';
import { getChartDataFromHistogramItems } from './Metrics.utils';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('antd/es/tooltip', () => <div className="tooltip" />);

jest.mock('./hooks/useHistogram', () => ({
  useHistogram: jest.fn(({ theme }) => (
    [getChartDataFromHistogramItems([{ frequency: 6175, range: '(0-3)' }], theme), true]
  )),
}));

const originalConsoleError = console.error;

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

const metrics = [
  {
    name: 'Query Count',
    tooltip: 'Total number of queries',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
    units: 'QPS',
    complexMetric: '',
    sparkline: [
      {
        time_frame: 360,
        timestamp: '2020-12-01T21:06:00Z',
        num_queries_per_sec: 0.11111111,
      },
      {
        point: 1,
        time_frame: 360,
        timestamp: '2020-12-01T21:00:00Z',
        num_queries_per_sec: 0.19722222,
      },
      {
        point: 2,
        time_frame: 360,
        timestamp: '2020-12-01T20:54:00Z',
        num_queries_per_sec: 0.12777779,
      },
      {
        point: 3,
        time_frame: 360,
        timestamp: '2020-12-01T20:48:00Z',
        num_queries_per_sec: 0.12222222,
      },
      {
        point: 4,
        time_frame: 360,
        timestamp: '2020-12-01T20:42:00Z',
        num_queries_per_sec: 0.21388888,
      },
      {
        point: 5,
        time_frame: 360,
        timestamp: '2020-12-01T20:36:00Z',
        num_queries_per_sec: 0.28333333,
      },
      {
        point: 6,
        time_frame: 360,
        timestamp: '2020-12-01T20:30:00Z',
        num_queries_per_sec: 0.57222223,
      },
      {
        point: 7,
        time_frame: 360,
        timestamp: '2020-12-01T20:24:00Z',
        num_queries_per_sec: 0.21388888,
      },
      {
        point: 8,
        time_frame: 360,
        timestamp: '2020-12-01T20:18:00Z',
        num_queries_per_sec: 0.7083333,
      },
      {
        point: 9,
        time_frame: 360,
        timestamp: '2020-12-01T20:12:00Z',
        num_queries_per_sec: 0.13055556,
      },
      {
        point: 10,
        time_frame: 360,
        timestamp: '2020-12-01T20:06:00Z',
        num_queries_per_sec: 0.083333336,
      },
      {
        point: 11,
        time_frame: 360,
        timestamp: '2020-12-01T20:00:00Z',
        num_queries_per_sec: 0.083333336,
      },
      {
        point: 12,
        time_frame: 360,
        timestamp: '2020-12-01T19:54:00Z',
        num_queries_per_sec: 0.28611112,
      },
      {
        point: 13,
        time_frame: 360,
        timestamp: '2020-12-01T19:48:00Z',
        num_queries_per_sec: 0.375,
      },
      {
        point: 14,
        time_frame: 360,
        timestamp: '2020-12-01T19:42:00Z',
        num_queries_per_sec: 0.06388889,
      },
      {
        point: 15,
        time_frame: 360,
        timestamp: '2020-12-01T19:36:00Z',
        num_queries_per_sec: 0.06944445,
      },
      {
        point: 16,
        time_frame: 360,
        timestamp: '2020-12-01T19:30:00Z',
        num_queries_per_sec: 0.11666667,
      },
      {
        point: 17,
        time_frame: 360,
        timestamp: '2020-12-01T19:24:00Z',
        num_queries_per_sec: 0.18055555,
      },
      {
        point: 18,
        time_frame: 360,
        timestamp: '2020-12-01T19:18:00Z',
        num_queries_per_sec: 0.0027777778,
      },
      {
        point: 19,
        time_frame: 360,
        timestamp: '2020-12-01T19:12:00Z',
        num_queries_per_sec: 0.013888889,
      },
      {
        point: 20,
        time_frame: 360,
        timestamp: '2020-12-01T19:06:00Z',
        num_queries_per_sec: 0.10555556,
      },
      {
        point: 21,
        time_frame: 360,
        timestamp: '2020-12-01T19:00:00Z',
        num_queries_per_sec: 0.047222223,
      },
      {
        point: 22,
        time_frame: 360,
        timestamp: '2020-12-01T18:54:00Z',
        num_queries_per_sec: 0.044444446,
      },
      {
        point: 23,
        time_frame: 360,
        timestamp: '2020-12-01T18:48:00Z',
      },
      {
        point: 24,
        time_frame: 360,
        timestamp: '2020-12-01T18:42:00Z',
      },
      {
        point: 25,
        time_frame: 360,
        timestamp: '2020-12-01T18:36:00Z',
      },
      {
        point: 26,
        time_frame: 360,
        timestamp: '2020-12-01T18:30:00Z',
      },
      {
        point: 27,
        time_frame: 360,
        timestamp: '2020-12-01T18:24:00Z',
      },
      {
        point: 28,
        time_frame: 360,
        timestamp: '2020-12-01T18:18:00Z',
      },
      {
        point: 29,
        time_frame: 360,
        timestamp: '2020-12-01T18:12:00Z',
      },
      {
        point: 30,
        time_frame: 360,
        timestamp: '2020-12-01T18:06:00Z',
      },
      {
        point: 31,
        time_frame: 360,
        timestamp: '2020-12-01T18:00:00Z',
      },
      {
        point: 32,
        time_frame: 360,
        timestamp: '2020-12-01T17:54:00Z',
      },
      {
        point: 33,
        time_frame: 360,
        timestamp: '2020-12-01T17:48:00Z',
      },
      {
        point: 34,
        time_frame: 360,
        timestamp: '2020-12-01T17:42:00Z',
      },
      {
        point: 35,
        time_frame: 360,
        timestamp: '2020-12-01T17:36:00Z',
      },
      {
        point: 36,
        time_frame: 360,
        timestamp: '2020-12-01T17:30:00Z',
      },
      {
        point: 37,
        time_frame: 360,
        timestamp: '2020-12-01T17:24:00Z',
      },
      {
        point: 38,
        time_frame: 360,
        timestamp: '2020-12-01T17:18:00Z',
      },
      {
        point: 39,
        time_frame: 360,
        timestamp: '2020-12-01T17:12:00Z',
      },
      {
        point: 40,
        time_frame: 360,
        timestamp: '2020-12-01T17:06:00Z',
      },
      {
        point: 41,
        time_frame: 360,
        timestamp: '2020-12-01T17:00:00Z',
      },
      {
        point: 42,
        time_frame: 360,
        timestamp: '2020-12-01T16:54:00Z',
      },
      {
        point: 43,
        time_frame: 360,
        timestamp: '2020-12-01T16:48:00Z',
      },
      {
        point: 44,
        time_frame: 360,
        timestamp: '2020-12-01T16:42:00Z',
      },
      {
        point: 45,
        time_frame: 360,
        timestamp: '2020-12-01T16:36:00Z',
      },
      {
        point: 46,
        time_frame: 360,
        timestamp: '2020-12-01T16:30:00Z',
      },
      {
        point: 47,
        time_frame: 360,
        timestamp: '2020-12-01T16:24:00Z',
      },
      {
        point: 48,
        time_frame: 360,
        timestamp: '2020-12-01T16:18:00Z',
      },
      {
        point: 49,
        time_frame: 360,
        timestamp: '2020-12-01T16:12:00Z',
      },
      {
        point: 50,
        time_frame: 360,
        timestamp: '2020-12-01T16:06:00Z',
      },
      {
        point: 51,
        time_frame: 360,
        timestamp: '2020-12-01T16:00:00Z',
      },
      {
        point: 52,
        time_frame: 360,
        timestamp: '2020-12-01T15:54:00Z',
        num_queries_per_sec: 0.044444446,
      },
      {
        point: 53,
        time_frame: 360,
        timestamp: '2020-12-01T15:48:00Z',
      },
      {
        point: 54,
        time_frame: 360,
        timestamp: '2020-12-01T15:42:00Z',
      },
      {
        point: 55,
        time_frame: 360,
        timestamp: '2020-12-01T15:36:00Z',
        num_queries_per_sec: 0.083333336,
      },
      {
        point: 56,
        time_frame: 360,
        timestamp: '2020-12-01T15:30:00Z',
      },
      {
        point: 57,
        time_frame: 360,
        timestamp: '2020-12-01T15:24:00Z',
      },
      {
        point: 58,
        time_frame: 360,
        timestamp: '2020-12-01T15:18:00Z',
      },
      {
        point: 59,
        time_frame: 360,
        timestamp: '2020-12-01T15:12:00Z',
      },
      {
        point: 60,
        time_frame: 360,
        timestamp: '2020-12-01T15:06:00Z',
      },
      {
        point: 61,
        time_frame: 360,
        timestamp: '2020-12-01T15:00:00Z',
      },
      {
        point: 62,
        time_frame: 360,
        timestamp: '2020-12-01T14:54:00Z',
      },
      {
        point: 63,
        time_frame: 360,
        timestamp: '2020-12-01T14:48:00Z',
      },
      {
        point: 64,
        time_frame: 360,
        timestamp: '2020-12-01T14:42:00Z',
      },
      {
        point: 65,
        time_frame: 360,
        timestamp: '2020-12-01T14:36:00Z',
      },
      {
        point: 66,
        time_frame: 360,
        timestamp: '2020-12-01T14:30:00Z',
      },
      {
        point: 67,
        time_frame: 360,
        timestamp: '2020-12-01T14:24:00Z',
      },
      {
        point: 68,
        time_frame: 360,
        timestamp: '2020-12-01T14:18:00Z',
      },
      {
        point: 69,
        time_frame: 360,
        timestamp: '2020-12-01T14:12:00Z',
      },
      {
        point: 70,
        time_frame: 360,
        timestamp: '2020-12-01T14:06:00Z',
      },
      {
        point: 71,
        time_frame: 360,
        timestamp: '2020-12-01T14:00:00Z',
      },
      {
        point: 72,
        time_frame: 360,
        timestamp: '2020-12-01T13:54:00Z',
      },
      {
        point: 73,
        time_frame: 360,
        timestamp: '2020-12-01T13:48:00Z',
      },
      {
        point: 74,
        time_frame: 360,
        timestamp: '2020-12-01T13:42:00Z',
      },
      {
        point: 75,
        time_frame: 360,
        timestamp: '2020-12-01T13:36:00Z',
      },
      {
        point: 76,
        time_frame: 360,
        timestamp: '2020-12-01T13:30:00Z',
      },
      {
        point: 77,
        time_frame: 360,
        timestamp: '2020-12-01T13:24:00Z',
      },
      {
        point: 78,
        time_frame: 360,
        timestamp: '2020-12-01T13:18:00Z',
      },
      {
        point: 79,
        time_frame: 360,
        timestamp: '2020-12-01T13:12:00Z',
      },
      {
        point: 80,
        time_frame: 360,
        timestamp: '2020-12-01T13:06:00Z',
      },
      {
        point: 81,
        time_frame: 360,
        timestamp: '2020-12-01T13:00:00Z',
      },
      {
        point: 82,
        time_frame: 360,
        timestamp: '2020-12-01T12:54:00Z',
      },
      {
        point: 83,
        time_frame: 360,
        timestamp: '2020-12-01T12:48:00Z',
      },
      {
        point: 84,
        time_frame: 360,
        timestamp: '2020-12-01T12:42:00Z',
      },
      {
        point: 85,
        time_frame: 360,
        timestamp: '2020-12-01T12:36:00Z',
      },
      {
        point: 86,
        time_frame: 360,
        timestamp: '2020-12-01T12:30:00Z',
      },
      {
        point: 87,
        time_frame: 360,
        timestamp: '2020-12-01T12:24:00Z',
      },
      {
        point: 88,
        time_frame: 360,
        timestamp: '2020-12-01T12:18:00Z',
      },
      {
        point: 89,
        time_frame: 360,
        timestamp: '2020-12-01T12:12:00Z',
      },
      {
        point: 90,
        time_frame: 360,
        timestamp: '2020-12-01T12:06:00Z',
      },
      {
        point: 91,
        time_frame: 360,
        timestamp: '2020-12-01T12:00:00Z',
      },
      {
        point: 92,
        time_frame: 360,
        timestamp: '2020-12-01T11:54:00Z',
      },
      {
        point: 93,
        time_frame: 360,
        timestamp: '2020-12-01T11:48:00Z',
      },
      {
        point: 94,
        time_frame: 360,
        timestamp: '2020-12-01T11:42:00Z',
      },
      {
        point: 95,
        time_frame: 360,
        timestamp: '2020-12-01T11:36:00Z',
      },
      {
        point: 96,
        time_frame: 360,
        timestamp: '2020-12-01T11:30:00Z',
      },
      {
        point: 97,
        time_frame: 360,
        timestamp: '2020-12-01T11:24:00Z',
      },
      {
        point: 98,
        time_frame: 360,
        timestamp: '2020-12-01T11:18:00Z',
      },
      {
        point: 99,
        time_frame: 360,
        timestamp: '2020-12-01T11:12:00Z',
      },
      {
        point: 100,
        time_frame: 360,
        timestamp: '2020-12-01T11:06:00Z',
      },
      {
        point: 101,
        time_frame: 360,
        timestamp: '2020-12-01T11:00:00Z',
      },
      {
        point: 102,
        time_frame: 360,
        timestamp: '2020-12-01T10:54:00Z',
      },
      {
        point: 103,
        time_frame: 360,
        timestamp: '2020-12-01T10:48:00Z',
      },
      {
        point: 104,
        time_frame: 360,
        timestamp: '2020-12-01T10:42:00Z',
      },
      {
        point: 105,
        time_frame: 360,
        timestamp: '2020-12-01T10:36:00Z',
      },
      {
        point: 106,
        time_frame: 360,
        timestamp: '2020-12-01T10:30:00Z',
      },
      {
        point: 107,
        time_frame: 360,
        timestamp: '2020-12-01T10:24:00Z',
      },
      {
        point: 108,
        time_frame: 360,
        timestamp: '2020-12-01T10:18:00Z',
      },
      {
        point: 109,
        time_frame: 360,
        timestamp: '2020-12-01T10:12:00Z',
      },
      {
        point: 110,
        time_frame: 360,
        timestamp: '2020-12-01T10:06:00Z',
      },
      {
        point: 111,
        time_frame: 360,
        timestamp: '2020-12-01T10:00:00Z',
      },
      {
        point: 112,
        time_frame: 360,
        timestamp: '2020-12-01T09:54:00Z',
      },
      {
        point: 113,
        time_frame: 360,
        timestamp: '2020-12-01T09:48:00Z',
      },
      {
        point: 114,
        time_frame: 360,
        timestamp: '2020-12-01T09:42:00Z',
      },
      {
        point: 115,
        time_frame: 360,
        timestamp: '2020-12-01T09:36:00Z',
      },
      {
        point: 116,
        time_frame: 360,
        timestamp: '2020-12-01T09:30:00Z',
      },
      {
        point: 117,
        time_frame: 360,
        timestamp: '2020-12-01T09:24:00Z',
      },
      {
        point: 118,
        time_frame: 360,
        timestamp: '2020-12-01T09:18:00Z',
      },
      {
        point: 119,
        time_frame: 360,
        timestamp: '2020-12-01T09:12:00Z',
      },
    ],
    metric: {
      rate: 0.035671297,
      sum: 1541,
    },
    total: {
      rate: 71.50287,
      sum: 3088924,
    },
    queryCount: 1541,
    percentOfTotal: 0.05,
    isRate: true,
    isSum: true,
    isStats: false,
    metricName: 'num_queries',
  },
  {
    name: 'Query Time',
    tooltip: 'Average statement execution time',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time',
    },
    units: 'load',
    complexMetric: '',
    sparkline: [
      {
        time_frame: 360,
        timestamp: '2020-12-01T21:06:00Z',
        m_query_time_sum_per_sec: 22.93401,
      },
      {
        point: 1,
        time_frame: 360,
        timestamp: '2020-12-01T21:00:00Z',
        m_query_time_sum_per_sec: 26.785295,
      },
      {
        point: 2,
        time_frame: 360,
        timestamp: '2020-12-01T20:54:00Z',
        m_query_time_sum_per_sec: 35.495014,
      },
      {
        point: 3,
        time_frame: 360,
        timestamp: '2020-12-01T20:48:00Z',
        m_query_time_sum_per_sec: 23.448107,
      },
      {
        point: 4,
        time_frame: 360,
        timestamp: '2020-12-01T20:42:00Z',
        m_query_time_sum_per_sec: 27.71439,
      },
      {
        point: 5,
        time_frame: 360,
        timestamp: '2020-12-01T20:36:00Z',
        m_query_time_sum_per_sec: 27.05141,
      },
      {
        point: 6,
        time_frame: 360,
        timestamp: '2020-12-01T20:30:00Z',
        m_query_time_sum_per_sec: 31.272772,
      },
      {
        point: 7,
        time_frame: 360,
        timestamp: '2020-12-01T20:24:00Z',
        m_query_time_sum_per_sec: 18.088194,
      },
      {
        point: 8,
        time_frame: 360,
        timestamp: '2020-12-01T20:18:00Z',
        m_query_time_sum_per_sec: 28.00874,
      },
      {
        point: 9,
        time_frame: 360,
        timestamp: '2020-12-01T20:12:00Z',
        m_query_time_sum_per_sec: 7.61649,
      },
      {
        point: 10,
        time_frame: 360,
        timestamp: '2020-12-01T20:06:00Z',
        m_query_time_sum_per_sec: 6.467418,
      },
      {
        point: 11,
        time_frame: 360,
        timestamp: '2020-12-01T20:00:00Z',
        m_query_time_sum_per_sec: 8.266821,
      },
      {
        point: 12,
        time_frame: 360,
        timestamp: '2020-12-01T19:54:00Z',
        m_query_time_sum_per_sec: 6.2887797,
      },
      {
        point: 13,
        time_frame: 360,
        timestamp: '2020-12-01T19:48:00Z',
        m_query_time_sum_per_sec: 8.0145235,
      },
      {
        point: 14,
        time_frame: 360,
        timestamp: '2020-12-01T19:42:00Z',
        m_query_time_sum_per_sec: 2.2700958,
      },
      {
        point: 15,
        time_frame: 360,
        timestamp: '2020-12-01T19:36:00Z',
        m_query_time_sum_per_sec: 2.9000642,
      },
      {
        point: 16,
        time_frame: 360,
        timestamp: '2020-12-01T19:30:00Z',
        m_query_time_sum_per_sec: 1.9824795,
      },
      {
        point: 17,
        time_frame: 360,
        timestamp: '2020-12-01T19:24:00Z',
        m_query_time_sum_per_sec: 2.8587415,
      },
      {
        point: 18,
        time_frame: 360,
        timestamp: '2020-12-01T19:18:00Z',
        m_query_time_sum_per_sec: 0.39235535,
      },
      {
        point: 19,
        time_frame: 360,
        timestamp: '2020-12-01T19:12:00Z',
        m_query_time_sum_per_sec: 1.7099458,
      },
      {
        point: 20,
        time_frame: 360,
        timestamp: '2020-12-01T19:06:00Z',
        m_query_time_sum_per_sec: 1.0933205,
      },
      {
        point: 21,
        time_frame: 360,
        timestamp: '2020-12-01T19:00:00Z',
        m_query_time_sum_per_sec: 0.23831552,
      },
      {
        point: 22,
        time_frame: 360,
        timestamp: '2020-12-01T18:54:00Z',
        m_query_time_sum_per_sec: 0.22749779,
      },
      {
        point: 23,
        time_frame: 360,
        timestamp: '2020-12-01T18:48:00Z',
      },
      {
        point: 24,
        time_frame: 360,
        timestamp: '2020-12-01T18:42:00Z',
      },
      {
        point: 25,
        time_frame: 360,
        timestamp: '2020-12-01T18:36:00Z',
      },
      {
        point: 26,
        time_frame: 360,
        timestamp: '2020-12-01T18:30:00Z',
      },
      {
        point: 27,
        time_frame: 360,
        timestamp: '2020-12-01T18:24:00Z',
      },
      {
        point: 28,
        time_frame: 360,
        timestamp: '2020-12-01T18:18:00Z',
      },
      {
        point: 29,
        time_frame: 360,
        timestamp: '2020-12-01T18:12:00Z',
      },
      {
        point: 30,
        time_frame: 360,
        timestamp: '2020-12-01T18:06:00Z',
      },
      {
        point: 31,
        time_frame: 360,
        timestamp: '2020-12-01T18:00:00Z',
      },
      {
        point: 32,
        time_frame: 360,
        timestamp: '2020-12-01T17:54:00Z',
      },
      {
        point: 33,
        time_frame: 360,
        timestamp: '2020-12-01T17:48:00Z',
      },
      {
        point: 34,
        time_frame: 360,
        timestamp: '2020-12-01T17:42:00Z',
      },
      {
        point: 35,
        time_frame: 360,
        timestamp: '2020-12-01T17:36:00Z',
      },
      {
        point: 36,
        time_frame: 360,
        timestamp: '2020-12-01T17:30:00Z',
      },
      {
        point: 37,
        time_frame: 360,
        timestamp: '2020-12-01T17:24:00Z',
      },
      {
        point: 38,
        time_frame: 360,
        timestamp: '2020-12-01T17:18:00Z',
      },
      {
        point: 39,
        time_frame: 360,
        timestamp: '2020-12-01T17:12:00Z',
      },
      {
        point: 40,
        time_frame: 360,
        timestamp: '2020-12-01T17:06:00Z',
      },
      {
        point: 41,
        time_frame: 360,
        timestamp: '2020-12-01T17:00:00Z',
      },
      {
        point: 42,
        time_frame: 360,
        timestamp: '2020-12-01T16:54:00Z',
      },
      {
        point: 43,
        time_frame: 360,
        timestamp: '2020-12-01T16:48:00Z',
      },
      {
        point: 44,
        time_frame: 360,
        timestamp: '2020-12-01T16:42:00Z',
      },
      {
        point: 45,
        time_frame: 360,
        timestamp: '2020-12-01T16:36:00Z',
      },
      {
        point: 46,
        time_frame: 360,
        timestamp: '2020-12-01T16:30:00Z',
      },
      {
        point: 47,
        time_frame: 360,
        timestamp: '2020-12-01T16:24:00Z',
      },
      {
        point: 48,
        time_frame: 360,
        timestamp: '2020-12-01T16:18:00Z',
      },
      {
        point: 49,
        time_frame: 360,
        timestamp: '2020-12-01T16:12:00Z',
      },
      {
        point: 50,
        time_frame: 360,
        timestamp: '2020-12-01T16:06:00Z',
      },
      {
        point: 51,
        time_frame: 360,
        timestamp: '2020-12-01T16:00:00Z',
      },
      {
        point: 52,
        time_frame: 360,
        timestamp: '2020-12-01T15:54:00Z',
        m_query_time_sum_per_sec: 0.12488647,
      },
      {
        point: 53,
        time_frame: 360,
        timestamp: '2020-12-01T15:48:00Z',
      },
      {
        point: 54,
        time_frame: 360,
        timestamp: '2020-12-01T15:42:00Z',
      },
      {
        point: 55,
        time_frame: 360,
        timestamp: '2020-12-01T15:36:00Z',
        m_query_time_sum_per_sec: 0.4795172,
      },
      {
        point: 56,
        time_frame: 360,
        timestamp: '2020-12-01T15:30:00Z',
      },
      {
        point: 57,
        time_frame: 360,
        timestamp: '2020-12-01T15:24:00Z',
      },
      {
        point: 58,
        time_frame: 360,
        timestamp: '2020-12-01T15:18:00Z',
      },
      {
        point: 59,
        time_frame: 360,
        timestamp: '2020-12-01T15:12:00Z',
      },
      {
        point: 60,
        time_frame: 360,
        timestamp: '2020-12-01T15:06:00Z',
      },
      {
        point: 61,
        time_frame: 360,
        timestamp: '2020-12-01T15:00:00Z',
      },
      {
        point: 62,
        time_frame: 360,
        timestamp: '2020-12-01T14:54:00Z',
      },
      {
        point: 63,
        time_frame: 360,
        timestamp: '2020-12-01T14:48:00Z',
      },
      {
        point: 64,
        time_frame: 360,
        timestamp: '2020-12-01T14:42:00Z',
      },
      {
        point: 65,
        time_frame: 360,
        timestamp: '2020-12-01T14:36:00Z',
      },
      {
        point: 66,
        time_frame: 360,
        timestamp: '2020-12-01T14:30:00Z',
      },
      {
        point: 67,
        time_frame: 360,
        timestamp: '2020-12-01T14:24:00Z',
      },
      {
        point: 68,
        time_frame: 360,
        timestamp: '2020-12-01T14:18:00Z',
      },
      {
        point: 69,
        time_frame: 360,
        timestamp: '2020-12-01T14:12:00Z',
      },
      {
        point: 70,
        time_frame: 360,
        timestamp: '2020-12-01T14:06:00Z',
      },
      {
        point: 71,
        time_frame: 360,
        timestamp: '2020-12-01T14:00:00Z',
      },
      {
        point: 72,
        time_frame: 360,
        timestamp: '2020-12-01T13:54:00Z',
      },
      {
        point: 73,
        time_frame: 360,
        timestamp: '2020-12-01T13:48:00Z',
      },
      {
        point: 74,
        time_frame: 360,
        timestamp: '2020-12-01T13:42:00Z',
      },
      {
        point: 75,
        time_frame: 360,
        timestamp: '2020-12-01T13:36:00Z',
      },
      {
        point: 76,
        time_frame: 360,
        timestamp: '2020-12-01T13:30:00Z',
      },
      {
        point: 77,
        time_frame: 360,
        timestamp: '2020-12-01T13:24:00Z',
      },
      {
        point: 78,
        time_frame: 360,
        timestamp: '2020-12-01T13:18:00Z',
      },
      {
        point: 79,
        time_frame: 360,
        timestamp: '2020-12-01T13:12:00Z',
      },
      {
        point: 80,
        time_frame: 360,
        timestamp: '2020-12-01T13:06:00Z',
      },
      {
        point: 81,
        time_frame: 360,
        timestamp: '2020-12-01T13:00:00Z',
      },
      {
        point: 82,
        time_frame: 360,
        timestamp: '2020-12-01T12:54:00Z',
      },
      {
        point: 83,
        time_frame: 360,
        timestamp: '2020-12-01T12:48:00Z',
      },
      {
        point: 84,
        time_frame: 360,
        timestamp: '2020-12-01T12:42:00Z',
      },
      {
        point: 85,
        time_frame: 360,
        timestamp: '2020-12-01T12:36:00Z',
      },
      {
        point: 86,
        time_frame: 360,
        timestamp: '2020-12-01T12:30:00Z',
      },
      {
        point: 87,
        time_frame: 360,
        timestamp: '2020-12-01T12:24:00Z',
      },
      {
        point: 88,
        time_frame: 360,
        timestamp: '2020-12-01T12:18:00Z',
      },
      {
        point: 89,
        time_frame: 360,
        timestamp: '2020-12-01T12:12:00Z',
      },
      {
        point: 90,
        time_frame: 360,
        timestamp: '2020-12-01T12:06:00Z',
      },
      {
        point: 91,
        time_frame: 360,
        timestamp: '2020-12-01T12:00:00Z',
      },
      {
        point: 92,
        time_frame: 360,
        timestamp: '2020-12-01T11:54:00Z',
      },
      {
        point: 93,
        time_frame: 360,
        timestamp: '2020-12-01T11:48:00Z',
      },
      {
        point: 94,
        time_frame: 360,
        timestamp: '2020-12-01T11:42:00Z',
      },
      {
        point: 95,
        time_frame: 360,
        timestamp: '2020-12-01T11:36:00Z',
      },
      {
        point: 96,
        time_frame: 360,
        timestamp: '2020-12-01T11:30:00Z',
      },
      {
        point: 97,
        time_frame: 360,
        timestamp: '2020-12-01T11:24:00Z',
      },
      {
        point: 98,
        time_frame: 360,
        timestamp: '2020-12-01T11:18:00Z',
      },
      {
        point: 99,
        time_frame: 360,
        timestamp: '2020-12-01T11:12:00Z',
      },
      {
        point: 100,
        time_frame: 360,
        timestamp: '2020-12-01T11:06:00Z',
      },
      {
        point: 101,
        time_frame: 360,
        timestamp: '2020-12-01T11:00:00Z',
      },
      {
        point: 102,
        time_frame: 360,
        timestamp: '2020-12-01T10:54:00Z',
      },
      {
        point: 103,
        time_frame: 360,
        timestamp: '2020-12-01T10:48:00Z',
      },
      {
        point: 104,
        time_frame: 360,
        timestamp: '2020-12-01T10:42:00Z',
      },
      {
        point: 105,
        time_frame: 360,
        timestamp: '2020-12-01T10:36:00Z',
      },
      {
        point: 106,
        time_frame: 360,
        timestamp: '2020-12-01T10:30:00Z',
      },
      {
        point: 107,
        time_frame: 360,
        timestamp: '2020-12-01T10:24:00Z',
      },
      {
        point: 108,
        time_frame: 360,
        timestamp: '2020-12-01T10:18:00Z',
      },
      {
        point: 109,
        time_frame: 360,
        timestamp: '2020-12-01T10:12:00Z',
      },
      {
        point: 110,
        time_frame: 360,
        timestamp: '2020-12-01T10:06:00Z',
      },
      {
        point: 111,
        time_frame: 360,
        timestamp: '2020-12-01T10:00:00Z',
      },
      {
        point: 112,
        time_frame: 360,
        timestamp: '2020-12-01T09:54:00Z',
      },
      {
        point: 113,
        time_frame: 360,
        timestamp: '2020-12-01T09:48:00Z',
      },
      {
        point: 114,
        time_frame: 360,
        timestamp: '2020-12-01T09:42:00Z',
      },
      {
        point: 115,
        time_frame: 360,
        timestamp: '2020-12-01T09:36:00Z',
      },
      {
        point: 116,
        time_frame: 360,
        timestamp: '2020-12-01T09:30:00Z',
      },
      {
        point: 117,
        time_frame: 360,
        timestamp: '2020-12-01T09:24:00Z',
      },
      {
        point: 118,
        time_frame: 360,
        timestamp: '2020-12-01T09:18:00Z',
      },
      {
        point: 119,
        time_frame: 360,
        timestamp: '2020-12-01T09:12:00Z',
      },
    ],
    metric: {
      rate: 2.4310765,
      cnt: 1541,
      sum: 105022.51,
      avg: 68.152176,
    },
    total: {
      rate: 97784820000,
      cnt: 3088924,
      sum: 4224304300000000,
      max: 18446744000000,
      avg: 1367565000,
      p99: 57384813000,
    },
    queryCount: 1541,
    percentOfTotal: 0,
    isRate: true,
    isSum: true,
    isStats: true,
    metricName: 'query_time',
  },
  {
    name: 'Lock Time',
    tooltip: 'Time to acquire locks',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time',
    },
    units: '(avg load)',
    complexMetric: '1.74% of query time',
    sparkline: [
      {
        time_frame: 360,
        timestamp: '2020-12-01T21:06:00Z',
        m_lock_time_sum_per_sec: 0.11630707,
      },
      {
        point: 1,
        time_frame: 360,
        timestamp: '2020-12-01T21:00:00Z',
        m_lock_time_sum_per_sec: 0.22458641,
      },
      {
        point: 2,
        time_frame: 360,
        timestamp: '2020-12-01T20:54:00Z',
        m_lock_time_sum_per_sec: 0.18395486,
      },
      {
        point: 3,
        time_frame: 360,
        timestamp: '2020-12-01T20:48:00Z',
        m_lock_time_sum_per_sec: 0.14781922,
      },
      {
        point: 4,
        time_frame: 360,
        timestamp: '2020-12-01T20:42:00Z',
        m_lock_time_sum_per_sec: 0.2386286,
      },
      {
        point: 5,
        time_frame: 360,
        timestamp: '2020-12-01T20:36:00Z',
        m_lock_time_sum_per_sec: 0.2878162,
      },
      {
        point: 6,
        time_frame: 360,
        timestamp: '2020-12-01T20:30:00Z',
        m_lock_time_sum_per_sec: 0.6190438,
      },
      {
        point: 7,
        time_frame: 360,
        timestamp: '2020-12-01T20:24:00Z',
        m_lock_time_sum_per_sec: 0.2941819,
      },
      {
        point: 8,
        time_frame: 360,
        timestamp: '2020-12-01T20:18:00Z',
        m_lock_time_sum_per_sec: 0.8056046,
      },
      {
        point: 9,
        time_frame: 360,
        timestamp: '2020-12-01T20:12:00Z',
        m_lock_time_sum_per_sec: 0.18922187,
      },
      {
        point: 10,
        time_frame: 360,
        timestamp: '2020-12-01T20:06:00Z',
        m_lock_time_sum_per_sec: 0.15408637,
      },
      {
        point: 11,
        time_frame: 360,
        timestamp: '2020-12-01T20:00:00Z',
        m_lock_time_sum_per_sec: 0.1535296,
      },
      {
        point: 12,
        time_frame: 360,
        timestamp: '2020-12-01T19:54:00Z',
        m_lock_time_sum_per_sec: 0.47179207,
      },
      {
        point: 13,
        time_frame: 360,
        timestamp: '2020-12-01T19:48:00Z',
        m_lock_time_sum_per_sec: 0.58517873,
      },
      {
        point: 14,
        time_frame: 360,
        timestamp: '2020-12-01T19:42:00Z',
        m_lock_time_sum_per_sec: 0.11117123,
      },
      {
        point: 15,
        time_frame: 360,
        timestamp: '2020-12-01T19:36:00Z',
        m_lock_time_sum_per_sec: 0.106723286,
      },
      {
        point: 16,
        time_frame: 360,
        timestamp: '2020-12-01T19:30:00Z',
        m_lock_time_sum_per_sec: 0.07080549,
      },
      {
        point: 17,
        time_frame: 360,
        timestamp: '2020-12-01T19:24:00Z',
        m_lock_time_sum_per_sec: 0.09002479,
      },
      {
        point: 18,
        time_frame: 360,
        timestamp: '2020-12-01T19:18:00Z',
        m_lock_time_sum_per_sec: 0.0051436364,
      },
      {
        point: 19,
        time_frame: 360,
        timestamp: '2020-12-01T19:12:00Z',
        m_lock_time_sum_per_sec: 0.008785509,
      },
      {
        point: 20,
        time_frame: 360,
        timestamp: '2020-12-01T19:06:00Z',
        m_lock_time_sum_per_sec: 0.07051719,
      },
      {
        point: 21,
        time_frame: 360,
        timestamp: '2020-12-01T19:00:00Z',
        m_lock_time_sum_per_sec: 0.035449702,
      },
      {
        point: 22,
        time_frame: 360,
        timestamp: '2020-12-01T18:54:00Z',
        m_lock_time_sum_per_sec: 0.033901844,
      },
      {
        point: 23,
        time_frame: 360,
        timestamp: '2020-12-01T18:48:00Z',
      },
      {
        point: 24,
        time_frame: 360,
        timestamp: '2020-12-01T18:42:00Z',
      },
      {
        point: 25,
        time_frame: 360,
        timestamp: '2020-12-01T18:36:00Z',
      },
      {
        point: 26,
        time_frame: 360,
        timestamp: '2020-12-01T18:30:00Z',
      },
      {
        point: 27,
        time_frame: 360,
        timestamp: '2020-12-01T18:24:00Z',
      },
      {
        point: 28,
        time_frame: 360,
        timestamp: '2020-12-01T18:18:00Z',
      },
      {
        point: 29,
        time_frame: 360,
        timestamp: '2020-12-01T18:12:00Z',
      },
      {
        point: 30,
        time_frame: 360,
        timestamp: '2020-12-01T18:06:00Z',
      },
      {
        point: 31,
        time_frame: 360,
        timestamp: '2020-12-01T18:00:00Z',
      },
      {
        point: 32,
        time_frame: 360,
        timestamp: '2020-12-01T17:54:00Z',
      },
      {
        point: 33,
        time_frame: 360,
        timestamp: '2020-12-01T17:48:00Z',
      },
      {
        point: 34,
        time_frame: 360,
        timestamp: '2020-12-01T17:42:00Z',
      },
      {
        point: 35,
        time_frame: 360,
        timestamp: '2020-12-01T17:36:00Z',
      },
      {
        point: 36,
        time_frame: 360,
        timestamp: '2020-12-01T17:30:00Z',
      },
      {
        point: 37,
        time_frame: 360,
        timestamp: '2020-12-01T17:24:00Z',
      },
      {
        point: 38,
        time_frame: 360,
        timestamp: '2020-12-01T17:18:00Z',
      },
      {
        point: 39,
        time_frame: 360,
        timestamp: '2020-12-01T17:12:00Z',
      },
      {
        point: 40,
        time_frame: 360,
        timestamp: '2020-12-01T17:06:00Z',
      },
      {
        point: 41,
        time_frame: 360,
        timestamp: '2020-12-01T17:00:00Z',
      },
      {
        point: 42,
        time_frame: 360,
        timestamp: '2020-12-01T16:54:00Z',
      },
      {
        point: 43,
        time_frame: 360,
        timestamp: '2020-12-01T16:48:00Z',
      },
      {
        point: 44,
        time_frame: 360,
        timestamp: '2020-12-01T16:42:00Z',
      },
      {
        point: 45,
        time_frame: 360,
        timestamp: '2020-12-01T16:36:00Z',
      },
      {
        point: 46,
        time_frame: 360,
        timestamp: '2020-12-01T16:30:00Z',
      },
      {
        point: 47,
        time_frame: 360,
        timestamp: '2020-12-01T16:24:00Z',
      },
      {
        point: 48,
        time_frame: 360,
        timestamp: '2020-12-01T16:18:00Z',
      },
      {
        point: 49,
        time_frame: 360,
        timestamp: '2020-12-01T16:12:00Z',
      },
      {
        point: 50,
        time_frame: 360,
        timestamp: '2020-12-01T16:06:00Z',
      },
      {
        point: 51,
        time_frame: 360,
        timestamp: '2020-12-01T16:00:00Z',
      },
      {
        point: 52,
        time_frame: 360,
        timestamp: '2020-12-01T15:54:00Z',
        m_lock_time_sum_per_sec: 0.019303124,
      },
      {
        point: 53,
        time_frame: 360,
        timestamp: '2020-12-01T15:48:00Z',
      },
      {
        point: 54,
        time_frame: 360,
        timestamp: '2020-12-01T15:42:00Z',
      },
      {
        point: 55,
        time_frame: 360,
        timestamp: '2020-12-01T15:36:00Z',
        m_lock_time_sum_per_sec: 0.06553409,
      },
      {
        point: 56,
        time_frame: 360,
        timestamp: '2020-12-01T15:30:00Z',
      },
      {
        point: 57,
        time_frame: 360,
        timestamp: '2020-12-01T15:24:00Z',
      },
      {
        point: 58,
        time_frame: 360,
        timestamp: '2020-12-01T15:18:00Z',
      },
      {
        point: 59,
        time_frame: 360,
        timestamp: '2020-12-01T15:12:00Z',
      },
      {
        point: 60,
        time_frame: 360,
        timestamp: '2020-12-01T15:06:00Z',
      },
      {
        point: 61,
        time_frame: 360,
        timestamp: '2020-12-01T15:00:00Z',
      },
      {
        point: 62,
        time_frame: 360,
        timestamp: '2020-12-01T14:54:00Z',
      },
      {
        point: 63,
        time_frame: 360,
        timestamp: '2020-12-01T14:48:00Z',
      },
      {
        point: 64,
        time_frame: 360,
        timestamp: '2020-12-01T14:42:00Z',
      },
      {
        point: 65,
        time_frame: 360,
        timestamp: '2020-12-01T14:36:00Z',
      },
      {
        point: 66,
        time_frame: 360,
        timestamp: '2020-12-01T14:30:00Z',
      },
      {
        point: 67,
        time_frame: 360,
        timestamp: '2020-12-01T14:24:00Z',
      },
      {
        point: 68,
        time_frame: 360,
        timestamp: '2020-12-01T14:18:00Z',
      },
      {
        point: 69,
        time_frame: 360,
        timestamp: '2020-12-01T14:12:00Z',
      },
      {
        point: 70,
        time_frame: 360,
        timestamp: '2020-12-01T14:06:00Z',
      },
      {
        point: 71,
        time_frame: 360,
        timestamp: '2020-12-01T14:00:00Z',
      },
      {
        point: 72,
        time_frame: 360,
        timestamp: '2020-12-01T13:54:00Z',
      },
      {
        point: 73,
        time_frame: 360,
        timestamp: '2020-12-01T13:48:00Z',
      },
      {
        point: 74,
        time_frame: 360,
        timestamp: '2020-12-01T13:42:00Z',
      },
      {
        point: 75,
        time_frame: 360,
        timestamp: '2020-12-01T13:36:00Z',
      },
      {
        point: 76,
        time_frame: 360,
        timestamp: '2020-12-01T13:30:00Z',
      },
      {
        point: 77,
        time_frame: 360,
        timestamp: '2020-12-01T13:24:00Z',
      },
      {
        point: 78,
        time_frame: 360,
        timestamp: '2020-12-01T13:18:00Z',
      },
      {
        point: 79,
        time_frame: 360,
        timestamp: '2020-12-01T13:12:00Z',
      },
      {
        point: 80,
        time_frame: 360,
        timestamp: '2020-12-01T13:06:00Z',
      },
      {
        point: 81,
        time_frame: 360,
        timestamp: '2020-12-01T13:00:00Z',
      },
      {
        point: 82,
        time_frame: 360,
        timestamp: '2020-12-01T12:54:00Z',
      },
      {
        point: 83,
        time_frame: 360,
        timestamp: '2020-12-01T12:48:00Z',
      },
      {
        point: 84,
        time_frame: 360,
        timestamp: '2020-12-01T12:42:00Z',
      },
      {
        point: 85,
        time_frame: 360,
        timestamp: '2020-12-01T12:36:00Z',
      },
      {
        point: 86,
        time_frame: 360,
        timestamp: '2020-12-01T12:30:00Z',
      },
      {
        point: 87,
        time_frame: 360,
        timestamp: '2020-12-01T12:24:00Z',
      },
      {
        point: 88,
        time_frame: 360,
        timestamp: '2020-12-01T12:18:00Z',
      },
      {
        point: 89,
        time_frame: 360,
        timestamp: '2020-12-01T12:12:00Z',
      },
      {
        point: 90,
        time_frame: 360,
        timestamp: '2020-12-01T12:06:00Z',
      },
      {
        point: 91,
        time_frame: 360,
        timestamp: '2020-12-01T12:00:00Z',
      },
      {
        point: 92,
        time_frame: 360,
        timestamp: '2020-12-01T11:54:00Z',
      },
      {
        point: 93,
        time_frame: 360,
        timestamp: '2020-12-01T11:48:00Z',
      },
      {
        point: 94,
        time_frame: 360,
        timestamp: '2020-12-01T11:42:00Z',
      },
      {
        point: 95,
        time_frame: 360,
        timestamp: '2020-12-01T11:36:00Z',
      },
      {
        point: 96,
        time_frame: 360,
        timestamp: '2020-12-01T11:30:00Z',
      },
      {
        point: 97,
        time_frame: 360,
        timestamp: '2020-12-01T11:24:00Z',
      },
      {
        point: 98,
        time_frame: 360,
        timestamp: '2020-12-01T11:18:00Z',
      },
      {
        point: 99,
        time_frame: 360,
        timestamp: '2020-12-01T11:12:00Z',
      },
      {
        point: 100,
        time_frame: 360,
        timestamp: '2020-12-01T11:06:00Z',
      },
      {
        point: 101,
        time_frame: 360,
        timestamp: '2020-12-01T11:00:00Z',
      },
      {
        point: 102,
        time_frame: 360,
        timestamp: '2020-12-01T10:54:00Z',
      },
      {
        point: 103,
        time_frame: 360,
        timestamp: '2020-12-01T10:48:00Z',
      },
      {
        point: 104,
        time_frame: 360,
        timestamp: '2020-12-01T10:42:00Z',
      },
      {
        point: 105,
        time_frame: 360,
        timestamp: '2020-12-01T10:36:00Z',
      },
      {
        point: 106,
        time_frame: 360,
        timestamp: '2020-12-01T10:30:00Z',
      },
      {
        point: 107,
        time_frame: 360,
        timestamp: '2020-12-01T10:24:00Z',
      },
      {
        point: 108,
        time_frame: 360,
        timestamp: '2020-12-01T10:18:00Z',
      },
      {
        point: 109,
        time_frame: 360,
        timestamp: '2020-12-01T10:12:00Z',
      },
      {
        point: 110,
        time_frame: 360,
        timestamp: '2020-12-01T10:06:00Z',
      },
      {
        point: 111,
        time_frame: 360,
        timestamp: '2020-12-01T10:00:00Z',
      },
      {
        point: 112,
        time_frame: 360,
        timestamp: '2020-12-01T09:54:00Z',
      },
      {
        point: 113,
        time_frame: 360,
        timestamp: '2020-12-01T09:48:00Z',
      },
      {
        point: 114,
        time_frame: 360,
        timestamp: '2020-12-01T09:42:00Z',
      },
      {
        point: 115,
        time_frame: 360,
        timestamp: '2020-12-01T09:36:00Z',
      },
      {
        point: 116,
        time_frame: 360,
        timestamp: '2020-12-01T09:30:00Z',
      },
      {
        point: 117,
        time_frame: 360,
        timestamp: '2020-12-01T09:24:00Z',
      },
      {
        point: 118,
        time_frame: 360,
        timestamp: '2020-12-01T09:18:00Z',
      },
      {
        point: 119,
        time_frame: 360,
        timestamp: '2020-12-01T09:12:00Z',
      },
    ],
    metric: {
      rate: 0.04240926,
      cnt: 1541,
      sum: 1832.0801,
      avg: 1.1888903,
    },
    total: {
      rate: 1.1587404,
      cnt: 2956513,
      sum: 50057.586,
      max: 3306.9795,
      avg: 0.016205508,
      p99: 0.13859351,
    },
    queryCount: 1541,
    percentOfTotal: 3.66,
    isRate: true,
    isSum: true,
    isStats: true,
    metricName: 'lock_time',
  },
  {
    name: 'Rows Affected',
    tooltip: 'Number of rows changed by UPDATE, DELETE, or INSERT',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
    units: '(per sec)',
    complexMetric: '',
    sparkline: [
      {
        time_frame: 360,
        timestamp: '2020-12-01T21:06:00Z',
        m_rows_affected_sum_per_sec: 756.0195,
      },
      {
        point: 1,
        time_frame: 360,
        timestamp: '2020-12-01T21:00:00Z',
        m_rows_affected_sum_per_sec: 1350.3306,
      },
      {
        point: 2,
        time_frame: 360,
        timestamp: '2020-12-01T20:54:00Z',
        m_rows_affected_sum_per_sec: 868.44446,
      },
      {
        point: 3,
        time_frame: 360,
        timestamp: '2020-12-01T20:48:00Z',
        m_rows_affected_sum_per_sec: 831.9167,
      },
      {
        point: 4,
        time_frame: 360,
        timestamp: '2020-12-01T20:42:00Z',
        m_rows_affected_sum_per_sec: 1466.525,
      },
      {
        point: 5,
        time_frame: 360,
        timestamp: '2020-12-01T20:36:00Z',
        m_rows_affected_sum_per_sec: 1939.586,
      },
      {
        point: 6,
        time_frame: 360,
        timestamp: '2020-12-01T20:30:00Z',
        m_rows_affected_sum_per_sec: 3914.3916,
      },
      {
        point: 7,
        time_frame: 360,
        timestamp: '2020-12-01T20:24:00Z',
        m_rows_affected_sum_per_sec: 1458.6973,
      },
      {
        point: 8,
        time_frame: 360,
        timestamp: '2020-12-01T20:18:00Z',
        m_rows_affected_sum_per_sec: 4821.683,
      },
      {
        point: 9,
        time_frame: 360,
        timestamp: '2020-12-01T20:12:00Z',
        m_rows_affected_sum_per_sec: 886.81946,
      },
      {
        point: 10,
        time_frame: 360,
        timestamp: '2020-12-01T20:06:00Z',
        m_rows_affected_sum_per_sec: 565.91113,
      },
      {
        point: 11,
        time_frame: 360,
        timestamp: '2020-12-01T20:00:00Z',
        m_rows_affected_sum_per_sec: 567.3,
      },
      {
        point: 12,
        time_frame: 360,
        timestamp: '2020-12-01T19:54:00Z',
        m_rows_affected_sum_per_sec: 1946.2389,
      },
      {
        point: 13,
        time_frame: 360,
        timestamp: '2020-12-01T19:48:00Z',
        m_rows_affected_sum_per_sec: 2550.1833,
      },
      {
        point: 14,
        time_frame: 360,
        timestamp: '2020-12-01T19:42:00Z',
        m_rows_affected_sum_per_sec: 433.06946,
      },
      {
        point: 15,
        time_frame: 360,
        timestamp: '2020-12-01T19:36:00Z',
        m_rows_affected_sum_per_sec: 472.2,
      },
      {
        point: 16,
        time_frame: 360,
        timestamp: '2020-12-01T19:30:00Z',
        m_rows_affected_sum_per_sec: 792.3778,
      },
      {
        point: 17,
        time_frame: 360,
        timestamp: '2020-12-01T19:24:00Z',
        m_rows_affected_sum_per_sec: 1228.9333,
      },
      {
        point: 18,
        time_frame: 360,
        timestamp: '2020-12-01T19:18:00Z',
        m_rows_affected_sum_per_sec: 18.891666,
      },
      {
        point: 19,
        time_frame: 360,
        timestamp: '2020-12-01T19:12:00Z',
        m_rows_affected_sum_per_sec: 93.82222,
      },
      {
        point: 20,
        time_frame: 360,
        timestamp: '2020-12-01T19:06:00Z',
        m_rows_affected_sum_per_sec: 717.91113,
      },
      {
        point: 21,
        time_frame: 360,
        timestamp: '2020-12-01T19:00:00Z',
        m_rows_affected_sum_per_sec: 321.23056,
      },
      {
        point: 22,
        time_frame: 360,
        timestamp: '2020-12-01T18:54:00Z',
        m_rows_affected_sum_per_sec: 301.45557,
      },
      {
        point: 23,
        time_frame: 360,
        timestamp: '2020-12-01T18:48:00Z',
      },
      {
        point: 24,
        time_frame: 360,
        timestamp: '2020-12-01T18:42:00Z',
      },
      {
        point: 25,
        time_frame: 360,
        timestamp: '2020-12-01T18:36:00Z',
      },
      {
        point: 26,
        time_frame: 360,
        timestamp: '2020-12-01T18:30:00Z',
      },
      {
        point: 27,
        time_frame: 360,
        timestamp: '2020-12-01T18:24:00Z',
      },
      {
        point: 28,
        time_frame: 360,
        timestamp: '2020-12-01T18:18:00Z',
      },
      {
        point: 29,
        time_frame: 360,
        timestamp: '2020-12-01T18:12:00Z',
      },
      {
        point: 30,
        time_frame: 360,
        timestamp: '2020-12-01T18:06:00Z',
      },
      {
        point: 31,
        time_frame: 360,
        timestamp: '2020-12-01T18:00:00Z',
      },
      {
        point: 32,
        time_frame: 360,
        timestamp: '2020-12-01T17:54:00Z',
      },
      {
        point: 33,
        time_frame: 360,
        timestamp: '2020-12-01T17:48:00Z',
      },
      {
        point: 34,
        time_frame: 360,
        timestamp: '2020-12-01T17:42:00Z',
      },
      {
        point: 35,
        time_frame: 360,
        timestamp: '2020-12-01T17:36:00Z',
      },
      {
        point: 36,
        time_frame: 360,
        timestamp: '2020-12-01T17:30:00Z',
      },
      {
        point: 37,
        time_frame: 360,
        timestamp: '2020-12-01T17:24:00Z',
      },
      {
        point: 38,
        time_frame: 360,
        timestamp: '2020-12-01T17:18:00Z',
      },
      {
        point: 39,
        time_frame: 360,
        timestamp: '2020-12-01T17:12:00Z',
      },
      {
        point: 40,
        time_frame: 360,
        timestamp: '2020-12-01T17:06:00Z',
      },
      {
        point: 41,
        time_frame: 360,
        timestamp: '2020-12-01T17:00:00Z',
      },
      {
        point: 42,
        time_frame: 360,
        timestamp: '2020-12-01T16:54:00Z',
      },
      {
        point: 43,
        time_frame: 360,
        timestamp: '2020-12-01T16:48:00Z',
      },
      {
        point: 44,
        time_frame: 360,
        timestamp: '2020-12-01T16:42:00Z',
      },
      {
        point: 45,
        time_frame: 360,
        timestamp: '2020-12-01T16:36:00Z',
      },
      {
        point: 46,
        time_frame: 360,
        timestamp: '2020-12-01T16:30:00Z',
      },
      {
        point: 47,
        time_frame: 360,
        timestamp: '2020-12-01T16:24:00Z',
      },
      {
        point: 48,
        time_frame: 360,
        timestamp: '2020-12-01T16:18:00Z',
      },
      {
        point: 49,
        time_frame: 360,
        timestamp: '2020-12-01T16:12:00Z',
      },
      {
        point: 50,
        time_frame: 360,
        timestamp: '2020-12-01T16:06:00Z',
      },
      {
        point: 51,
        time_frame: 360,
        timestamp: '2020-12-01T16:00:00Z',
      },
      {
        point: 52,
        time_frame: 360,
        timestamp: '2020-12-01T15:54:00Z',
        m_rows_affected_sum_per_sec: 302.575,
      },
      {
        point: 53,
        time_frame: 360,
        timestamp: '2020-12-01T15:48:00Z',
      },
      {
        point: 54,
        time_frame: 360,
        timestamp: '2020-12-01T15:42:00Z',
      },
      {
        point: 55,
        time_frame: 360,
        timestamp: '2020-12-01T15:36:00Z',
        m_rows_affected_sum_per_sec: 580.94446,
      },
      {
        point: 56,
        time_frame: 360,
        timestamp: '2020-12-01T15:30:00Z',
      },
      {
        point: 57,
        time_frame: 360,
        timestamp: '2020-12-01T15:24:00Z',
      },
      {
        point: 58,
        time_frame: 360,
        timestamp: '2020-12-01T15:18:00Z',
      },
      {
        point: 59,
        time_frame: 360,
        timestamp: '2020-12-01T15:12:00Z',
      },
      {
        point: 60,
        time_frame: 360,
        timestamp: '2020-12-01T15:06:00Z',
      },
      {
        point: 61,
        time_frame: 360,
        timestamp: '2020-12-01T15:00:00Z',
      },
      {
        point: 62,
        time_frame: 360,
        timestamp: '2020-12-01T14:54:00Z',
      },
      {
        point: 63,
        time_frame: 360,
        timestamp: '2020-12-01T14:48:00Z',
      },
      {
        point: 64,
        time_frame: 360,
        timestamp: '2020-12-01T14:42:00Z',
      },
      {
        point: 65,
        time_frame: 360,
        timestamp: '2020-12-01T14:36:00Z',
      },
      {
        point: 66,
        time_frame: 360,
        timestamp: '2020-12-01T14:30:00Z',
      },
      {
        point: 67,
        time_frame: 360,
        timestamp: '2020-12-01T14:24:00Z',
      },
      {
        point: 68,
        time_frame: 360,
        timestamp: '2020-12-01T14:18:00Z',
      },
      {
        point: 69,
        time_frame: 360,
        timestamp: '2020-12-01T14:12:00Z',
      },
      {
        point: 70,
        time_frame: 360,
        timestamp: '2020-12-01T14:06:00Z',
      },
      {
        point: 71,
        time_frame: 360,
        timestamp: '2020-12-01T14:00:00Z',
      },
      {
        point: 72,
        time_frame: 360,
        timestamp: '2020-12-01T13:54:00Z',
      },
      {
        point: 73,
        time_frame: 360,
        timestamp: '2020-12-01T13:48:00Z',
      },
      {
        point: 74,
        time_frame: 360,
        timestamp: '2020-12-01T13:42:00Z',
      },
      {
        point: 75,
        time_frame: 360,
        timestamp: '2020-12-01T13:36:00Z',
      },
      {
        point: 76,
        time_frame: 360,
        timestamp: '2020-12-01T13:30:00Z',
      },
      {
        point: 77,
        time_frame: 360,
        timestamp: '2020-12-01T13:24:00Z',
      },
      {
        point: 78,
        time_frame: 360,
        timestamp: '2020-12-01T13:18:00Z',
      },
      {
        point: 79,
        time_frame: 360,
        timestamp: '2020-12-01T13:12:00Z',
      },
      {
        point: 80,
        time_frame: 360,
        timestamp: '2020-12-01T13:06:00Z',
      },
      {
        point: 81,
        time_frame: 360,
        timestamp: '2020-12-01T13:00:00Z',
      },
      {
        point: 82,
        time_frame: 360,
        timestamp: '2020-12-01T12:54:00Z',
      },
      {
        point: 83,
        time_frame: 360,
        timestamp: '2020-12-01T12:48:00Z',
      },
      {
        point: 84,
        time_frame: 360,
        timestamp: '2020-12-01T12:42:00Z',
      },
      {
        point: 85,
        time_frame: 360,
        timestamp: '2020-12-01T12:36:00Z',
      },
      {
        point: 86,
        time_frame: 360,
        timestamp: '2020-12-01T12:30:00Z',
      },
      {
        point: 87,
        time_frame: 360,
        timestamp: '2020-12-01T12:24:00Z',
      },
      {
        point: 88,
        time_frame: 360,
        timestamp: '2020-12-01T12:18:00Z',
      },
      {
        point: 89,
        time_frame: 360,
        timestamp: '2020-12-01T12:12:00Z',
      },
      {
        point: 90,
        time_frame: 360,
        timestamp: '2020-12-01T12:06:00Z',
      },
      {
        point: 91,
        time_frame: 360,
        timestamp: '2020-12-01T12:00:00Z',
      },
      {
        point: 92,
        time_frame: 360,
        timestamp: '2020-12-01T11:54:00Z',
      },
      {
        point: 93,
        time_frame: 360,
        timestamp: '2020-12-01T11:48:00Z',
      },
      {
        point: 94,
        time_frame: 360,
        timestamp: '2020-12-01T11:42:00Z',
      },
      {
        point: 95,
        time_frame: 360,
        timestamp: '2020-12-01T11:36:00Z',
      },
      {
        point: 96,
        time_frame: 360,
        timestamp: '2020-12-01T11:30:00Z',
      },
      {
        point: 97,
        time_frame: 360,
        timestamp: '2020-12-01T11:24:00Z',
      },
      {
        point: 98,
        time_frame: 360,
        timestamp: '2020-12-01T11:18:00Z',
      },
      {
        point: 99,
        time_frame: 360,
        timestamp: '2020-12-01T11:12:00Z',
      },
      {
        point: 100,
        time_frame: 360,
        timestamp: '2020-12-01T11:06:00Z',
      },
      {
        point: 101,
        time_frame: 360,
        timestamp: '2020-12-01T11:00:00Z',
      },
      {
        point: 102,
        time_frame: 360,
        timestamp: '2020-12-01T10:54:00Z',
      },
      {
        point: 103,
        time_frame: 360,
        timestamp: '2020-12-01T10:48:00Z',
      },
      {
        point: 104,
        time_frame: 360,
        timestamp: '2020-12-01T10:42:00Z',
      },
      {
        point: 105,
        time_frame: 360,
        timestamp: '2020-12-01T10:36:00Z',
      },
      {
        point: 106,
        time_frame: 360,
        timestamp: '2020-12-01T10:30:00Z',
      },
      {
        point: 107,
        time_frame: 360,
        timestamp: '2020-12-01T10:24:00Z',
      },
      {
        point: 108,
        time_frame: 360,
        timestamp: '2020-12-01T10:18:00Z',
      },
      {
        point: 109,
        time_frame: 360,
        timestamp: '2020-12-01T10:12:00Z',
      },
      {
        point: 110,
        time_frame: 360,
        timestamp: '2020-12-01T10:06:00Z',
      },
      {
        point: 111,
        time_frame: 360,
        timestamp: '2020-12-01T10:00:00Z',
      },
      {
        point: 112,
        time_frame: 360,
        timestamp: '2020-12-01T09:54:00Z',
      },
      {
        point: 113,
        time_frame: 360,
        timestamp: '2020-12-01T09:48:00Z',
      },
      {
        point: 114,
        time_frame: 360,
        timestamp: '2020-12-01T09:42:00Z',
      },
      {
        point: 115,
        time_frame: 360,
        timestamp: '2020-12-01T09:36:00Z',
      },
      {
        point: 116,
        time_frame: 360,
        timestamp: '2020-12-01T09:30:00Z',
      },
      {
        point: 117,
        time_frame: 360,
        timestamp: '2020-12-01T09:24:00Z',
      },
      {
        point: 118,
        time_frame: 360,
        timestamp: '2020-12-01T09:18:00Z',
      },
      {
        point: 119,
        time_frame: 360,
        timestamp: '2020-12-01T09:12:00Z',
      },
    ],
    metric: {
      rate: 243.22882,
      cnt: 1541,
      sum: 10507485,
      avg: 6818.6147,
    },
    total: {
      rate: 3252.9192,
      cnt: 43001,
      sum: 140526110,
      max: 14301,
      avg: 45.49355,
      p99: 144.64499,
    },
    queryCount: 1541,
    percentOfTotal: 7.48,
    isRate: true,
    isSum: true,
    isStats: true,
    metricName: 'rows_affected',
  },
];

const textMetrics = {
  top_query: 'SELECT * from pg',
  top_queryid: '23728328',
};

describe('useFilters::', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('should render top query when database is postgres and top query exists', () => {
    const wrapper = mount(
      <Metrics
        databaseType={Databases.postgresql}
        totals={false}
        groupBy="queryid"
        metrics={metrics}
        textMetrics={textMetrics}
        loading={false}
      />,
    );

    expect(wrapper.find(dataTestId('top-query')).length).toEqual(1);
  });

  it('should not render top query when database is not postgres', () => {
    const wrapper = mount(
      <Metrics
        databaseType={Databases.mysql}
        groupBy="queryid"
        totals
        metrics={metrics}
        loading={false}
      />,
    );

    expect(wrapper.find(dataTestId('top-query')).length).toEqual(0);
  });
  it('should not render Histogram when groupBy not equal "queryId" ', async () => {
    const wrapper = mount(
      <Metrics
        databaseType={Databases.postgresql}
        groupBy="username"
        totals={false}
        metrics={metrics}
        textMetrics={textMetrics}
        loading={false}
      />,
    );

    expect(wrapper.find(dataTestId('histogram-collapse-container')).length).toEqual(0);
  });
});
