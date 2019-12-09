import React, { useContext, useEffect, useState } from 'react';
import { Select } from 'antd';
import { StateContext } from './StateContext';
import FiltersService from './storage/filtersService';

const { Option } = Select;

const groupNames = [
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

const getOptions = options => {
  return options
    .map((option, index) => {
      const groupName = groupNames.filter(group => group.dataKey === option.key.split(':')[0]);
      console.log(groupName);
      // if (!groupName[0]) {
      //   return null;
      // }
      // debugger;
      return <Option key={option.key}>{`${groupName[0] && groupName[0].name}: ${option.key.split(':')[1]}`}</Option>;
    })
    .filter(Boolean);
};

const AutocompleteSearch = props => {
  const context = useContext(StateContext);

  const [{ options, selected }, setFilters] = useState({
    options: [],
    selected: [],
  });

  useEffect(() => {
    // @ts-ignore
    setFilters(FiltersService.getAutocompleteFiltersList(context.selectedVariables));
  }, context.selectedVariables);

  return (
    <div id={'query-analytics-search'}>
      <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="Search by..."
        value={selected}
        onSelect={context.addFilter}
        onDeselect={context.removeFilter}
      >
        {getOptions(options)}
      </Select>
    </div>
  );
};

export default AutocompleteSearch;
