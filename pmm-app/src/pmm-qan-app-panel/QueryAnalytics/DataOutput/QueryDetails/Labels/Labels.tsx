import React, { useEffect, useState } from 'react';
import './Labels.scss';
import { Checkbox, Divider } from 'antd';
import LabelsService from './LabelsService';

const checkboxGroup = (name, items) => {
  return (
    items[0] && (
      <div>
        <Divider>{name}</Divider>
        {items.map(item => {
          return (
            <div>
              <Checkbox onChange={() => {}}>{item}</Checkbox>
            </div>
          );
        })}
      </div>
    )
  );
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

interface LabelsInterface {
  labels?: any;
}

const Labels = props => {
  const { filterBy, groupBy, periodStartFrom, periodStartTo, labels, tables } = props;

  const [labelsList, setLabelsList] = useState({} as LabelsInterface);
  useEffect(() => {
    const getLabels = async () => {
      const result = await LabelsService.getLabels({
        filterBy: filterBy,
        groupBy: groupBy,
        periodStartFrom: periodStartFrom,
        periodStartTo: periodStartTo,
        labels: labels,
        tables: tables,
      });
      setLabelsList(result);
    };
    getLabels();
  }, []);

  return (
    <div className={'query-analytics-filters-wrapper'}>
      {labelsList.labels &&
        checkboxGroups.map(group => {
          return checkboxGroup(group.name, labelsList.labels[group.dataKey].values);
        })}
    </div>
  );
};

export default Labels;
