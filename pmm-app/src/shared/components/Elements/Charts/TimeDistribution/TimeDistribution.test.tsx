import { shallow } from 'enzyme';
import React from 'react';
import { getMetricDistribution, TimeDistribution } from './TimeDistribution';

const MOCK_METRICS = [
  {
    name: 'Query Count',
    tooltip: 'Count',
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
        timestamp: '2020-04-26T14:35:00Z',
        num_queries_per_sec: 0.10555556,
      },
      {
        point: 1,
        time_frame: 360,
        timestamp: '2020-04-26T14:29:00Z',
      },
      {
        point: 2,
        time_frame: 360,
        timestamp: '2020-04-26T14:23:00Z',
      },
      {
        point: 3,
        time_frame: 360,
        timestamp: '2020-04-26T14:17:00Z',
      },
      {
        point: 4,
        time_frame: 360,
        timestamp: '2020-04-26T14:11:00Z',
      },
      {
        point: 5,
        time_frame: 360,
        timestamp: '2020-04-26T14:05:00Z',
      },
      {
        point: 6,
        time_frame: 360,
        timestamp: '2020-04-26T13:59:00Z',
      },
      {
        point: 7,
        time_frame: 360,
        timestamp: '2020-04-26T13:53:00Z',
      },
      {
        point: 8,
        time_frame: 360,
        timestamp: '2020-04-26T13:47:00Z',
      },
      {
        point: 9,
        time_frame: 360,
        timestamp: '2020-04-26T13:41:00Z',
      },
      {
        point: 10,
        time_frame: 360,
        timestamp: '2020-04-26T13:35:00Z',
      },
      {
        point: 11,
        time_frame: 360,
        timestamp: '2020-04-26T13:29:00Z',
      },
      {
        point: 12,
        time_frame: 360,
        timestamp: '2020-04-26T13:23:00Z',
      },
      {
        point: 13,
        time_frame: 360,
        timestamp: '2020-04-26T13:17:00Z',
      },
      {
        point: 14,
        time_frame: 360,
        timestamp: '2020-04-26T13:11:00Z',
      },
      {
        point: 15,
        time_frame: 360,
        timestamp: '2020-04-26T13:05:00Z',
      },
      {
        point: 16,
        time_frame: 360,
        timestamp: '2020-04-26T12:59:00Z',
      },
      {
        point: 17,
        time_frame: 360,
        timestamp: '2020-04-26T12:53:00Z',
      },
      {
        point: 18,
        time_frame: 360,
        timestamp: '2020-04-26T12:47:00Z',
      },
      {
        point: 19,
        time_frame: 360,
        timestamp: '2020-04-26T12:41:00Z',
      },
      {
        point: 20,
        time_frame: 360,
        timestamp: '2020-04-26T12:35:00Z',
      },
      {
        point: 21,
        time_frame: 360,
        timestamp: '2020-04-26T12:29:00Z',
      },
      {
        point: 22,
        time_frame: 360,
        timestamp: '2020-04-26T12:23:00Z',
      },
      {
        point: 23,
        time_frame: 360,
        timestamp: '2020-04-26T12:17:00Z',
      },
      {
        point: 24,
        time_frame: 360,
        timestamp: '2020-04-26T12:11:00Z',
      },
      {
        point: 25,
        time_frame: 360,
        timestamp: '2020-04-26T12:05:00Z',
      },
      {
        point: 26,
        time_frame: 360,
        timestamp: '2020-04-26T11:59:00Z',
      },
      {
        point: 27,
        time_frame: 360,
        timestamp: '2020-04-26T11:53:00Z',
      },
      {
        point: 28,
        time_frame: 360,
        timestamp: '2020-04-26T11:47:00Z',
      },
      {
        point: 29,
        time_frame: 360,
        timestamp: '2020-04-26T11:41:00Z',
      },
      {
        point: 30,
        time_frame: 360,
        timestamp: '2020-04-26T11:35:00Z',
      },
      {
        point: 31,
        time_frame: 360,
        timestamp: '2020-04-26T11:29:00Z',
      },
      {
        point: 32,
        time_frame: 360,
        timestamp: '2020-04-26T11:23:00Z',
      },
      {
        point: 33,
        time_frame: 360,
        timestamp: '2020-04-26T11:17:00Z',
      },
      {
        point: 34,
        time_frame: 360,
        timestamp: '2020-04-26T11:11:00Z',
      },
      {
        point: 35,
        time_frame: 360,
        timestamp: '2020-04-26T11:05:00Z',
      },
      {
        point: 36,
        time_frame: 360,
        timestamp: '2020-04-26T10:59:00Z',
      },
      {
        point: 37,
        time_frame: 360,
        timestamp: '2020-04-26T10:53:00Z',
      },
      {
        point: 38,
        time_frame: 360,
        timestamp: '2020-04-26T10:47:00Z',
      },
      {
        point: 39,
        time_frame: 360,
        timestamp: '2020-04-26T10:41:00Z',
      },
      {
        point: 40,
        time_frame: 360,
        timestamp: '2020-04-26T10:35:00Z',
      },
      {
        point: 41,
        time_frame: 360,
        timestamp: '2020-04-26T10:29:00Z',
      },
      {
        point: 42,
        time_frame: 360,
        timestamp: '2020-04-26T10:23:00Z',
      },
      {
        point: 43,
        time_frame: 360,
        timestamp: '2020-04-26T10:17:00Z',
      },
      {
        point: 44,
        time_frame: 360,
        timestamp: '2020-04-26T10:11:00Z',
      },
      {
        point: 45,
        time_frame: 360,
        timestamp: '2020-04-26T10:05:00Z',
      },
      {
        point: 46,
        time_frame: 360,
        timestamp: '2020-04-26T09:59:00Z',
      },
      {
        point: 47,
        time_frame: 360,
        timestamp: '2020-04-26T09:53:00Z',
      },
      {
        point: 48,
        time_frame: 360,
        timestamp: '2020-04-26T09:47:00Z',
      },
      {
        point: 49,
        time_frame: 360,
        timestamp: '2020-04-26T09:41:00Z',
      },
      {
        point: 50,
        time_frame: 360,
        timestamp: '2020-04-26T09:35:00Z',
      },
      {
        point: 51,
        time_frame: 360,
        timestamp: '2020-04-26T09:29:00Z',
      },
      {
        point: 52,
        time_frame: 360,
        timestamp: '2020-04-26T09:23:00Z',
      },
      {
        point: 53,
        time_frame: 360,
        timestamp: '2020-04-26T09:17:00Z',
      },
      {
        point: 54,
        time_frame: 360,
        timestamp: '2020-04-26T09:11:00Z',
      },
      {
        point: 55,
        time_frame: 360,
        timestamp: '2020-04-26T09:05:00Z',
      },
      {
        point: 56,
        time_frame: 360,
        timestamp: '2020-04-26T08:59:00Z',
      },
      {
        point: 57,
        time_frame: 360,
        timestamp: '2020-04-26T08:53:00Z',
      },
      {
        point: 58,
        time_frame: 360,
        timestamp: '2020-04-26T08:47:00Z',
      },
      {
        point: 59,
        time_frame: 360,
        timestamp: '2020-04-26T08:41:00Z',
      },
      {
        point: 60,
        time_frame: 360,
        timestamp: '2020-04-26T08:35:00Z',
      },
      {
        point: 61,
        time_frame: 360,
        timestamp: '2020-04-26T08:29:00Z',
      },
      {
        point: 62,
        time_frame: 360,
        timestamp: '2020-04-26T08:23:00Z',
      },
      {
        point: 63,
        time_frame: 360,
        timestamp: '2020-04-26T08:17:00Z',
      },
      {
        point: 64,
        time_frame: 360,
        timestamp: '2020-04-26T08:11:00Z',
      },
      {
        point: 65,
        time_frame: 360,
        timestamp: '2020-04-26T08:05:00Z',
      },
      {
        point: 66,
        time_frame: 360,
        timestamp: '2020-04-26T07:59:00Z',
      },
      {
        point: 67,
        time_frame: 360,
        timestamp: '2020-04-26T07:53:00Z',
      },
      {
        point: 68,
        time_frame: 360,
        timestamp: '2020-04-26T07:47:00Z',
      },
      {
        point: 69,
        time_frame: 360,
        timestamp: '2020-04-26T07:41:00Z',
      },
      {
        point: 70,
        time_frame: 360,
        timestamp: '2020-04-26T07:35:00Z',
      },
      {
        point: 71,
        time_frame: 360,
        timestamp: '2020-04-26T07:29:00Z',
      },
      {
        point: 72,
        time_frame: 360,
        timestamp: '2020-04-26T07:23:00Z',
      },
      {
        point: 73,
        time_frame: 360,
        timestamp: '2020-04-26T07:17:00Z',
      },
      {
        point: 74,
        time_frame: 360,
        timestamp: '2020-04-26T07:11:00Z',
      },
      {
        point: 75,
        time_frame: 360,
        timestamp: '2020-04-26T07:05:00Z',
      },
      {
        point: 76,
        time_frame: 360,
        timestamp: '2020-04-26T06:59:00Z',
      },
      {
        point: 77,
        time_frame: 360,
        timestamp: '2020-04-26T06:53:00Z',
      },
      {
        point: 78,
        time_frame: 360,
        timestamp: '2020-04-26T06:47:00Z',
      },
      {
        point: 79,
        time_frame: 360,
        timestamp: '2020-04-26T06:41:00Z',
      },
      {
        point: 80,
        time_frame: 360,
        timestamp: '2020-04-26T06:35:00Z',
      },
      {
        point: 81,
        time_frame: 360,
        timestamp: '2020-04-26T06:29:00Z',
      },
      {
        point: 82,
        time_frame: 360,
        timestamp: '2020-04-26T06:23:00Z',
      },
      {
        point: 83,
        time_frame: 360,
        timestamp: '2020-04-26T06:17:00Z',
      },
      {
        point: 84,
        time_frame: 360,
        timestamp: '2020-04-26T06:11:00Z',
      },
      {
        point: 85,
        time_frame: 360,
        timestamp: '2020-04-26T06:05:00Z',
      },
      {
        point: 86,
        time_frame: 360,
        timestamp: '2020-04-26T05:59:00Z',
      },
      {
        point: 87,
        time_frame: 360,
        timestamp: '2020-04-26T05:53:00Z',
      },
      {
        point: 88,
        time_frame: 360,
        timestamp: '2020-04-26T05:47:00Z',
      },
      {
        point: 89,
        time_frame: 360,
        timestamp: '2020-04-26T05:41:00Z',
      },
      {
        point: 90,
        time_frame: 360,
        timestamp: '2020-04-26T05:35:00Z',
      },
      {
        point: 91,
        time_frame: 360,
        timestamp: '2020-04-26T05:29:00Z',
      },
      {
        point: 92,
        time_frame: 360,
        timestamp: '2020-04-26T05:23:00Z',
      },
      {
        point: 93,
        time_frame: 360,
        timestamp: '2020-04-26T05:17:00Z',
      },
      {
        point: 94,
        time_frame: 360,
        timestamp: '2020-04-26T05:11:00Z',
      },
      {
        point: 95,
        time_frame: 360,
        timestamp: '2020-04-26T05:05:00Z',
      },
      {
        point: 96,
        time_frame: 360,
        timestamp: '2020-04-26T04:59:00Z',
      },
      {
        point: 97,
        time_frame: 360,
        timestamp: '2020-04-26T04:53:00Z',
      },
      {
        point: 98,
        time_frame: 360,
        timestamp: '2020-04-26T04:47:00Z',
      },
      {
        point: 99,
        time_frame: 360,
        timestamp: '2020-04-26T04:41:00Z',
      },
      {
        point: 100,
        time_frame: 360,
        timestamp: '2020-04-26T04:35:00Z',
      },
      {
        point: 101,
        time_frame: 360,
        timestamp: '2020-04-26T04:29:00Z',
      },
      {
        point: 102,
        time_frame: 360,
        timestamp: '2020-04-26T04:23:00Z',
      },
      {
        point: 103,
        time_frame: 360,
        timestamp: '2020-04-26T04:17:00Z',
      },
      {
        point: 104,
        time_frame: 360,
        timestamp: '2020-04-26T04:11:00Z',
      },
      {
        point: 105,
        time_frame: 360,
        timestamp: '2020-04-26T04:05:00Z',
      },
      {
        point: 106,
        time_frame: 360,
        timestamp: '2020-04-26T03:59:00Z',
      },
      {
        point: 107,
        time_frame: 360,
        timestamp: '2020-04-26T03:53:00Z',
      },
      {
        point: 108,
        time_frame: 360,
        timestamp: '2020-04-26T03:47:00Z',
      },
      {
        point: 109,
        time_frame: 360,
        timestamp: '2020-04-26T03:41:00Z',
      },
      {
        point: 110,
        time_frame: 360,
        timestamp: '2020-04-26T03:35:00Z',
      },
      {
        point: 111,
        time_frame: 360,
        timestamp: '2020-04-26T03:29:00Z',
      },
      {
        point: 112,
        time_frame: 360,
        timestamp: '2020-04-26T03:23:00Z',
      },
      {
        point: 113,
        time_frame: 360,
        timestamp: '2020-04-26T03:17:00Z',
      },
      {
        point: 114,
        time_frame: 360,
        timestamp: '2020-04-26T03:11:00Z',
      },
      {
        point: 115,
        time_frame: 360,
        timestamp: '2020-04-26T03:05:00Z',
      },
      {
        point: 116,
        time_frame: 360,
        timestamp: '2020-04-26T02:59:00Z',
      },
      {
        point: 117,
        time_frame: 360,
        timestamp: '2020-04-26T02:53:00Z',
      },
      {
        point: 118,
        time_frame: 360,
        timestamp: '2020-04-26T02:47:00Z',
      },
      {
        point: 119,
        time_frame: 360,
        timestamp: '2020-04-26T02:41:00Z',
      },
    ],
    metric: {
      rate: 0.00087962963,
      sum: 38,
    },
    total: {
      rate: 0.7329861,
      sum: 31665,
    },
    queryCount: 38,
    percentOfTotal: 0.12,
    isRate: true,
    isSum: true,
    isStats: false,
    metricName: 'num_queries',
  },
  {
    name: 'Query Time',
    tooltip: 'The average statement execution time in seconds',
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
        timestamp: '2020-04-26T14:35:00Z',
        m_query_time_sum_per_sec: 0.035758805,
      },
      {
        point: 1,
        time_frame: 360,
        timestamp: '2020-04-26T14:29:00Z',
      },
      {
        point: 2,
        time_frame: 360,
        timestamp: '2020-04-26T14:23:00Z',
      },
      {
        point: 3,
        time_frame: 360,
        timestamp: '2020-04-26T14:17:00Z',
      },
      {
        point: 4,
        time_frame: 360,
        timestamp: '2020-04-26T14:11:00Z',
      },
      {
        point: 5,
        time_frame: 360,
        timestamp: '2020-04-26T14:05:00Z',
      },
      {
        point: 6,
        time_frame: 360,
        timestamp: '2020-04-26T13:59:00Z',
      },
      {
        point: 7,
        time_frame: 360,
        timestamp: '2020-04-26T13:53:00Z',
      },
      {
        point: 8,
        time_frame: 360,
        timestamp: '2020-04-26T13:47:00Z',
      },
      {
        point: 9,
        time_frame: 360,
        timestamp: '2020-04-26T13:41:00Z',
      },
      {
        point: 10,
        time_frame: 360,
        timestamp: '2020-04-26T13:35:00Z',
      },
      {
        point: 11,
        time_frame: 360,
        timestamp: '2020-04-26T13:29:00Z',
      },
      {
        point: 12,
        time_frame: 360,
        timestamp: '2020-04-26T13:23:00Z',
      },
      {
        point: 13,
        time_frame: 360,
        timestamp: '2020-04-26T13:17:00Z',
      },
      {
        point: 14,
        time_frame: 360,
        timestamp: '2020-04-26T13:11:00Z',
      },
      {
        point: 15,
        time_frame: 360,
        timestamp: '2020-04-26T13:05:00Z',
      },
      {
        point: 16,
        time_frame: 360,
        timestamp: '2020-04-26T12:59:00Z',
      },
      {
        point: 17,
        time_frame: 360,
        timestamp: '2020-04-26T12:53:00Z',
      },
      {
        point: 18,
        time_frame: 360,
        timestamp: '2020-04-26T12:47:00Z',
      },
      {
        point: 19,
        time_frame: 360,
        timestamp: '2020-04-26T12:41:00Z',
      },
      {
        point: 20,
        time_frame: 360,
        timestamp: '2020-04-26T12:35:00Z',
      },
      {
        point: 21,
        time_frame: 360,
        timestamp: '2020-04-26T12:29:00Z',
      },
      {
        point: 22,
        time_frame: 360,
        timestamp: '2020-04-26T12:23:00Z',
      },
      {
        point: 23,
        time_frame: 360,
        timestamp: '2020-04-26T12:17:00Z',
      },
      {
        point: 24,
        time_frame: 360,
        timestamp: '2020-04-26T12:11:00Z',
      },
      {
        point: 25,
        time_frame: 360,
        timestamp: '2020-04-26T12:05:00Z',
      },
      {
        point: 26,
        time_frame: 360,
        timestamp: '2020-04-26T11:59:00Z',
      },
      {
        point: 27,
        time_frame: 360,
        timestamp: '2020-04-26T11:53:00Z',
      },
      {
        point: 28,
        time_frame: 360,
        timestamp: '2020-04-26T11:47:00Z',
      },
      {
        point: 29,
        time_frame: 360,
        timestamp: '2020-04-26T11:41:00Z',
      },
      {
        point: 30,
        time_frame: 360,
        timestamp: '2020-04-26T11:35:00Z',
      },
      {
        point: 31,
        time_frame: 360,
        timestamp: '2020-04-26T11:29:00Z',
      },
      {
        point: 32,
        time_frame: 360,
        timestamp: '2020-04-26T11:23:00Z',
      },
      {
        point: 33,
        time_frame: 360,
        timestamp: '2020-04-26T11:17:00Z',
      },
      {
        point: 34,
        time_frame: 360,
        timestamp: '2020-04-26T11:11:00Z',
      },
      {
        point: 35,
        time_frame: 360,
        timestamp: '2020-04-26T11:05:00Z',
      },
      {
        point: 36,
        time_frame: 360,
        timestamp: '2020-04-26T10:59:00Z',
      },
      {
        point: 37,
        time_frame: 360,
        timestamp: '2020-04-26T10:53:00Z',
      },
      {
        point: 38,
        time_frame: 360,
        timestamp: '2020-04-26T10:47:00Z',
      },
      {
        point: 39,
        time_frame: 360,
        timestamp: '2020-04-26T10:41:00Z',
      },
      {
        point: 40,
        time_frame: 360,
        timestamp: '2020-04-26T10:35:00Z',
      },
      {
        point: 41,
        time_frame: 360,
        timestamp: '2020-04-26T10:29:00Z',
      },
      {
        point: 42,
        time_frame: 360,
        timestamp: '2020-04-26T10:23:00Z',
      },
      {
        point: 43,
        time_frame: 360,
        timestamp: '2020-04-26T10:17:00Z',
      },
      {
        point: 44,
        time_frame: 360,
        timestamp: '2020-04-26T10:11:00Z',
      },
      {
        point: 45,
        time_frame: 360,
        timestamp: '2020-04-26T10:05:00Z',
      },
      {
        point: 46,
        time_frame: 360,
        timestamp: '2020-04-26T09:59:00Z',
      },
      {
        point: 47,
        time_frame: 360,
        timestamp: '2020-04-26T09:53:00Z',
      },
      {
        point: 48,
        time_frame: 360,
        timestamp: '2020-04-26T09:47:00Z',
      },
      {
        point: 49,
        time_frame: 360,
        timestamp: '2020-04-26T09:41:00Z',
      },
      {
        point: 50,
        time_frame: 360,
        timestamp: '2020-04-26T09:35:00Z',
      },
      {
        point: 51,
        time_frame: 360,
        timestamp: '2020-04-26T09:29:00Z',
      },
      {
        point: 52,
        time_frame: 360,
        timestamp: '2020-04-26T09:23:00Z',
      },
      {
        point: 53,
        time_frame: 360,
        timestamp: '2020-04-26T09:17:00Z',
      },
      {
        point: 54,
        time_frame: 360,
        timestamp: '2020-04-26T09:11:00Z',
      },
      {
        point: 55,
        time_frame: 360,
        timestamp: '2020-04-26T09:05:00Z',
      },
      {
        point: 56,
        time_frame: 360,
        timestamp: '2020-04-26T08:59:00Z',
      },
      {
        point: 57,
        time_frame: 360,
        timestamp: '2020-04-26T08:53:00Z',
      },
      {
        point: 58,
        time_frame: 360,
        timestamp: '2020-04-26T08:47:00Z',
      },
      {
        point: 59,
        time_frame: 360,
        timestamp: '2020-04-26T08:41:00Z',
      },
      {
        point: 60,
        time_frame: 360,
        timestamp: '2020-04-26T08:35:00Z',
      },
      {
        point: 61,
        time_frame: 360,
        timestamp: '2020-04-26T08:29:00Z',
      },
      {
        point: 62,
        time_frame: 360,
        timestamp: '2020-04-26T08:23:00Z',
      },
      {
        point: 63,
        time_frame: 360,
        timestamp: '2020-04-26T08:17:00Z',
      },
      {
        point: 64,
        time_frame: 360,
        timestamp: '2020-04-26T08:11:00Z',
      },
      {
        point: 65,
        time_frame: 360,
        timestamp: '2020-04-26T08:05:00Z',
      },
      {
        point: 66,
        time_frame: 360,
        timestamp: '2020-04-26T07:59:00Z',
      },
      {
        point: 67,
        time_frame: 360,
        timestamp: '2020-04-26T07:53:00Z',
      },
      {
        point: 68,
        time_frame: 360,
        timestamp: '2020-04-26T07:47:00Z',
      },
      {
        point: 69,
        time_frame: 360,
        timestamp: '2020-04-26T07:41:00Z',
      },
      {
        point: 70,
        time_frame: 360,
        timestamp: '2020-04-26T07:35:00Z',
      },
      {
        point: 71,
        time_frame: 360,
        timestamp: '2020-04-26T07:29:00Z',
      },
      {
        point: 72,
        time_frame: 360,
        timestamp: '2020-04-26T07:23:00Z',
      },
      {
        point: 73,
        time_frame: 360,
        timestamp: '2020-04-26T07:17:00Z',
      },
      {
        point: 74,
        time_frame: 360,
        timestamp: '2020-04-26T07:11:00Z',
      },
      {
        point: 75,
        time_frame: 360,
        timestamp: '2020-04-26T07:05:00Z',
      },
      {
        point: 76,
        time_frame: 360,
        timestamp: '2020-04-26T06:59:00Z',
      },
      {
        point: 77,
        time_frame: 360,
        timestamp: '2020-04-26T06:53:00Z',
      },
      {
        point: 78,
        time_frame: 360,
        timestamp: '2020-04-26T06:47:00Z',
      },
      {
        point: 79,
        time_frame: 360,
        timestamp: '2020-04-26T06:41:00Z',
      },
      {
        point: 80,
        time_frame: 360,
        timestamp: '2020-04-26T06:35:00Z',
      },
      {
        point: 81,
        time_frame: 360,
        timestamp: '2020-04-26T06:29:00Z',
      },
      {
        point: 82,
        time_frame: 360,
        timestamp: '2020-04-26T06:23:00Z',
      },
      {
        point: 83,
        time_frame: 360,
        timestamp: '2020-04-26T06:17:00Z',
      },
      {
        point: 84,
        time_frame: 360,
        timestamp: '2020-04-26T06:11:00Z',
      },
      {
        point: 85,
        time_frame: 360,
        timestamp: '2020-04-26T06:05:00Z',
      },
      {
        point: 86,
        time_frame: 360,
        timestamp: '2020-04-26T05:59:00Z',
      },
      {
        point: 87,
        time_frame: 360,
        timestamp: '2020-04-26T05:53:00Z',
      },
      {
        point: 88,
        time_frame: 360,
        timestamp: '2020-04-26T05:47:00Z',
      },
      {
        point: 89,
        time_frame: 360,
        timestamp: '2020-04-26T05:41:00Z',
      },
      {
        point: 90,
        time_frame: 360,
        timestamp: '2020-04-26T05:35:00Z',
      },
      {
        point: 91,
        time_frame: 360,
        timestamp: '2020-04-26T05:29:00Z',
      },
      {
        point: 92,
        time_frame: 360,
        timestamp: '2020-04-26T05:23:00Z',
      },
      {
        point: 93,
        time_frame: 360,
        timestamp: '2020-04-26T05:17:00Z',
      },
      {
        point: 94,
        time_frame: 360,
        timestamp: '2020-04-26T05:11:00Z',
      },
      {
        point: 95,
        time_frame: 360,
        timestamp: '2020-04-26T05:05:00Z',
      },
      {
        point: 96,
        time_frame: 360,
        timestamp: '2020-04-26T04:59:00Z',
      },
      {
        point: 97,
        time_frame: 360,
        timestamp: '2020-04-26T04:53:00Z',
      },
      {
        point: 98,
        time_frame: 360,
        timestamp: '2020-04-26T04:47:00Z',
      },
      {
        point: 99,
        time_frame: 360,
        timestamp: '2020-04-26T04:41:00Z',
      },
      {
        point: 100,
        time_frame: 360,
        timestamp: '2020-04-26T04:35:00Z',
      },
      {
        point: 101,
        time_frame: 360,
        timestamp: '2020-04-26T04:29:00Z',
      },
      {
        point: 102,
        time_frame: 360,
        timestamp: '2020-04-26T04:23:00Z',
      },
      {
        point: 103,
        time_frame: 360,
        timestamp: '2020-04-26T04:17:00Z',
      },
      {
        point: 104,
        time_frame: 360,
        timestamp: '2020-04-26T04:11:00Z',
      },
      {
        point: 105,
        time_frame: 360,
        timestamp: '2020-04-26T04:05:00Z',
      },
      {
        point: 106,
        time_frame: 360,
        timestamp: '2020-04-26T03:59:00Z',
      },
      {
        point: 107,
        time_frame: 360,
        timestamp: '2020-04-26T03:53:00Z',
      },
      {
        point: 108,
        time_frame: 360,
        timestamp: '2020-04-26T03:47:00Z',
      },
      {
        point: 109,
        time_frame: 360,
        timestamp: '2020-04-26T03:41:00Z',
      },
      {
        point: 110,
        time_frame: 360,
        timestamp: '2020-04-26T03:35:00Z',
      },
      {
        point: 111,
        time_frame: 360,
        timestamp: '2020-04-26T03:29:00Z',
      },
      {
        point: 112,
        time_frame: 360,
        timestamp: '2020-04-26T03:23:00Z',
      },
      {
        point: 113,
        time_frame: 360,
        timestamp: '2020-04-26T03:17:00Z',
      },
      {
        point: 114,
        time_frame: 360,
        timestamp: '2020-04-26T03:11:00Z',
      },
      {
        point: 115,
        time_frame: 360,
        timestamp: '2020-04-26T03:05:00Z',
      },
      {
        point: 116,
        time_frame: 360,
        timestamp: '2020-04-26T02:59:00Z',
      },
      {
        point: 117,
        time_frame: 360,
        timestamp: '2020-04-26T02:53:00Z',
      },
      {
        point: 118,
        time_frame: 360,
        timestamp: '2020-04-26T02:47:00Z',
      },
      {
        point: 119,
        time_frame: 360,
        timestamp: '2020-04-26T02:41:00Z',
      },
    ],
    metric: {
      rate: 0.00029799005,
      cnt: 38,
      sum: 12.87317,
      avg: 0.33876762,
    },
    total: {
      rate: 0.1223858,
      cnt: 31665,
      sum: 5287.0664,
      max: 16.406416,
      avg: 0.16696878,
      p99: 0.04005131,
    },
    queryCount: 38,
    percentOfTotal: 0.24,
    isRate: true,
    isSum: true,
    isStats: true,
    metricName: 'query_time',
  },
  {
    name: 'Lock Time',
    tooltip: 'The time to acquire locks in seconds',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time',
    },
    units: '(avg load)',
    complexMetric: '0.08% of query time',
    sparkline: [
      {
        time_frame: 360,
        timestamp: '2020-04-26T14:35:00Z',
        m_lock_time_sum_per_sec: 0.000029199999,
      },
      {
        point: 1,
        time_frame: 360,
        timestamp: '2020-04-26T14:29:00Z',
      },
      {
        point: 2,
        time_frame: 360,
        timestamp: '2020-04-26T14:23:00Z',
      },
      {
        point: 3,
        time_frame: 360,
        timestamp: '2020-04-26T14:17:00Z',
      },
      {
        point: 4,
        time_frame: 360,
        timestamp: '2020-04-26T14:11:00Z',
      },
      {
        point: 5,
        time_frame: 360,
        timestamp: '2020-04-26T14:05:00Z',
      },
      {
        point: 6,
        time_frame: 360,
        timestamp: '2020-04-26T13:59:00Z',
      },
      {
        point: 7,
        time_frame: 360,
        timestamp: '2020-04-26T13:53:00Z',
      },
      {
        point: 8,
        time_frame: 360,
        timestamp: '2020-04-26T13:47:00Z',
      },
      {
        point: 9,
        time_frame: 360,
        timestamp: '2020-04-26T13:41:00Z',
      },
      {
        point: 10,
        time_frame: 360,
        timestamp: '2020-04-26T13:35:00Z',
      },
      {
        point: 11,
        time_frame: 360,
        timestamp: '2020-04-26T13:29:00Z',
      },
      {
        point: 12,
        time_frame: 360,
        timestamp: '2020-04-26T13:23:00Z',
      },
      {
        point: 13,
        time_frame: 360,
        timestamp: '2020-04-26T13:17:00Z',
      },
      {
        point: 14,
        time_frame: 360,
        timestamp: '2020-04-26T13:11:00Z',
      },
      {
        point: 15,
        time_frame: 360,
        timestamp: '2020-04-26T13:05:00Z',
      },
      {
        point: 16,
        time_frame: 360,
        timestamp: '2020-04-26T12:59:00Z',
      },
      {
        point: 17,
        time_frame: 360,
        timestamp: '2020-04-26T12:53:00Z',
      },
      {
        point: 18,
        time_frame: 360,
        timestamp: '2020-04-26T12:47:00Z',
      },
      {
        point: 19,
        time_frame: 360,
        timestamp: '2020-04-26T12:41:00Z',
      },
      {
        point: 20,
        time_frame: 360,
        timestamp: '2020-04-26T12:35:00Z',
      },
      {
        point: 21,
        time_frame: 360,
        timestamp: '2020-04-26T12:29:00Z',
      },
      {
        point: 22,
        time_frame: 360,
        timestamp: '2020-04-26T12:23:00Z',
      },
      {
        point: 23,
        time_frame: 360,
        timestamp: '2020-04-26T12:17:00Z',
      },
      {
        point: 24,
        time_frame: 360,
        timestamp: '2020-04-26T12:11:00Z',
      },
      {
        point: 25,
        time_frame: 360,
        timestamp: '2020-04-26T12:05:00Z',
      },
      {
        point: 26,
        time_frame: 360,
        timestamp: '2020-04-26T11:59:00Z',
      },
      {
        point: 27,
        time_frame: 360,
        timestamp: '2020-04-26T11:53:00Z',
      },
      {
        point: 28,
        time_frame: 360,
        timestamp: '2020-04-26T11:47:00Z',
      },
      {
        point: 29,
        time_frame: 360,
        timestamp: '2020-04-26T11:41:00Z',
      },
      {
        point: 30,
        time_frame: 360,
        timestamp: '2020-04-26T11:35:00Z',
      },
      {
        point: 31,
        time_frame: 360,
        timestamp: '2020-04-26T11:29:00Z',
      },
      {
        point: 32,
        time_frame: 360,
        timestamp: '2020-04-26T11:23:00Z',
      },
      {
        point: 33,
        time_frame: 360,
        timestamp: '2020-04-26T11:17:00Z',
      },
      {
        point: 34,
        time_frame: 360,
        timestamp: '2020-04-26T11:11:00Z',
      },
      {
        point: 35,
        time_frame: 360,
        timestamp: '2020-04-26T11:05:00Z',
      },
      {
        point: 36,
        time_frame: 360,
        timestamp: '2020-04-26T10:59:00Z',
      },
      {
        point: 37,
        time_frame: 360,
        timestamp: '2020-04-26T10:53:00Z',
      },
      {
        point: 38,
        time_frame: 360,
        timestamp: '2020-04-26T10:47:00Z',
      },
      {
        point: 39,
        time_frame: 360,
        timestamp: '2020-04-26T10:41:00Z',
      },
      {
        point: 40,
        time_frame: 360,
        timestamp: '2020-04-26T10:35:00Z',
      },
      {
        point: 41,
        time_frame: 360,
        timestamp: '2020-04-26T10:29:00Z',
      },
      {
        point: 42,
        time_frame: 360,
        timestamp: '2020-04-26T10:23:00Z',
      },
      {
        point: 43,
        time_frame: 360,
        timestamp: '2020-04-26T10:17:00Z',
      },
      {
        point: 44,
        time_frame: 360,
        timestamp: '2020-04-26T10:11:00Z',
      },
      {
        point: 45,
        time_frame: 360,
        timestamp: '2020-04-26T10:05:00Z',
      },
      {
        point: 46,
        time_frame: 360,
        timestamp: '2020-04-26T09:59:00Z',
      },
      {
        point: 47,
        time_frame: 360,
        timestamp: '2020-04-26T09:53:00Z',
      },
      {
        point: 48,
        time_frame: 360,
        timestamp: '2020-04-26T09:47:00Z',
      },
      {
        point: 49,
        time_frame: 360,
        timestamp: '2020-04-26T09:41:00Z',
      },
      {
        point: 50,
        time_frame: 360,
        timestamp: '2020-04-26T09:35:00Z',
      },
      {
        point: 51,
        time_frame: 360,
        timestamp: '2020-04-26T09:29:00Z',
      },
      {
        point: 52,
        time_frame: 360,
        timestamp: '2020-04-26T09:23:00Z',
      },
      {
        point: 53,
        time_frame: 360,
        timestamp: '2020-04-26T09:17:00Z',
      },
      {
        point: 54,
        time_frame: 360,
        timestamp: '2020-04-26T09:11:00Z',
      },
      {
        point: 55,
        time_frame: 360,
        timestamp: '2020-04-26T09:05:00Z',
      },
      {
        point: 56,
        time_frame: 360,
        timestamp: '2020-04-26T08:59:00Z',
      },
      {
        point: 57,
        time_frame: 360,
        timestamp: '2020-04-26T08:53:00Z',
      },
      {
        point: 58,
        time_frame: 360,
        timestamp: '2020-04-26T08:47:00Z',
      },
      {
        point: 59,
        time_frame: 360,
        timestamp: '2020-04-26T08:41:00Z',
      },
      {
        point: 60,
        time_frame: 360,
        timestamp: '2020-04-26T08:35:00Z',
      },
      {
        point: 61,
        time_frame: 360,
        timestamp: '2020-04-26T08:29:00Z',
      },
      {
        point: 62,
        time_frame: 360,
        timestamp: '2020-04-26T08:23:00Z',
      },
      {
        point: 63,
        time_frame: 360,
        timestamp: '2020-04-26T08:17:00Z',
      },
      {
        point: 64,
        time_frame: 360,
        timestamp: '2020-04-26T08:11:00Z',
      },
      {
        point: 65,
        time_frame: 360,
        timestamp: '2020-04-26T08:05:00Z',
      },
      {
        point: 66,
        time_frame: 360,
        timestamp: '2020-04-26T07:59:00Z',
      },
      {
        point: 67,
        time_frame: 360,
        timestamp: '2020-04-26T07:53:00Z',
      },
      {
        point: 68,
        time_frame: 360,
        timestamp: '2020-04-26T07:47:00Z',
      },
      {
        point: 69,
        time_frame: 360,
        timestamp: '2020-04-26T07:41:00Z',
      },
      {
        point: 70,
        time_frame: 360,
        timestamp: '2020-04-26T07:35:00Z',
      },
      {
        point: 71,
        time_frame: 360,
        timestamp: '2020-04-26T07:29:00Z',
      },
      {
        point: 72,
        time_frame: 360,
        timestamp: '2020-04-26T07:23:00Z',
      },
      {
        point: 73,
        time_frame: 360,
        timestamp: '2020-04-26T07:17:00Z',
      },
      {
        point: 74,
        time_frame: 360,
        timestamp: '2020-04-26T07:11:00Z',
      },
      {
        point: 75,
        time_frame: 360,
        timestamp: '2020-04-26T07:05:00Z',
      },
      {
        point: 76,
        time_frame: 360,
        timestamp: '2020-04-26T06:59:00Z',
      },
      {
        point: 77,
        time_frame: 360,
        timestamp: '2020-04-26T06:53:00Z',
      },
      {
        point: 78,
        time_frame: 360,
        timestamp: '2020-04-26T06:47:00Z',
      },
      {
        point: 79,
        time_frame: 360,
        timestamp: '2020-04-26T06:41:00Z',
      },
      {
        point: 80,
        time_frame: 360,
        timestamp: '2020-04-26T06:35:00Z',
      },
      {
        point: 81,
        time_frame: 360,
        timestamp: '2020-04-26T06:29:00Z',
      },
      {
        point: 82,
        time_frame: 360,
        timestamp: '2020-04-26T06:23:00Z',
      },
      {
        point: 83,
        time_frame: 360,
        timestamp: '2020-04-26T06:17:00Z',
      },
      {
        point: 84,
        time_frame: 360,
        timestamp: '2020-04-26T06:11:00Z',
      },
      {
        point: 85,
        time_frame: 360,
        timestamp: '2020-04-26T06:05:00Z',
      },
      {
        point: 86,
        time_frame: 360,
        timestamp: '2020-04-26T05:59:00Z',
      },
      {
        point: 87,
        time_frame: 360,
        timestamp: '2020-04-26T05:53:00Z',
      },
      {
        point: 88,
        time_frame: 360,
        timestamp: '2020-04-26T05:47:00Z',
      },
      {
        point: 89,
        time_frame: 360,
        timestamp: '2020-04-26T05:41:00Z',
      },
      {
        point: 90,
        time_frame: 360,
        timestamp: '2020-04-26T05:35:00Z',
      },
      {
        point: 91,
        time_frame: 360,
        timestamp: '2020-04-26T05:29:00Z',
      },
      {
        point: 92,
        time_frame: 360,
        timestamp: '2020-04-26T05:23:00Z',
      },
      {
        point: 93,
        time_frame: 360,
        timestamp: '2020-04-26T05:17:00Z',
      },
      {
        point: 94,
        time_frame: 360,
        timestamp: '2020-04-26T05:11:00Z',
      },
      {
        point: 95,
        time_frame: 360,
        timestamp: '2020-04-26T05:05:00Z',
      },
      {
        point: 96,
        time_frame: 360,
        timestamp: '2020-04-26T04:59:00Z',
      },
      {
        point: 97,
        time_frame: 360,
        timestamp: '2020-04-26T04:53:00Z',
      },
      {
        point: 98,
        time_frame: 360,
        timestamp: '2020-04-26T04:47:00Z',
      },
      {
        point: 99,
        time_frame: 360,
        timestamp: '2020-04-26T04:41:00Z',
      },
      {
        point: 100,
        time_frame: 360,
        timestamp: '2020-04-26T04:35:00Z',
      },
      {
        point: 101,
        time_frame: 360,
        timestamp: '2020-04-26T04:29:00Z',
      },
      {
        point: 102,
        time_frame: 360,
        timestamp: '2020-04-26T04:23:00Z',
      },
      {
        point: 103,
        time_frame: 360,
        timestamp: '2020-04-26T04:17:00Z',
      },
      {
        point: 104,
        time_frame: 360,
        timestamp: '2020-04-26T04:11:00Z',
      },
      {
        point: 105,
        time_frame: 360,
        timestamp: '2020-04-26T04:05:00Z',
      },
      {
        point: 106,
        time_frame: 360,
        timestamp: '2020-04-26T03:59:00Z',
      },
      {
        point: 107,
        time_frame: 360,
        timestamp: '2020-04-26T03:53:00Z',
      },
      {
        point: 108,
        time_frame: 360,
        timestamp: '2020-04-26T03:47:00Z',
      },
      {
        point: 109,
        time_frame: 360,
        timestamp: '2020-04-26T03:41:00Z',
      },
      {
        point: 110,
        time_frame: 360,
        timestamp: '2020-04-26T03:35:00Z',
      },
      {
        point: 111,
        time_frame: 360,
        timestamp: '2020-04-26T03:29:00Z',
      },
      {
        point: 112,
        time_frame: 360,
        timestamp: '2020-04-26T03:23:00Z',
      },
      {
        point: 113,
        time_frame: 360,
        timestamp: '2020-04-26T03:17:00Z',
      },
      {
        point: 114,
        time_frame: 360,
        timestamp: '2020-04-26T03:11:00Z',
      },
      {
        point: 115,
        time_frame: 360,
        timestamp: '2020-04-26T03:05:00Z',
      },
      {
        point: 116,
        time_frame: 360,
        timestamp: '2020-04-26T02:59:00Z',
      },
      {
        point: 117,
        time_frame: 360,
        timestamp: '2020-04-26T02:53:00Z',
      },
      {
        point: 118,
        time_frame: 360,
        timestamp: '2020-04-26T02:47:00Z',
      },
      {
        point: 119,
        time_frame: 360,
        timestamp: '2020-04-26T02:41:00Z',
      },
    ],
    metric: {
      rate: 2.4333335e-7,
      cnt: 38,
      sum: 0.010512,
      avg: 0.0002766316,
    },
    total: {
      rate: 0.0059162816,
      cnt: 31183,
      sum: 255.58337,
      max: 1.336562,
      avg: 0.00819624,
      p99: 0.00289437,
    },
    queryCount: 38,
    percentOfTotal: 0,
    isRate: true,
    isSum: true,
    isStats: true,
    metricName: 'lock_time',
  },
  {
    name: 'Rows Sent',
    tooltip: 'The number of rows sent to the client',
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
        timestamp: '2020-04-26T14:35:00Z',
        m_rows_sent_sum_per_sec: 85.844444,
      },
      {
        point: 1,
        time_frame: 360,
        timestamp: '2020-04-26T14:29:00Z',
      },
      {
        point: 2,
        time_frame: 360,
        timestamp: '2020-04-26T14:23:00Z',
      },
      {
        point: 3,
        time_frame: 360,
        timestamp: '2020-04-26T14:17:00Z',
      },
      {
        point: 4,
        time_frame: 360,
        timestamp: '2020-04-26T14:11:00Z',
      },
      {
        point: 5,
        time_frame: 360,
        timestamp: '2020-04-26T14:05:00Z',
      },
      {
        point: 6,
        time_frame: 360,
        timestamp: '2020-04-26T13:59:00Z',
      },
      {
        point: 7,
        time_frame: 360,
        timestamp: '2020-04-26T13:53:00Z',
      },
      {
        point: 8,
        time_frame: 360,
        timestamp: '2020-04-26T13:47:00Z',
      },
      {
        point: 9,
        time_frame: 360,
        timestamp: '2020-04-26T13:41:00Z',
      },
      {
        point: 10,
        time_frame: 360,
        timestamp: '2020-04-26T13:35:00Z',
      },
      {
        point: 11,
        time_frame: 360,
        timestamp: '2020-04-26T13:29:00Z',
      },
      {
        point: 12,
        time_frame: 360,
        timestamp: '2020-04-26T13:23:00Z',
      },
      {
        point: 13,
        time_frame: 360,
        timestamp: '2020-04-26T13:17:00Z',
      },
      {
        point: 14,
        time_frame: 360,
        timestamp: '2020-04-26T13:11:00Z',
      },
      {
        point: 15,
        time_frame: 360,
        timestamp: '2020-04-26T13:05:00Z',
      },
      {
        point: 16,
        time_frame: 360,
        timestamp: '2020-04-26T12:59:00Z',
      },
      {
        point: 17,
        time_frame: 360,
        timestamp: '2020-04-26T12:53:00Z',
      },
      {
        point: 18,
        time_frame: 360,
        timestamp: '2020-04-26T12:47:00Z',
      },
      {
        point: 19,
        time_frame: 360,
        timestamp: '2020-04-26T12:41:00Z',
      },
      {
        point: 20,
        time_frame: 360,
        timestamp: '2020-04-26T12:35:00Z',
      },
      {
        point: 21,
        time_frame: 360,
        timestamp: '2020-04-26T12:29:00Z',
      },
      {
        point: 22,
        time_frame: 360,
        timestamp: '2020-04-26T12:23:00Z',
      },
      {
        point: 23,
        time_frame: 360,
        timestamp: '2020-04-26T12:17:00Z',
      },
      {
        point: 24,
        time_frame: 360,
        timestamp: '2020-04-26T12:11:00Z',
      },
      {
        point: 25,
        time_frame: 360,
        timestamp: '2020-04-26T12:05:00Z',
      },
      {
        point: 26,
        time_frame: 360,
        timestamp: '2020-04-26T11:59:00Z',
      },
      {
        point: 27,
        time_frame: 360,
        timestamp: '2020-04-26T11:53:00Z',
      },
      {
        point: 28,
        time_frame: 360,
        timestamp: '2020-04-26T11:47:00Z',
      },
      {
        point: 29,
        time_frame: 360,
        timestamp: '2020-04-26T11:41:00Z',
      },
      {
        point: 30,
        time_frame: 360,
        timestamp: '2020-04-26T11:35:00Z',
      },
      {
        point: 31,
        time_frame: 360,
        timestamp: '2020-04-26T11:29:00Z',
      },
      {
        point: 32,
        time_frame: 360,
        timestamp: '2020-04-26T11:23:00Z',
      },
      {
        point: 33,
        time_frame: 360,
        timestamp: '2020-04-26T11:17:00Z',
      },
      {
        point: 34,
        time_frame: 360,
        timestamp: '2020-04-26T11:11:00Z',
      },
      {
        point: 35,
        time_frame: 360,
        timestamp: '2020-04-26T11:05:00Z',
      },
      {
        point: 36,
        time_frame: 360,
        timestamp: '2020-04-26T10:59:00Z',
      },
      {
        point: 37,
        time_frame: 360,
        timestamp: '2020-04-26T10:53:00Z',
      },
      {
        point: 38,
        time_frame: 360,
        timestamp: '2020-04-26T10:47:00Z',
      },
      {
        point: 39,
        time_frame: 360,
        timestamp: '2020-04-26T10:41:00Z',
      },
      {
        point: 40,
        time_frame: 360,
        timestamp: '2020-04-26T10:35:00Z',
      },
      {
        point: 41,
        time_frame: 360,
        timestamp: '2020-04-26T10:29:00Z',
      },
      {
        point: 42,
        time_frame: 360,
        timestamp: '2020-04-26T10:23:00Z',
      },
      {
        point: 43,
        time_frame: 360,
        timestamp: '2020-04-26T10:17:00Z',
      },
      {
        point: 44,
        time_frame: 360,
        timestamp: '2020-04-26T10:11:00Z',
      },
      {
        point: 45,
        time_frame: 360,
        timestamp: '2020-04-26T10:05:00Z',
      },
      {
        point: 46,
        time_frame: 360,
        timestamp: '2020-04-26T09:59:00Z',
      },
      {
        point: 47,
        time_frame: 360,
        timestamp: '2020-04-26T09:53:00Z',
      },
      {
        point: 48,
        time_frame: 360,
        timestamp: '2020-04-26T09:47:00Z',
      },
      {
        point: 49,
        time_frame: 360,
        timestamp: '2020-04-26T09:41:00Z',
      },
      {
        point: 50,
        time_frame: 360,
        timestamp: '2020-04-26T09:35:00Z',
      },
      {
        point: 51,
        time_frame: 360,
        timestamp: '2020-04-26T09:29:00Z',
      },
      {
        point: 52,
        time_frame: 360,
        timestamp: '2020-04-26T09:23:00Z',
      },
      {
        point: 53,
        time_frame: 360,
        timestamp: '2020-04-26T09:17:00Z',
      },
      {
        point: 54,
        time_frame: 360,
        timestamp: '2020-04-26T09:11:00Z',
      },
      {
        point: 55,
        time_frame: 360,
        timestamp: '2020-04-26T09:05:00Z',
      },
      {
        point: 56,
        time_frame: 360,
        timestamp: '2020-04-26T08:59:00Z',
      },
      {
        point: 57,
        time_frame: 360,
        timestamp: '2020-04-26T08:53:00Z',
      },
      {
        point: 58,
        time_frame: 360,
        timestamp: '2020-04-26T08:47:00Z',
      },
      {
        point: 59,
        time_frame: 360,
        timestamp: '2020-04-26T08:41:00Z',
      },
      {
        point: 60,
        time_frame: 360,
        timestamp: '2020-04-26T08:35:00Z',
      },
      {
        point: 61,
        time_frame: 360,
        timestamp: '2020-04-26T08:29:00Z',
      },
      {
        point: 62,
        time_frame: 360,
        timestamp: '2020-04-26T08:23:00Z',
      },
      {
        point: 63,
        time_frame: 360,
        timestamp: '2020-04-26T08:17:00Z',
      },
      {
        point: 64,
        time_frame: 360,
        timestamp: '2020-04-26T08:11:00Z',
      },
      {
        point: 65,
        time_frame: 360,
        timestamp: '2020-04-26T08:05:00Z',
      },
      {
        point: 66,
        time_frame: 360,
        timestamp: '2020-04-26T07:59:00Z',
      },
      {
        point: 67,
        time_frame: 360,
        timestamp: '2020-04-26T07:53:00Z',
      },
      {
        point: 68,
        time_frame: 360,
        timestamp: '2020-04-26T07:47:00Z',
      },
      {
        point: 69,
        time_frame: 360,
        timestamp: '2020-04-26T07:41:00Z',
      },
      {
        point: 70,
        time_frame: 360,
        timestamp: '2020-04-26T07:35:00Z',
      },
      {
        point: 71,
        time_frame: 360,
        timestamp: '2020-04-26T07:29:00Z',
      },
      {
        point: 72,
        time_frame: 360,
        timestamp: '2020-04-26T07:23:00Z',
      },
      {
        point: 73,
        time_frame: 360,
        timestamp: '2020-04-26T07:17:00Z',
      },
      {
        point: 74,
        time_frame: 360,
        timestamp: '2020-04-26T07:11:00Z',
      },
      {
        point: 75,
        time_frame: 360,
        timestamp: '2020-04-26T07:05:00Z',
      },
      {
        point: 76,
        time_frame: 360,
        timestamp: '2020-04-26T06:59:00Z',
      },
      {
        point: 77,
        time_frame: 360,
        timestamp: '2020-04-26T06:53:00Z',
      },
      {
        point: 78,
        time_frame: 360,
        timestamp: '2020-04-26T06:47:00Z',
      },
      {
        point: 79,
        time_frame: 360,
        timestamp: '2020-04-26T06:41:00Z',
      },
      {
        point: 80,
        time_frame: 360,
        timestamp: '2020-04-26T06:35:00Z',
      },
      {
        point: 81,
        time_frame: 360,
        timestamp: '2020-04-26T06:29:00Z',
      },
      {
        point: 82,
        time_frame: 360,
        timestamp: '2020-04-26T06:23:00Z',
      },
      {
        point: 83,
        time_frame: 360,
        timestamp: '2020-04-26T06:17:00Z',
      },
      {
        point: 84,
        time_frame: 360,
        timestamp: '2020-04-26T06:11:00Z',
      },
      {
        point: 85,
        time_frame: 360,
        timestamp: '2020-04-26T06:05:00Z',
      },
      {
        point: 86,
        time_frame: 360,
        timestamp: '2020-04-26T05:59:00Z',
      },
      {
        point: 87,
        time_frame: 360,
        timestamp: '2020-04-26T05:53:00Z',
      },
      {
        point: 88,
        time_frame: 360,
        timestamp: '2020-04-26T05:47:00Z',
      },
      {
        point: 89,
        time_frame: 360,
        timestamp: '2020-04-26T05:41:00Z',
      },
      {
        point: 90,
        time_frame: 360,
        timestamp: '2020-04-26T05:35:00Z',
      },
      {
        point: 91,
        time_frame: 360,
        timestamp: '2020-04-26T05:29:00Z',
      },
      {
        point: 92,
        time_frame: 360,
        timestamp: '2020-04-26T05:23:00Z',
      },
      {
        point: 93,
        time_frame: 360,
        timestamp: '2020-04-26T05:17:00Z',
      },
      {
        point: 94,
        time_frame: 360,
        timestamp: '2020-04-26T05:11:00Z',
      },
      {
        point: 95,
        time_frame: 360,
        timestamp: '2020-04-26T05:05:00Z',
      },
      {
        point: 96,
        time_frame: 360,
        timestamp: '2020-04-26T04:59:00Z',
      },
      {
        point: 97,
        time_frame: 360,
        timestamp: '2020-04-26T04:53:00Z',
      },
      {
        point: 98,
        time_frame: 360,
        timestamp: '2020-04-26T04:47:00Z',
      },
      {
        point: 99,
        time_frame: 360,
        timestamp: '2020-04-26T04:41:00Z',
      },
      {
        point: 100,
        time_frame: 360,
        timestamp: '2020-04-26T04:35:00Z',
      },
      {
        point: 101,
        time_frame: 360,
        timestamp: '2020-04-26T04:29:00Z',
      },
      {
        point: 102,
        time_frame: 360,
        timestamp: '2020-04-26T04:23:00Z',
      },
      {
        point: 103,
        time_frame: 360,
        timestamp: '2020-04-26T04:17:00Z',
      },
      {
        point: 104,
        time_frame: 360,
        timestamp: '2020-04-26T04:11:00Z',
      },
      {
        point: 105,
        time_frame: 360,
        timestamp: '2020-04-26T04:05:00Z',
      },
      {
        point: 106,
        time_frame: 360,
        timestamp: '2020-04-26T03:59:00Z',
      },
      {
        point: 107,
        time_frame: 360,
        timestamp: '2020-04-26T03:53:00Z',
      },
      {
        point: 108,
        time_frame: 360,
        timestamp: '2020-04-26T03:47:00Z',
      },
      {
        point: 109,
        time_frame: 360,
        timestamp: '2020-04-26T03:41:00Z',
      },
      {
        point: 110,
        time_frame: 360,
        timestamp: '2020-04-26T03:35:00Z',
      },
      {
        point: 111,
        time_frame: 360,
        timestamp: '2020-04-26T03:29:00Z',
      },
      {
        point: 112,
        time_frame: 360,
        timestamp: '2020-04-26T03:23:00Z',
      },
      {
        point: 113,
        time_frame: 360,
        timestamp: '2020-04-26T03:17:00Z',
      },
      {
        point: 114,
        time_frame: 360,
        timestamp: '2020-04-26T03:11:00Z',
      },
      {
        point: 115,
        time_frame: 360,
        timestamp: '2020-04-26T03:05:00Z',
      },
      {
        point: 116,
        time_frame: 360,
        timestamp: '2020-04-26T02:59:00Z',
      },
      {
        point: 117,
        time_frame: 360,
        timestamp: '2020-04-26T02:53:00Z',
      },
      {
        point: 118,
        time_frame: 360,
        timestamp: '2020-04-26T02:47:00Z',
      },
      {
        point: 119,
        time_frame: 360,
        timestamp: '2020-04-26T02:41:00Z',
      },
    ],
    metric: {
      rate: 0.71537036,
      cnt: 38,
      sum: 30904,
      avg: 813.2632,
    },
    total: {
      rate: 3.0031712,
      cnt: 29882,
      sum: 129737,
      avg: 4.341644,
    },
    queryCount: 38,
    percentOfTotal: 23.82,
    isRate: true,
    isSum: true,
    isStats: true,
    metricName: 'rows_sent',
  },
  {
    name: 'Rows Examined',
    tooltip: 'Number of rows scanned -SELECT',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
    units: '(per sec)',
    complexMetric: '1.02 sec per row sent',
    sparkline: [
      {
        time_frame: 360,
        timestamp: '2020-04-26T14:35:00Z',
        m_rows_examined_sum_per_sec: 87.60555,
      },
      {
        point: 1,
        time_frame: 360,
        timestamp: '2020-04-26T14:29:00Z',
      },
      {
        point: 2,
        time_frame: 360,
        timestamp: '2020-04-26T14:23:00Z',
      },
      {
        point: 3,
        time_frame: 360,
        timestamp: '2020-04-26T14:17:00Z',
      },
      {
        point: 4,
        time_frame: 360,
        timestamp: '2020-04-26T14:11:00Z',
      },
      {
        point: 5,
        time_frame: 360,
        timestamp: '2020-04-26T14:05:00Z',
      },
      {
        point: 6,
        time_frame: 360,
        timestamp: '2020-04-26T13:59:00Z',
      },
      {
        point: 7,
        time_frame: 360,
        timestamp: '2020-04-26T13:53:00Z',
      },
      {
        point: 8,
        time_frame: 360,
        timestamp: '2020-04-26T13:47:00Z',
      },
      {
        point: 9,
        time_frame: 360,
        timestamp: '2020-04-26T13:41:00Z',
      },
      {
        point: 10,
        time_frame: 360,
        timestamp: '2020-04-26T13:35:00Z',
      },
      {
        point: 11,
        time_frame: 360,
        timestamp: '2020-04-26T13:29:00Z',
      },
      {
        point: 12,
        time_frame: 360,
        timestamp: '2020-04-26T13:23:00Z',
      },
      {
        point: 13,
        time_frame: 360,
        timestamp: '2020-04-26T13:17:00Z',
      },
      {
        point: 14,
        time_frame: 360,
        timestamp: '2020-04-26T13:11:00Z',
      },
      {
        point: 15,
        time_frame: 360,
        timestamp: '2020-04-26T13:05:00Z',
      },
      {
        point: 16,
        time_frame: 360,
        timestamp: '2020-04-26T12:59:00Z',
      },
      {
        point: 17,
        time_frame: 360,
        timestamp: '2020-04-26T12:53:00Z',
      },
      {
        point: 18,
        time_frame: 360,
        timestamp: '2020-04-26T12:47:00Z',
      },
      {
        point: 19,
        time_frame: 360,
        timestamp: '2020-04-26T12:41:00Z',
      },
      {
        point: 20,
        time_frame: 360,
        timestamp: '2020-04-26T12:35:00Z',
      },
      {
        point: 21,
        time_frame: 360,
        timestamp: '2020-04-26T12:29:00Z',
      },
      {
        point: 22,
        time_frame: 360,
        timestamp: '2020-04-26T12:23:00Z',
      },
      {
        point: 23,
        time_frame: 360,
        timestamp: '2020-04-26T12:17:00Z',
      },
      {
        point: 24,
        time_frame: 360,
        timestamp: '2020-04-26T12:11:00Z',
      },
      {
        point: 25,
        time_frame: 360,
        timestamp: '2020-04-26T12:05:00Z',
      },
      {
        point: 26,
        time_frame: 360,
        timestamp: '2020-04-26T11:59:00Z',
      },
      {
        point: 27,
        time_frame: 360,
        timestamp: '2020-04-26T11:53:00Z',
      },
      {
        point: 28,
        time_frame: 360,
        timestamp: '2020-04-26T11:47:00Z',
      },
      {
        point: 29,
        time_frame: 360,
        timestamp: '2020-04-26T11:41:00Z',
      },
      {
        point: 30,
        time_frame: 360,
        timestamp: '2020-04-26T11:35:00Z',
      },
      {
        point: 31,
        time_frame: 360,
        timestamp: '2020-04-26T11:29:00Z',
      },
      {
        point: 32,
        time_frame: 360,
        timestamp: '2020-04-26T11:23:00Z',
      },
      {
        point: 33,
        time_frame: 360,
        timestamp: '2020-04-26T11:17:00Z',
      },
      {
        point: 34,
        time_frame: 360,
        timestamp: '2020-04-26T11:11:00Z',
      },
      {
        point: 35,
        time_frame: 360,
        timestamp: '2020-04-26T11:05:00Z',
      },
      {
        point: 36,
        time_frame: 360,
        timestamp: '2020-04-26T10:59:00Z',
      },
      {
        point: 37,
        time_frame: 360,
        timestamp: '2020-04-26T10:53:00Z',
      },
      {
        point: 38,
        time_frame: 360,
        timestamp: '2020-04-26T10:47:00Z',
      },
      {
        point: 39,
        time_frame: 360,
        timestamp: '2020-04-26T10:41:00Z',
      },
      {
        point: 40,
        time_frame: 360,
        timestamp: '2020-04-26T10:35:00Z',
      },
      {
        point: 41,
        time_frame: 360,
        timestamp: '2020-04-26T10:29:00Z',
      },
      {
        point: 42,
        time_frame: 360,
        timestamp: '2020-04-26T10:23:00Z',
      },
      {
        point: 43,
        time_frame: 360,
        timestamp: '2020-04-26T10:17:00Z',
      },
      {
        point: 44,
        time_frame: 360,
        timestamp: '2020-04-26T10:11:00Z',
      },
      {
        point: 45,
        time_frame: 360,
        timestamp: '2020-04-26T10:05:00Z',
      },
      {
        point: 46,
        time_frame: 360,
        timestamp: '2020-04-26T09:59:00Z',
      },
      {
        point: 47,
        time_frame: 360,
        timestamp: '2020-04-26T09:53:00Z',
      },
      {
        point: 48,
        time_frame: 360,
        timestamp: '2020-04-26T09:47:00Z',
      },
      {
        point: 49,
        time_frame: 360,
        timestamp: '2020-04-26T09:41:00Z',
      },
      {
        point: 50,
        time_frame: 360,
        timestamp: '2020-04-26T09:35:00Z',
      },
      {
        point: 51,
        time_frame: 360,
        timestamp: '2020-04-26T09:29:00Z',
      },
      {
        point: 52,
        time_frame: 360,
        timestamp: '2020-04-26T09:23:00Z',
      },
      {
        point: 53,
        time_frame: 360,
        timestamp: '2020-04-26T09:17:00Z',
      },
      {
        point: 54,
        time_frame: 360,
        timestamp: '2020-04-26T09:11:00Z',
      },
      {
        point: 55,
        time_frame: 360,
        timestamp: '2020-04-26T09:05:00Z',
      },
      {
        point: 56,
        time_frame: 360,
        timestamp: '2020-04-26T08:59:00Z',
      },
      {
        point: 57,
        time_frame: 360,
        timestamp: '2020-04-26T08:53:00Z',
      },
      {
        point: 58,
        time_frame: 360,
        timestamp: '2020-04-26T08:47:00Z',
      },
      {
        point: 59,
        time_frame: 360,
        timestamp: '2020-04-26T08:41:00Z',
      },
      {
        point: 60,
        time_frame: 360,
        timestamp: '2020-04-26T08:35:00Z',
      },
      {
        point: 61,
        time_frame: 360,
        timestamp: '2020-04-26T08:29:00Z',
      },
      {
        point: 62,
        time_frame: 360,
        timestamp: '2020-04-26T08:23:00Z',
      },
      {
        point: 63,
        time_frame: 360,
        timestamp: '2020-04-26T08:17:00Z',
      },
      {
        point: 64,
        time_frame: 360,
        timestamp: '2020-04-26T08:11:00Z',
      },
      {
        point: 65,
        time_frame: 360,
        timestamp: '2020-04-26T08:05:00Z',
      },
      {
        point: 66,
        time_frame: 360,
        timestamp: '2020-04-26T07:59:00Z',
      },
      {
        point: 67,
        time_frame: 360,
        timestamp: '2020-04-26T07:53:00Z',
      },
      {
        point: 68,
        time_frame: 360,
        timestamp: '2020-04-26T07:47:00Z',
      },
      {
        point: 69,
        time_frame: 360,
        timestamp: '2020-04-26T07:41:00Z',
      },
      {
        point: 70,
        time_frame: 360,
        timestamp: '2020-04-26T07:35:00Z',
      },
      {
        point: 71,
        time_frame: 360,
        timestamp: '2020-04-26T07:29:00Z',
      },
      {
        point: 72,
        time_frame: 360,
        timestamp: '2020-04-26T07:23:00Z',
      },
      {
        point: 73,
        time_frame: 360,
        timestamp: '2020-04-26T07:17:00Z',
      },
      {
        point: 74,
        time_frame: 360,
        timestamp: '2020-04-26T07:11:00Z',
      },
      {
        point: 75,
        time_frame: 360,
        timestamp: '2020-04-26T07:05:00Z',
      },
      {
        point: 76,
        time_frame: 360,
        timestamp: '2020-04-26T06:59:00Z',
      },
      {
        point: 77,
        time_frame: 360,
        timestamp: '2020-04-26T06:53:00Z',
      },
      {
        point: 78,
        time_frame: 360,
        timestamp: '2020-04-26T06:47:00Z',
      },
      {
        point: 79,
        time_frame: 360,
        timestamp: '2020-04-26T06:41:00Z',
      },
      {
        point: 80,
        time_frame: 360,
        timestamp: '2020-04-26T06:35:00Z',
      },
      {
        point: 81,
        time_frame: 360,
        timestamp: '2020-04-26T06:29:00Z',
      },
      {
        point: 82,
        time_frame: 360,
        timestamp: '2020-04-26T06:23:00Z',
      },
      {
        point: 83,
        time_frame: 360,
        timestamp: '2020-04-26T06:17:00Z',
      },
      {
        point: 84,
        time_frame: 360,
        timestamp: '2020-04-26T06:11:00Z',
      },
      {
        point: 85,
        time_frame: 360,
        timestamp: '2020-04-26T06:05:00Z',
      },
      {
        point: 86,
        time_frame: 360,
        timestamp: '2020-04-26T05:59:00Z',
      },
      {
        point: 87,
        time_frame: 360,
        timestamp: '2020-04-26T05:53:00Z',
      },
      {
        point: 88,
        time_frame: 360,
        timestamp: '2020-04-26T05:47:00Z',
      },
      {
        point: 89,
        time_frame: 360,
        timestamp: '2020-04-26T05:41:00Z',
      },
      {
        point: 90,
        time_frame: 360,
        timestamp: '2020-04-26T05:35:00Z',
      },
      {
        point: 91,
        time_frame: 360,
        timestamp: '2020-04-26T05:29:00Z',
      },
      {
        point: 92,
        time_frame: 360,
        timestamp: '2020-04-26T05:23:00Z',
      },
      {
        point: 93,
        time_frame: 360,
        timestamp: '2020-04-26T05:17:00Z',
      },
      {
        point: 94,
        time_frame: 360,
        timestamp: '2020-04-26T05:11:00Z',
      },
      {
        point: 95,
        time_frame: 360,
        timestamp: '2020-04-26T05:05:00Z',
      },
      {
        point: 96,
        time_frame: 360,
        timestamp: '2020-04-26T04:59:00Z',
      },
      {
        point: 97,
        time_frame: 360,
        timestamp: '2020-04-26T04:53:00Z',
      },
      {
        point: 98,
        time_frame: 360,
        timestamp: '2020-04-26T04:47:00Z',
      },
      {
        point: 99,
        time_frame: 360,
        timestamp: '2020-04-26T04:41:00Z',
      },
      {
        point: 100,
        time_frame: 360,
        timestamp: '2020-04-26T04:35:00Z',
      },
      {
        point: 101,
        time_frame: 360,
        timestamp: '2020-04-26T04:29:00Z',
      },
      {
        point: 102,
        time_frame: 360,
        timestamp: '2020-04-26T04:23:00Z',
      },
      {
        point: 103,
        time_frame: 360,
        timestamp: '2020-04-26T04:17:00Z',
      },
      {
        point: 104,
        time_frame: 360,
        timestamp: '2020-04-26T04:11:00Z',
      },
      {
        point: 105,
        time_frame: 360,
        timestamp: '2020-04-26T04:05:00Z',
      },
      {
        point: 106,
        time_frame: 360,
        timestamp: '2020-04-26T03:59:00Z',
      },
      {
        point: 107,
        time_frame: 360,
        timestamp: '2020-04-26T03:53:00Z',
      },
      {
        point: 108,
        time_frame: 360,
        timestamp: '2020-04-26T03:47:00Z',
      },
      {
        point: 109,
        time_frame: 360,
        timestamp: '2020-04-26T03:41:00Z',
      },
      {
        point: 110,
        time_frame: 360,
        timestamp: '2020-04-26T03:35:00Z',
      },
      {
        point: 111,
        time_frame: 360,
        timestamp: '2020-04-26T03:29:00Z',
      },
      {
        point: 112,
        time_frame: 360,
        timestamp: '2020-04-26T03:23:00Z',
      },
      {
        point: 113,
        time_frame: 360,
        timestamp: '2020-04-26T03:17:00Z',
      },
      {
        point: 114,
        time_frame: 360,
        timestamp: '2020-04-26T03:11:00Z',
      },
      {
        point: 115,
        time_frame: 360,
        timestamp: '2020-04-26T03:05:00Z',
      },
      {
        point: 116,
        time_frame: 360,
        timestamp: '2020-04-26T02:59:00Z',
      },
      {
        point: 117,
        time_frame: 360,
        timestamp: '2020-04-26T02:53:00Z',
      },
      {
        point: 118,
        time_frame: 360,
        timestamp: '2020-04-26T02:47:00Z',
      },
      {
        point: 119,
        time_frame: 360,
        timestamp: '2020-04-26T02:41:00Z',
      },
    ],
    metric: {
      rate: 0.7300463,
      cnt: 38,
      sum: 31538,
      avg: 829.9474,
    },
    total: {
      rate: 5.608426,
      cnt: 29886,
      sum: 242284,
      avg: 8.106939,
    },
    queryCount: 38,
    percentOfTotal: 13.02,
    isRate: true,
    isSum: true,
    isStats: true,
    metricName: 'rows_examined',
  },
  {
    name: 'No index used',
    tooltip: 'The number of queries without index',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number',
    },
    units: '',
    complexMetric: '',
    sparkline: [
      {
        time_frame: 360,
        timestamp: '2020-04-26T14:35:00Z',
        m_no_index_used_sum_per_sec: 0.10555556,
      },
      {
        point: 1,
        time_frame: 360,
        timestamp: '2020-04-26T14:29:00Z',
      },
      {
        point: 2,
        time_frame: 360,
        timestamp: '2020-04-26T14:23:00Z',
      },
      {
        point: 3,
        time_frame: 360,
        timestamp: '2020-04-26T14:17:00Z',
      },
      {
        point: 4,
        time_frame: 360,
        timestamp: '2020-04-26T14:11:00Z',
      },
      {
        point: 5,
        time_frame: 360,
        timestamp: '2020-04-26T14:05:00Z',
      },
      {
        point: 6,
        time_frame: 360,
        timestamp: '2020-04-26T13:59:00Z',
      },
      {
        point: 7,
        time_frame: 360,
        timestamp: '2020-04-26T13:53:00Z',
      },
      {
        point: 8,
        time_frame: 360,
        timestamp: '2020-04-26T13:47:00Z',
      },
      {
        point: 9,
        time_frame: 360,
        timestamp: '2020-04-26T13:41:00Z',
      },
      {
        point: 10,
        time_frame: 360,
        timestamp: '2020-04-26T13:35:00Z',
      },
      {
        point: 11,
        time_frame: 360,
        timestamp: '2020-04-26T13:29:00Z',
      },
      {
        point: 12,
        time_frame: 360,
        timestamp: '2020-04-26T13:23:00Z',
      },
      {
        point: 13,
        time_frame: 360,
        timestamp: '2020-04-26T13:17:00Z',
      },
      {
        point: 14,
        time_frame: 360,
        timestamp: '2020-04-26T13:11:00Z',
      },
      {
        point: 15,
        time_frame: 360,
        timestamp: '2020-04-26T13:05:00Z',
      },
      {
        point: 16,
        time_frame: 360,
        timestamp: '2020-04-26T12:59:00Z',
      },
      {
        point: 17,
        time_frame: 360,
        timestamp: '2020-04-26T12:53:00Z',
      },
      {
        point: 18,
        time_frame: 360,
        timestamp: '2020-04-26T12:47:00Z',
      },
      {
        point: 19,
        time_frame: 360,
        timestamp: '2020-04-26T12:41:00Z',
      },
      {
        point: 20,
        time_frame: 360,
        timestamp: '2020-04-26T12:35:00Z',
      },
      {
        point: 21,
        time_frame: 360,
        timestamp: '2020-04-26T12:29:00Z',
      },
      {
        point: 22,
        time_frame: 360,
        timestamp: '2020-04-26T12:23:00Z',
      },
      {
        point: 23,
        time_frame: 360,
        timestamp: '2020-04-26T12:17:00Z',
      },
      {
        point: 24,
        time_frame: 360,
        timestamp: '2020-04-26T12:11:00Z',
      },
      {
        point: 25,
        time_frame: 360,
        timestamp: '2020-04-26T12:05:00Z',
      },
      {
        point: 26,
        time_frame: 360,
        timestamp: '2020-04-26T11:59:00Z',
      },
      {
        point: 27,
        time_frame: 360,
        timestamp: '2020-04-26T11:53:00Z',
      },
      {
        point: 28,
        time_frame: 360,
        timestamp: '2020-04-26T11:47:00Z',
      },
      {
        point: 29,
        time_frame: 360,
        timestamp: '2020-04-26T11:41:00Z',
      },
      {
        point: 30,
        time_frame: 360,
        timestamp: '2020-04-26T11:35:00Z',
      },
      {
        point: 31,
        time_frame: 360,
        timestamp: '2020-04-26T11:29:00Z',
      },
      {
        point: 32,
        time_frame: 360,
        timestamp: '2020-04-26T11:23:00Z',
      },
      {
        point: 33,
        time_frame: 360,
        timestamp: '2020-04-26T11:17:00Z',
      },
      {
        point: 34,
        time_frame: 360,
        timestamp: '2020-04-26T11:11:00Z',
      },
      {
        point: 35,
        time_frame: 360,
        timestamp: '2020-04-26T11:05:00Z',
      },
      {
        point: 36,
        time_frame: 360,
        timestamp: '2020-04-26T10:59:00Z',
      },
      {
        point: 37,
        time_frame: 360,
        timestamp: '2020-04-26T10:53:00Z',
      },
      {
        point: 38,
        time_frame: 360,
        timestamp: '2020-04-26T10:47:00Z',
      },
      {
        point: 39,
        time_frame: 360,
        timestamp: '2020-04-26T10:41:00Z',
      },
      {
        point: 40,
        time_frame: 360,
        timestamp: '2020-04-26T10:35:00Z',
      },
      {
        point: 41,
        time_frame: 360,
        timestamp: '2020-04-26T10:29:00Z',
      },
      {
        point: 42,
        time_frame: 360,
        timestamp: '2020-04-26T10:23:00Z',
      },
      {
        point: 43,
        time_frame: 360,
        timestamp: '2020-04-26T10:17:00Z',
      },
      {
        point: 44,
        time_frame: 360,
        timestamp: '2020-04-26T10:11:00Z',
      },
      {
        point: 45,
        time_frame: 360,
        timestamp: '2020-04-26T10:05:00Z',
      },
      {
        point: 46,
        time_frame: 360,
        timestamp: '2020-04-26T09:59:00Z',
      },
      {
        point: 47,
        time_frame: 360,
        timestamp: '2020-04-26T09:53:00Z',
      },
      {
        point: 48,
        time_frame: 360,
        timestamp: '2020-04-26T09:47:00Z',
      },
      {
        point: 49,
        time_frame: 360,
        timestamp: '2020-04-26T09:41:00Z',
      },
      {
        point: 50,
        time_frame: 360,
        timestamp: '2020-04-26T09:35:00Z',
      },
      {
        point: 51,
        time_frame: 360,
        timestamp: '2020-04-26T09:29:00Z',
      },
      {
        point: 52,
        time_frame: 360,
        timestamp: '2020-04-26T09:23:00Z',
      },
      {
        point: 53,
        time_frame: 360,
        timestamp: '2020-04-26T09:17:00Z',
      },
      {
        point: 54,
        time_frame: 360,
        timestamp: '2020-04-26T09:11:00Z',
      },
      {
        point: 55,
        time_frame: 360,
        timestamp: '2020-04-26T09:05:00Z',
      },
      {
        point: 56,
        time_frame: 360,
        timestamp: '2020-04-26T08:59:00Z',
      },
      {
        point: 57,
        time_frame: 360,
        timestamp: '2020-04-26T08:53:00Z',
      },
      {
        point: 58,
        time_frame: 360,
        timestamp: '2020-04-26T08:47:00Z',
      },
      {
        point: 59,
        time_frame: 360,
        timestamp: '2020-04-26T08:41:00Z',
      },
      {
        point: 60,
        time_frame: 360,
        timestamp: '2020-04-26T08:35:00Z',
      },
      {
        point: 61,
        time_frame: 360,
        timestamp: '2020-04-26T08:29:00Z',
      },
      {
        point: 62,
        time_frame: 360,
        timestamp: '2020-04-26T08:23:00Z',
      },
      {
        point: 63,
        time_frame: 360,
        timestamp: '2020-04-26T08:17:00Z',
      },
      {
        point: 64,
        time_frame: 360,
        timestamp: '2020-04-26T08:11:00Z',
      },
      {
        point: 65,
        time_frame: 360,
        timestamp: '2020-04-26T08:05:00Z',
      },
      {
        point: 66,
        time_frame: 360,
        timestamp: '2020-04-26T07:59:00Z',
      },
      {
        point: 67,
        time_frame: 360,
        timestamp: '2020-04-26T07:53:00Z',
      },
      {
        point: 68,
        time_frame: 360,
        timestamp: '2020-04-26T07:47:00Z',
      },
      {
        point: 69,
        time_frame: 360,
        timestamp: '2020-04-26T07:41:00Z',
      },
      {
        point: 70,
        time_frame: 360,
        timestamp: '2020-04-26T07:35:00Z',
      },
      {
        point: 71,
        time_frame: 360,
        timestamp: '2020-04-26T07:29:00Z',
      },
      {
        point: 72,
        time_frame: 360,
        timestamp: '2020-04-26T07:23:00Z',
      },
      {
        point: 73,
        time_frame: 360,
        timestamp: '2020-04-26T07:17:00Z',
      },
      {
        point: 74,
        time_frame: 360,
        timestamp: '2020-04-26T07:11:00Z',
      },
      {
        point: 75,
        time_frame: 360,
        timestamp: '2020-04-26T07:05:00Z',
      },
      {
        point: 76,
        time_frame: 360,
        timestamp: '2020-04-26T06:59:00Z',
      },
      {
        point: 77,
        time_frame: 360,
        timestamp: '2020-04-26T06:53:00Z',
      },
      {
        point: 78,
        time_frame: 360,
        timestamp: '2020-04-26T06:47:00Z',
      },
      {
        point: 79,
        time_frame: 360,
        timestamp: '2020-04-26T06:41:00Z',
      },
      {
        point: 80,
        time_frame: 360,
        timestamp: '2020-04-26T06:35:00Z',
      },
      {
        point: 81,
        time_frame: 360,
        timestamp: '2020-04-26T06:29:00Z',
      },
      {
        point: 82,
        time_frame: 360,
        timestamp: '2020-04-26T06:23:00Z',
      },
      {
        point: 83,
        time_frame: 360,
        timestamp: '2020-04-26T06:17:00Z',
      },
      {
        point: 84,
        time_frame: 360,
        timestamp: '2020-04-26T06:11:00Z',
      },
      {
        point: 85,
        time_frame: 360,
        timestamp: '2020-04-26T06:05:00Z',
      },
      {
        point: 86,
        time_frame: 360,
        timestamp: '2020-04-26T05:59:00Z',
      },
      {
        point: 87,
        time_frame: 360,
        timestamp: '2020-04-26T05:53:00Z',
      },
      {
        point: 88,
        time_frame: 360,
        timestamp: '2020-04-26T05:47:00Z',
      },
      {
        point: 89,
        time_frame: 360,
        timestamp: '2020-04-26T05:41:00Z',
      },
      {
        point: 90,
        time_frame: 360,
        timestamp: '2020-04-26T05:35:00Z',
      },
      {
        point: 91,
        time_frame: 360,
        timestamp: '2020-04-26T05:29:00Z',
      },
      {
        point: 92,
        time_frame: 360,
        timestamp: '2020-04-26T05:23:00Z',
      },
      {
        point: 93,
        time_frame: 360,
        timestamp: '2020-04-26T05:17:00Z',
      },
      {
        point: 94,
        time_frame: 360,
        timestamp: '2020-04-26T05:11:00Z',
      },
      {
        point: 95,
        time_frame: 360,
        timestamp: '2020-04-26T05:05:00Z',
      },
      {
        point: 96,
        time_frame: 360,
        timestamp: '2020-04-26T04:59:00Z',
      },
      {
        point: 97,
        time_frame: 360,
        timestamp: '2020-04-26T04:53:00Z',
      },
      {
        point: 98,
        time_frame: 360,
        timestamp: '2020-04-26T04:47:00Z',
      },
      {
        point: 99,
        time_frame: 360,
        timestamp: '2020-04-26T04:41:00Z',
      },
      {
        point: 100,
        time_frame: 360,
        timestamp: '2020-04-26T04:35:00Z',
      },
      {
        point: 101,
        time_frame: 360,
        timestamp: '2020-04-26T04:29:00Z',
      },
      {
        point: 102,
        time_frame: 360,
        timestamp: '2020-04-26T04:23:00Z',
      },
      {
        point: 103,
        time_frame: 360,
        timestamp: '2020-04-26T04:17:00Z',
      },
      {
        point: 104,
        time_frame: 360,
        timestamp: '2020-04-26T04:11:00Z',
      },
      {
        point: 105,
        time_frame: 360,
        timestamp: '2020-04-26T04:05:00Z',
      },
      {
        point: 106,
        time_frame: 360,
        timestamp: '2020-04-26T03:59:00Z',
      },
      {
        point: 107,
        time_frame: 360,
        timestamp: '2020-04-26T03:53:00Z',
      },
      {
        point: 108,
        time_frame: 360,
        timestamp: '2020-04-26T03:47:00Z',
      },
      {
        point: 109,
        time_frame: 360,
        timestamp: '2020-04-26T03:41:00Z',
      },
      {
        point: 110,
        time_frame: 360,
        timestamp: '2020-04-26T03:35:00Z',
      },
      {
        point: 111,
        time_frame: 360,
        timestamp: '2020-04-26T03:29:00Z',
      },
      {
        point: 112,
        time_frame: 360,
        timestamp: '2020-04-26T03:23:00Z',
      },
      {
        point: 113,
        time_frame: 360,
        timestamp: '2020-04-26T03:17:00Z',
      },
      {
        point: 114,
        time_frame: 360,
        timestamp: '2020-04-26T03:11:00Z',
      },
      {
        point: 115,
        time_frame: 360,
        timestamp: '2020-04-26T03:05:00Z',
      },
      {
        point: 116,
        time_frame: 360,
        timestamp: '2020-04-26T02:59:00Z',
      },
      {
        point: 117,
        time_frame: 360,
        timestamp: '2020-04-26T02:53:00Z',
      },
      {
        point: 118,
        time_frame: 360,
        timestamp: '2020-04-26T02:47:00Z',
      },
      {
        point: 119,
        time_frame: 360,
        timestamp: '2020-04-26T02:41:00Z',
      },
    ],
    metric: {
      rate: 0.00087962963,
      sum: 38,
    },
    total: {
      rate: 0.012337963,
      sum: 533,
    },
    queryCount: 38,
    percentOfTotal: 7.13,
    isRate: true,
    isSum: true,
    isStats: false,
    metricName: 'no_index_used',
  },
  {
    name: 'Full Scan',
    tooltip: 'The query performed a full table scan',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: '',
    },
    units: '',
    complexMetric: '1000.00 ms per query',
    sparkline: [
      {
        time_frame: 360,
        timestamp: '2020-04-26T14:35:00Z',
        m_full_scan_sum_per_sec: 0.10555556,
      },
      {
        point: 1,
        time_frame: 360,
        timestamp: '2020-04-26T14:29:00Z',
      },
      {
        point: 2,
        time_frame: 360,
        timestamp: '2020-04-26T14:23:00Z',
      },
      {
        point: 3,
        time_frame: 360,
        timestamp: '2020-04-26T14:17:00Z',
      },
      {
        point: 4,
        time_frame: 360,
        timestamp: '2020-04-26T14:11:00Z',
      },
      {
        point: 5,
        time_frame: 360,
        timestamp: '2020-04-26T14:05:00Z',
      },
      {
        point: 6,
        time_frame: 360,
        timestamp: '2020-04-26T13:59:00Z',
      },
      {
        point: 7,
        time_frame: 360,
        timestamp: '2020-04-26T13:53:00Z',
      },
      {
        point: 8,
        time_frame: 360,
        timestamp: '2020-04-26T13:47:00Z',
      },
      {
        point: 9,
        time_frame: 360,
        timestamp: '2020-04-26T13:41:00Z',
      },
      {
        point: 10,
        time_frame: 360,
        timestamp: '2020-04-26T13:35:00Z',
      },
      {
        point: 11,
        time_frame: 360,
        timestamp: '2020-04-26T13:29:00Z',
      },
      {
        point: 12,
        time_frame: 360,
        timestamp: '2020-04-26T13:23:00Z',
      },
      {
        point: 13,
        time_frame: 360,
        timestamp: '2020-04-26T13:17:00Z',
      },
      {
        point: 14,
        time_frame: 360,
        timestamp: '2020-04-26T13:11:00Z',
      },
      {
        point: 15,
        time_frame: 360,
        timestamp: '2020-04-26T13:05:00Z',
      },
      {
        point: 16,
        time_frame: 360,
        timestamp: '2020-04-26T12:59:00Z',
      },
      {
        point: 17,
        time_frame: 360,
        timestamp: '2020-04-26T12:53:00Z',
      },
      {
        point: 18,
        time_frame: 360,
        timestamp: '2020-04-26T12:47:00Z',
      },
      {
        point: 19,
        time_frame: 360,
        timestamp: '2020-04-26T12:41:00Z',
      },
      {
        point: 20,
        time_frame: 360,
        timestamp: '2020-04-26T12:35:00Z',
      },
      {
        point: 21,
        time_frame: 360,
        timestamp: '2020-04-26T12:29:00Z',
      },
      {
        point: 22,
        time_frame: 360,
        timestamp: '2020-04-26T12:23:00Z',
      },
      {
        point: 23,
        time_frame: 360,
        timestamp: '2020-04-26T12:17:00Z',
      },
      {
        point: 24,
        time_frame: 360,
        timestamp: '2020-04-26T12:11:00Z',
      },
      {
        point: 25,
        time_frame: 360,
        timestamp: '2020-04-26T12:05:00Z',
      },
      {
        point: 26,
        time_frame: 360,
        timestamp: '2020-04-26T11:59:00Z',
      },
      {
        point: 27,
        time_frame: 360,
        timestamp: '2020-04-26T11:53:00Z',
      },
      {
        point: 28,
        time_frame: 360,
        timestamp: '2020-04-26T11:47:00Z',
      },
      {
        point: 29,
        time_frame: 360,
        timestamp: '2020-04-26T11:41:00Z',
      },
      {
        point: 30,
        time_frame: 360,
        timestamp: '2020-04-26T11:35:00Z',
      },
      {
        point: 31,
        time_frame: 360,
        timestamp: '2020-04-26T11:29:00Z',
      },
      {
        point: 32,
        time_frame: 360,
        timestamp: '2020-04-26T11:23:00Z',
      },
      {
        point: 33,
        time_frame: 360,
        timestamp: '2020-04-26T11:17:00Z',
      },
      {
        point: 34,
        time_frame: 360,
        timestamp: '2020-04-26T11:11:00Z',
      },
      {
        point: 35,
        time_frame: 360,
        timestamp: '2020-04-26T11:05:00Z',
      },
      {
        point: 36,
        time_frame: 360,
        timestamp: '2020-04-26T10:59:00Z',
      },
      {
        point: 37,
        time_frame: 360,
        timestamp: '2020-04-26T10:53:00Z',
      },
      {
        point: 38,
        time_frame: 360,
        timestamp: '2020-04-26T10:47:00Z',
      },
      {
        point: 39,
        time_frame: 360,
        timestamp: '2020-04-26T10:41:00Z',
      },
      {
        point: 40,
        time_frame: 360,
        timestamp: '2020-04-26T10:35:00Z',
      },
      {
        point: 41,
        time_frame: 360,
        timestamp: '2020-04-26T10:29:00Z',
      },
      {
        point: 42,
        time_frame: 360,
        timestamp: '2020-04-26T10:23:00Z',
      },
      {
        point: 43,
        time_frame: 360,
        timestamp: '2020-04-26T10:17:00Z',
      },
      {
        point: 44,
        time_frame: 360,
        timestamp: '2020-04-26T10:11:00Z',
      },
      {
        point: 45,
        time_frame: 360,
        timestamp: '2020-04-26T10:05:00Z',
      },
      {
        point: 46,
        time_frame: 360,
        timestamp: '2020-04-26T09:59:00Z',
      },
      {
        point: 47,
        time_frame: 360,
        timestamp: '2020-04-26T09:53:00Z',
      },
      {
        point: 48,
        time_frame: 360,
        timestamp: '2020-04-26T09:47:00Z',
      },
      {
        point: 49,
        time_frame: 360,
        timestamp: '2020-04-26T09:41:00Z',
      },
      {
        point: 50,
        time_frame: 360,
        timestamp: '2020-04-26T09:35:00Z',
      },
      {
        point: 51,
        time_frame: 360,
        timestamp: '2020-04-26T09:29:00Z',
      },
      {
        point: 52,
        time_frame: 360,
        timestamp: '2020-04-26T09:23:00Z',
      },
      {
        point: 53,
        time_frame: 360,
        timestamp: '2020-04-26T09:17:00Z',
      },
      {
        point: 54,
        time_frame: 360,
        timestamp: '2020-04-26T09:11:00Z',
      },
      {
        point: 55,
        time_frame: 360,
        timestamp: '2020-04-26T09:05:00Z',
      },
      {
        point: 56,
        time_frame: 360,
        timestamp: '2020-04-26T08:59:00Z',
      },
      {
        point: 57,
        time_frame: 360,
        timestamp: '2020-04-26T08:53:00Z',
      },
      {
        point: 58,
        time_frame: 360,
        timestamp: '2020-04-26T08:47:00Z',
      },
      {
        point: 59,
        time_frame: 360,
        timestamp: '2020-04-26T08:41:00Z',
      },
      {
        point: 60,
        time_frame: 360,
        timestamp: '2020-04-26T08:35:00Z',
      },
      {
        point: 61,
        time_frame: 360,
        timestamp: '2020-04-26T08:29:00Z',
      },
      {
        point: 62,
        time_frame: 360,
        timestamp: '2020-04-26T08:23:00Z',
      },
      {
        point: 63,
        time_frame: 360,
        timestamp: '2020-04-26T08:17:00Z',
      },
      {
        point: 64,
        time_frame: 360,
        timestamp: '2020-04-26T08:11:00Z',
      },
      {
        point: 65,
        time_frame: 360,
        timestamp: '2020-04-26T08:05:00Z',
      },
      {
        point: 66,
        time_frame: 360,
        timestamp: '2020-04-26T07:59:00Z',
      },
      {
        point: 67,
        time_frame: 360,
        timestamp: '2020-04-26T07:53:00Z',
      },
      {
        point: 68,
        time_frame: 360,
        timestamp: '2020-04-26T07:47:00Z',
      },
      {
        point: 69,
        time_frame: 360,
        timestamp: '2020-04-26T07:41:00Z',
      },
      {
        point: 70,
        time_frame: 360,
        timestamp: '2020-04-26T07:35:00Z',
      },
      {
        point: 71,
        time_frame: 360,
        timestamp: '2020-04-26T07:29:00Z',
      },
      {
        point: 72,
        time_frame: 360,
        timestamp: '2020-04-26T07:23:00Z',
      },
      {
        point: 73,
        time_frame: 360,
        timestamp: '2020-04-26T07:17:00Z',
      },
      {
        point: 74,
        time_frame: 360,
        timestamp: '2020-04-26T07:11:00Z',
      },
      {
        point: 75,
        time_frame: 360,
        timestamp: '2020-04-26T07:05:00Z',
      },
      {
        point: 76,
        time_frame: 360,
        timestamp: '2020-04-26T06:59:00Z',
      },
      {
        point: 77,
        time_frame: 360,
        timestamp: '2020-04-26T06:53:00Z',
      },
      {
        point: 78,
        time_frame: 360,
        timestamp: '2020-04-26T06:47:00Z',
      },
      {
        point: 79,
        time_frame: 360,
        timestamp: '2020-04-26T06:41:00Z',
      },
      {
        point: 80,
        time_frame: 360,
        timestamp: '2020-04-26T06:35:00Z',
      },
      {
        point: 81,
        time_frame: 360,
        timestamp: '2020-04-26T06:29:00Z',
      },
      {
        point: 82,
        time_frame: 360,
        timestamp: '2020-04-26T06:23:00Z',
      },
      {
        point: 83,
        time_frame: 360,
        timestamp: '2020-04-26T06:17:00Z',
      },
      {
        point: 84,
        time_frame: 360,
        timestamp: '2020-04-26T06:11:00Z',
      },
      {
        point: 85,
        time_frame: 360,
        timestamp: '2020-04-26T06:05:00Z',
      },
      {
        point: 86,
        time_frame: 360,
        timestamp: '2020-04-26T05:59:00Z',
      },
      {
        point: 87,
        time_frame: 360,
        timestamp: '2020-04-26T05:53:00Z',
      },
      {
        point: 88,
        time_frame: 360,
        timestamp: '2020-04-26T05:47:00Z',
      },
      {
        point: 89,
        time_frame: 360,
        timestamp: '2020-04-26T05:41:00Z',
      },
      {
        point: 90,
        time_frame: 360,
        timestamp: '2020-04-26T05:35:00Z',
      },
      {
        point: 91,
        time_frame: 360,
        timestamp: '2020-04-26T05:29:00Z',
      },
      {
        point: 92,
        time_frame: 360,
        timestamp: '2020-04-26T05:23:00Z',
      },
      {
        point: 93,
        time_frame: 360,
        timestamp: '2020-04-26T05:17:00Z',
      },
      {
        point: 94,
        time_frame: 360,
        timestamp: '2020-04-26T05:11:00Z',
      },
      {
        point: 95,
        time_frame: 360,
        timestamp: '2020-04-26T05:05:00Z',
      },
      {
        point: 96,
        time_frame: 360,
        timestamp: '2020-04-26T04:59:00Z',
      },
      {
        point: 97,
        time_frame: 360,
        timestamp: '2020-04-26T04:53:00Z',
      },
      {
        point: 98,
        time_frame: 360,
        timestamp: '2020-04-26T04:47:00Z',
      },
      {
        point: 99,
        time_frame: 360,
        timestamp: '2020-04-26T04:41:00Z',
      },
      {
        point: 100,
        time_frame: 360,
        timestamp: '2020-04-26T04:35:00Z',
      },
      {
        point: 101,
        time_frame: 360,
        timestamp: '2020-04-26T04:29:00Z',
      },
      {
        point: 102,
        time_frame: 360,
        timestamp: '2020-04-26T04:23:00Z',
      },
      {
        point: 103,
        time_frame: 360,
        timestamp: '2020-04-26T04:17:00Z',
      },
      {
        point: 104,
        time_frame: 360,
        timestamp: '2020-04-26T04:11:00Z',
      },
      {
        point: 105,
        time_frame: 360,
        timestamp: '2020-04-26T04:05:00Z',
      },
      {
        point: 106,
        time_frame: 360,
        timestamp: '2020-04-26T03:59:00Z',
      },
      {
        point: 107,
        time_frame: 360,
        timestamp: '2020-04-26T03:53:00Z',
      },
      {
        point: 108,
        time_frame: 360,
        timestamp: '2020-04-26T03:47:00Z',
      },
      {
        point: 109,
        time_frame: 360,
        timestamp: '2020-04-26T03:41:00Z',
      },
      {
        point: 110,
        time_frame: 360,
        timestamp: '2020-04-26T03:35:00Z',
      },
      {
        point: 111,
        time_frame: 360,
        timestamp: '2020-04-26T03:29:00Z',
      },
      {
        point: 112,
        time_frame: 360,
        timestamp: '2020-04-26T03:23:00Z',
      },
      {
        point: 113,
        time_frame: 360,
        timestamp: '2020-04-26T03:17:00Z',
      },
      {
        point: 114,
        time_frame: 360,
        timestamp: '2020-04-26T03:11:00Z',
      },
      {
        point: 115,
        time_frame: 360,
        timestamp: '2020-04-26T03:05:00Z',
      },
      {
        point: 116,
        time_frame: 360,
        timestamp: '2020-04-26T02:59:00Z',
      },
      {
        point: 117,
        time_frame: 360,
        timestamp: '2020-04-26T02:53:00Z',
      },
      {
        point: 118,
        time_frame: 360,
        timestamp: '2020-04-26T02:47:00Z',
      },
      {
        point: 119,
        time_frame: 360,
        timestamp: '2020-04-26T02:41:00Z',
      },
    ],
    metric: {
      rate: 0.00087962963,
      sum: 38,
    },
    total: {
      rate: 0.016550926,
      sum: 715,
    },
    queryCount: 38,
    percentOfTotal: 5.31,
    isRate: true,
    isSum: true,
    isStats: false,
    metricName: 'full_scan',
  },
];

describe('TimeDistributionChart chart test', () => {
  xit('getMetricDistribution metrics summ equal 100%', () => {
    const TimeDistributionChartProps = {
      data: MOCK_METRICS,
    };

    const dataDistribution = getMetricDistribution(TimeDistributionChartProps.data);

    const sum = dataDistribution.reduce((acc, metric) => {
      // eslint-disable-next-line no-param-reassign
      acc += metric.value;

      return acc;
    }, 0);

    expect(sum).toEqual(100);
  });

  it('Renders correct', () => {
    const TimeDistributionChartProps = {
      data: MOCK_METRICS,
    };
    const root = shallow(<TimeDistribution {...TimeDistributionChartProps} />);

    expect(root).toMatchSnapshot();
  });
});
