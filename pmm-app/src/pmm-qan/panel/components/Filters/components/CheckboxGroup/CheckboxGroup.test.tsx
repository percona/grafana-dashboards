import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'react-final-form';
import { CheckboxGroup } from './CheckboxGroup';

const ITEMS_LIST = [
  {
    value: 'postgresql',
    main_metric_percent: 1,
    main_metric_per_sec: 0.00022020953,
    checked: false,
  },
  {
    value: 'mysql',
    main_metric_percent: 1,
    main_metric_per_sec: 0.00022020953,
    checked: true,
  },
  {
    value: 'test3',
    main_metric_percent: 1,
    main_metric_per_sec: 0.00022020953,
    checked: false,
  },
  {
    value: 'test4',
    main_metric_percent: 1,
    main_metric_per_sec: 0.00022020953,
    checked: false,
  },
  {
    value: 'test5',
    main_metric_percent: 1,
    main_metric_per_sec: 0.00022020953,
    checked: false,
  },
  {
    value: '',
    main_metric_percent: 1,
    main_metric_per_sec: 0.00022020953,
    checked: false,
  },
];

const rawTime = {
  from: 'now-12h',
  to: 'now',
};

describe('CheckboxGroup ::', () => {
  it('should render correct without filter', async () => {
    const root = mount(
      <Form
        onSubmit={jest.fn()}
        render={() => (
          <CheckboxGroup
            key="Service Type"
            name="Service Type"
            items={ITEMS_LIST.slice(0, 2)}
            group="service_type"
            showAll
            filter=""
            getDashboardURL={jest.fn()}
            rawTime={rawTime}
          />
        )}
      />,
    );

    expect(root.find('[data-testid="filter-checkbox-postgresql"]').length).toEqual(1);
    expect(root.find('[data-testid="filter-checkbox-mysql"]').length).toEqual(1);
    expect(root.find('[data-testid="checkbox-group-header"]').length).toEqual(1);
    expect(root.find('[data-testid="show-top-switcher"]').length).toEqual(0);
  });

  it('should render correct with partially matching filter', async () => {
    const root = mount(
      <Form
        onSubmit={jest.fn()}
        render={() => (
          <CheckboxGroup
            key="Service Type"
            name="Service Type"
            items={ITEMS_LIST.slice(0, 2)}
            group="service_type"
            showAll
            filter="postgre"
            getDashboardURL={jest.fn()}
            rawTime={rawTime}
          />
        )}
      />,
    );

    expect(root.find('[data-testid="filter-checkbox-postgresql"]').length).toEqual(1);
    expect(root.find('[data-testid="filter-checkbox-mysql"]').length).toEqual(0);
    expect(root.find('[data-testid="checkbox-group-header"]').length).toEqual(1);
    expect(root.find('[data-testid="show-top-switcher"]').length).toEqual(0);
  });

  it('should render empty component with not matching filter', async () => {
    const root = mount(
      <Form
        onSubmit={jest.fn()}
        render={() => (
          <CheckboxGroup
            key="Service Type"
            name="Service Type"
            items={ITEMS_LIST.slice(0, 2)}
            group="service_type"
            showAll
            filter="test"
            getDashboardURL={jest.fn()}
            rawTime={rawTime}
          />
        )}
      />,
    );

    expect(root.find('[data-testid="filter-checkbox-postgresql"]').length).toEqual(0);
    expect(root.find('[data-testid="filter-checkbox-mysql"]').length).toEqual(0);
    expect(root.find('[data-testid="checkbox-group-header"]').length).toEqual(0);
    expect(root.find('[data-testid="show-top-switcher"]').length).toEqual(0);
  });

  it('should render only checked with showAll set to false', async () => {
    const root = mount(
      <Form
        onSubmit={jest.fn()}
        render={() => (
          <CheckboxGroup
            key="Service Type"
            name="Service Type"
            items={ITEMS_LIST.slice(0, 2)}
            group="service_type"
            showAll={false}
            filter=""
            getDashboardURL={jest.fn()}
            rawTime={rawTime}
          />
        )}
      />,
    );

    expect(root.find('[data-testid="filter-checkbox-postgresql"]').length).toEqual(0);
    expect(root.find('[data-testid="filter-checkbox-mysql"]').length).toEqual(1);
    expect(root.find('[data-testid="checkbox-group-header"]').length).toEqual(1);
    expect(root.find('[data-testid="show-top-switcher"]').length).toEqual(0);
  });

  it('should render top 5 switcher correct', async () => {
    const root = mount(
      <Form
        onSubmit={jest.fn()}
        render={() => (
          <CheckboxGroup
            key="Service Type"
            name="Service Type"
            items={ITEMS_LIST}
            group="service_type"
            showAll
            filter=""
            getDashboardURL={jest.fn()}
            rawTime={rawTime}
          />
        )}
      />,
    );

    const showTopSwitcher = root.find('[data-testid="show-top-switcher"]');

    expect(showTopSwitcher.length).toEqual(1);
    expect(root.find('[data-testid^="filter-checkbox"]').length).toEqual(5);

    expect(showTopSwitcher.text()).toBe(`Show all (${ITEMS_LIST.length})`);
    showTopSwitcher.simulate('click');
    expect(showTopSwitcher.text()).toBe('Show top 5');

    expect(root.find('[data-testid^="filter-checkbox"]').length).toEqual(ITEMS_LIST.length);
  });
});
