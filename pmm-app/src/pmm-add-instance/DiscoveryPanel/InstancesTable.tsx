import { Button, Table } from 'antd';
import React from 'react';

const getColumnType = type => {
  switch (type) {
    case 'DISCOVER_RDS_MYSQL':
      return 'MySQL';
    case 'DISCOVER_RDS_POSTGRES':
      return 'Postgres';
    case 'DISCOVER_RDS_INVALID':
      return 'Unknown type';
    default:
      return 'Unknown type';
  }
};

const InstancesTable = props => {
  const { instances, selectInstance } = props;
  const columns = [
    {
      title: 'AWS region',
      dataIndex: 'region',
      key: 'region',
      className: 'discovery-column',
    },
    {
      title: 'Engine',
      dataIndex: 'type',
      className: 'discovery-column',
      render: (element, instance) => {
        console.log(instance);
        return instance.engine ? `${getColumnType(instance.engine)}  ${instance.engine_version}` : 'nothing';
      },
    },
    {
      title: 'Instance ID',
      dataIndex: 'instance_id',
      key: 'instance_id',
      className: 'discovery-column',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      className: 'discovery-column',
      render: element => element.split(':')[0],
    },
    {
      title: 'Action',
      className: 'discovery-column',
      render: element => {
        let type = '';
        switch (element.engine) {
          case 'DISCOVER_RDS_MYSQL':
            type = 'mysql';
            break;
          default:
            type = 'mysql';
            break;
        }
        return <a onClick={() => selectInstance({ type: type, credentials: element })}> Start monitoring</a>;
      },
    },
  ];

  return instances && instances.length ? (
    <Table dataSource={instances} pagination={false} bordered={false} columns={columns} rowClassName={() => 'discovery-table-row'} size={'small'} />
  ) : null;
};

export default InstancesTable;
