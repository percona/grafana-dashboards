import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Humanize } from '../../../react-plugins-deps/components/helpers/Humanize';
import './Filters.scss';
import { Divider } from 'antd';
import { ManagementContext, StateContext } from '../StateContext';
import FiltersService from './Filters.service';
import { CheckboxField } from '../../../react-plugins-deps/components/FormComponents/Checkbox/Checkbox';
import { useForm } from 'react-final-form-hooks';
import { Form as FormFinal } from 'react-final-form';
import Search from 'antd/es/input/Search';
import set = Reflect.set;
const humanize = new Humanize();

const checkboxGroup = (form, name, items, group, showAll, filter, labels) => {
  console.log('inside again', labels, group)
  const itemsList = items
    .filter(item => item.value)
    .filter(item => {
      if (!showAll) {
        return item.checked;
      }
      return true;
    })
    .filter(item => item.value.toLowerCase().includes(filter.toLowerCase()))
    .map(item => {
      return (
        <div className={'filter-label'}>
          <span className={'filter-name'}>
            <CheckboxField
              form={form}
              name={`${group}:${item.value}`}
              label={item.value}
              checked={labels && labels[group] && labels[group].includes(item.value)}
            />
          </span>
          <span className={'percentage'}>
            <span>{humanize.transform(item.main_metric_percent, 'percent')}</span>
          </span>
        </div>
      );
    });
  return itemsList.length ? (
    <div>
      <Divider>{name}</Divider>
      {itemsList}
    </div>
  ) : null;
};

const checkboxGroups = [
  {
    name: 'Environment',
    dataKey: 'environment',
  },
  {
    name: 'Cluster',
    dataKey: 'cluster',
  },
  {
    name: 'Replication Set',
    dataKey: 'replication_set',
  },
  {
    name: 'Database',
    dataKey: 'database',
  },
  {
    name: 'Schema',
    dataKey: 'schema',
  },
  {
    name: 'Node Name',
    dataKey: 'node_name',
  },
  {
    name: 'Service Name',
    dataKey: 'service_name',
  },
  {
    name: 'Client Host',
    dataKey: 'client_host',
  },
  {
    name: 'User Name',
    dataKey: 'username',
  },
  {
    name: 'Service Type',
    dataKey: 'service_type',
  },
  {
    name: 'Node Type',
    dataKey: 'node_type',
  },
  {
    name: 'City',
    dataKey: 'city',
  },
  {
    name: 'Availability Zone',
    dataKey: 'az',
  },
];

const Filters = () => {
  const [showAll, showSetAll] = useState(true);
  const [filter, setFilter] = useState('');
  const context = useContext(StateContext);
  console.log(context);
  const filters = FiltersService.getQueryOverviewFiltersList(context.state.labels || {});

  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: filters => {
            console.log('submitting');
          },
          validate: filters => {
            // TODO: temp solution, need to figure out why handleSubmit works wrong
            console.log('set labels called');
            // context.setLabels(filters);
            // context.dispatch({
            //   type: 'SET_LABELS',
            //   payload: filters,
            // });
          },
          initialValues: {},
        });
        // @ts-ignore
        return (
          <form
            onSubmit={handleSubmit}
            className="add-instance-form app-theme-dark"
            onChange={() => {
              context.dispatch({
                type: 'SET_LABELS',
                payload: { labels: form.getState().values },
              });
            }}
          >
            <div className={'filters-header'} style={{ padding: '5px 0px', height: '50px' }}>
              <h5 style={{ margin: '3px', marginRight: '15px' }}>Filters</h5>
              {showAll ? (
                <a href="#" className={'filter-switchers'} onClick={showSetAll.bind(null, false)}>
                  Show Selected
                </a>
              ) : (
                <a href="#" className={'filter-switchers'} onClick={showSetAll.bind(null, true)}>
                  Show All
                </a>
              )}
              <a
                href="#"
                className={'filter-switchers'}
                style={{ marginLeft: 'auto' }}
                onClick={() => {
                  context.dispatch({ type: 'RESET_LABELS' });
                }}
              >
                Reset All
              </a>
            </div>
            <div className={'query-analytics-filters-wrapper'}>
              <Search placeholder="Filters search..." onChange={e => setFilter(e.target.value)} style={{ width: '100%' }} />
              {checkboxGroups.map(group => {
                return checkboxGroup(form, group.name, filters[group.dataKey].name, group.dataKey, showAll, filter, context.state.labels);
              })}
            </div>
          </form>
        );
      }}
    />
  );
};

export default Filters;
