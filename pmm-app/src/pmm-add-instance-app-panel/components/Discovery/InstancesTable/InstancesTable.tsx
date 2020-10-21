import React, { FC } from 'react';
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

const InstancesTable: FC<any> = (props) => {
  const {
    instances, onSelectInstance, credentials, loading,
  } = props;
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

  return (
    <div className={styles.tableWrapper}>
      <Table columns={columns} data={instances} loading={loading} />
    </div>
  );
};

export default InstancesTable;
