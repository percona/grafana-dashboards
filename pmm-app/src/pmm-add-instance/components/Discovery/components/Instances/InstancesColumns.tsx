import { Button } from '@grafana/ui';
import React from 'react';

const getEngineType = (type) => {
  switch (type) {
    case 'DISCOVER_RDS_MYSQL':
      return 'MySQL';
    case 'DISCOVER_RDS_POSTGRES':
      return 'PostgreSQL';
    case 'DISCOVER_RDS_INVALID':
      return 'Unknown type';
    default:
      return 'Unknown type';
  }
};

export const getInstancesColumns = (credentials, onSelectInstance) => [
  {
    Header: 'Region',
    accessor: 'region',
  },
  {
    Header: 'Availability Zone',
    accessor: 'az',
  },
  {
    Header: 'Engine',
    accessor: (element) => (element.engine ? `${getEngineType(element.engine)}  ${element.engine_version}` : 'nothing'),
  },
  {
    Header: 'Instance ID',
    accessor: 'instance_id',
  },
  {
    Header: 'Address',
    accessor: (element) => element.address.split(':')[0],
  },
  {
    Header: 'Action',
    accessor: (element) => {
      const selectionHandler = () => {
        onSelectInstance({
          type: 'mysql',
          credentials: { ...{ ...element, ...credentials }, isRDS: true },
        });
      };

      return (
        <Button variant="primary" onClick={selectionHandler}>
          Start monitoring
        </Button>
      );
    },
  },
];
