import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Humanize } from '../../../react-plugins-deps/components/helpers/humanize';
import './Filters.scss';
import { Divider } from 'antd';
import { StateContext } from '../StateContext';
import FiltersService from './Filters.service';
import { CheckboxField } from '../../../react-plugins-deps/components/FormComponents/Checkbox/Checkbox';
import { useForm } from 'react-final-form-hooks';
import { Form as FormFinal } from 'react-final-form';
import Search from 'antd/es/input/Search';

const checkboxGroup = ({ form, name, items, group, showAll, filter, labels }) => {
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
            <span>{Humanize.transform(item.main_metric_percent, 'percent')}</span>
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

const FILTERS_GROUPS = [
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

interface GroupInterface {
  dataKey: string;
  name: string;
}

const Filters = () => {
  const [showAll, showSetAll] = useState(true);
  const [filter, setFilter] = useState('');
  const [filters, setFilters] = useState({});
  const [groups, setGroups] = useState<GroupInterface[]>([]);
  const {
    dispatch,
    state: { labels = {}, from, to },
  } = useContext(StateContext);

  useEffect(() => {
    (async () => {
      try {
        const result = await FiltersService.getQueryOverviewFiltersList(labels, from, to);
        setFilters(result);
        setGroups(FILTERS_GROUPS);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, [labels, from, to]);
  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: filters => {},
          validate: () => undefined,
          initialValues: {},
        });
        // @ts-ignore
        return (
          <form
            onSubmit={handleSubmit}
            className="add-instance-form app-theme-dark"
            onChange={() => {
              dispatch({
                type: 'SET_LABELS',
                payload: { labels: form.getState().values },
              });
            }}
          >
            <div className={'filters-header'} style={{ padding: '5px 0px', height: '50px' }}>
              <h5 style={{ margin: '3px', marginRight: '15px' }}>Filters</h5>
              <a href="#" className={'filter-switchers'} onClick={showSetAll.bind(null, !showAll)}>
                {showAll ? `Show Selected` : `Show All`}
              </a>
              <a
                href="#"
                className={'filter-switchers'}
                style={{ marginLeft: 'auto' }}
                onClick={() => {
                  dispatch({ type: 'RESET_LABELS' });
                }}
              >
                Reset All
              </a>
            </div>
            <div className={'query-analytics-filters-wrapper'}>
              <Search placeholder="Filters search..." onChange={e => setFilter(e.target.value)} style={{ width: '100%' }} />
              {groups
                .filter(group => filters[group.dataKey])
                .map(group => {
                  const { name, dataKey } = group;
                  return checkboxGroup({
                    form,
                    name,
                    items: filters[dataKey].name,
                    group: dataKey,
                    showAll,
                    filter,
                    labels,
                  });
                })}
            </div>
          </form>
        );
      }}
    />
  );
};

export default Filters;
