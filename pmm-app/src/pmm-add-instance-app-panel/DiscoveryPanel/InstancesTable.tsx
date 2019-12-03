import { Table } from 'antd';
import React from 'react';

const getEngineType = type => {
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

const InstancesTable = props => {
  const { instances, onSelectInstance, credentials } = props;
  const columns = [
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      className: 'discovery-column',
    },
    {
      title: 'Availability Zone',
      dataIndex: 'az',
      key: 'az',
      className: 'discovery-column',
    },
    {
      title: 'Engine',
      dataIndex: 'type',
      className: 'discovery-column',
      render: (element, instance) => {
        return instance.engine ? `${getEngineType(instance.engine)}  ${instance.engine_version}` : 'nothing';
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
        return (
          <a onClick={() => onSelectInstance({ type: type, credentials: { ...Object.assign({}, element, credentials), isRDS: true } })}>
            Start monitoring
          </a>
        );
      },
    },
  ];

  return instances && instances.length ? (
    <Table dataSource={instances} pagination={false} bordered={false} columns={columns} rowClassName={() => 'discovery-table-row'} size={'small'} />
  ) : null;
};

export default InstancesTable;
