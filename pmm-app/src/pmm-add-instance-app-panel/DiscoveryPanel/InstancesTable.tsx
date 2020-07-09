import React from 'react';
import { Table } from 'shared/components/Elements/Table/Table';
import { styles } from './InstancesTable.styles';

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

const InstancesTable = (props) => {
  const { instances, onSelectInstance, credentials } = props;
  const columns = [
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
      // eslint-disable-next-line max-len
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
        let type = '';

        switch (element.engine) {
          case 'DISCOVER_RDS_MYSQL':
            type = 'mysql';
            break;
          default:
            type = 'mysql';
            break;
        }

        return (
          <a
            onClick={() => {
              onSelectInstance({ type, credentials: { ...{ ...element, ...credentials }, isRDS: true } });
            }}
          >
            Start monitoring
          </a>
        );
      },
    },
  ];

  return instances && instances.length ? (
    <div className={styles.tableWrapper}>
      <Table columns={columns} data={instances} />
    </div>
  ) : null;
};

export default InstancesTable;
