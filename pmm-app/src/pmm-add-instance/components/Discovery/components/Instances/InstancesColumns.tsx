import { Button } from '@grafana/ui';
import React from 'react';
import { DATABASE_LABELS, Databases } from 'shared/core';

const getEngineLabel = (type) => {
  switch (type) {
    case 'DISCOVER_RDS_MYSQL':
      return DATABASE_LABELS[Databases.mysql];
    case 'DISCOVER_RDS_POSTGRESQL':
      return DATABASE_LABELS[Databases.postgresql];
    case 'DISCOVER_RDS_INVALID':
      return 'Unknown type';
    default:
      return 'Unknown type';
  }
};

const getDatabaseType = (type) => {
  switch (type) {
    case 'DISCOVER_RDS_MYSQL':
      return Databases.mysql;
    case 'DISCOVER_RDS_POSTGRESQL':
      return Databases.postgresql;
    default:
      return '';
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
    accessor: (element) => (element.engine ? `${getEngineLabel(element.engine)}  ${element.engine_version}` : 'nothing'),
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
          type: getDatabaseType(element.engine),
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
