// Just a stub test
import { Filters, FILTERS_GROUPS } from './Filters';
import React from 'react';
import renderer from 'react-test-renderer';
import { useForm } from 'react-final-form-hooks';
import { renderHook } from '@testing-library/react-hooks';
jest.mock('antd/es/input/Search', () => () => {
  return <></>;
});

jest.mock('../../../react-plugins-deps/components/helpers/notification-manager', () => () => ({}));

const MOCK_FILTERS = {
  az: {
    name: [
      {
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  client_host: {
    name: [
      {
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  cluster: {
    name: [
      {
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  container_id: {
    name: [
      {
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  container_name: {
    name: [
      {
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  database: {
    name: [
      {
        value: 'postgres',
        main_metric_percent: 0.99822205,
        main_metric_per_sec: 0.0028915745,
        checked: false,
      },
      {
        value: 'pmm-managed',
        main_metric_percent: 0.001778005,
        main_metric_per_sec: 0.000005150391,
        checked: true,
      },
    ],
  },
  environment: {
    name: [
      {
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  machine_id: {
    name: [
      {
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  node_id: {
    name: [
      {
        value: 'pmm-server',
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  node_model: {
    name: [
      {
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  node_name: {
    name: [
      {
        value: 'pmm-server',
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  node_type: {
    name: [
      {
        value: 'generic',
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  region: {
    name: [
      {
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  replication_set: {
    name: [
      {
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  schema: {
    name: [
      {
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  service_id: {
    name: [
      {
        value: '/service_id/1b879be7-cf43-487a-82f0-09143f8d914b',
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  service_name: {
    name: [
      {
        value: 'pmm-server-postgresql',
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  service_type: {
    name: [
      {
        value: 'postgresql',
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
  username: {
    name: [
      {
        value: 'pmm-managed',
        main_metric_percent: 1,
        main_metric_per_sec: 0.000005150391,
      },
    ],
  },
};
describe('Filters test', () => {
  it('Renders correct with right props', () => {
    const { result } = renderHook(() => {
      return useForm({
        onSubmit: values => {
          console.log(values);
        },
      });
    });

    const component = renderer.create(
      <Filters groups={FILTERS_GROUPS} filters={MOCK_FILTERS} labels={{}} dispatch={() => {}} form={result.current.form} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
