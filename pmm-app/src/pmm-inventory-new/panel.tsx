import React, { useState } from 'react';
import { Collapse, Table, Tabs } from 'antd';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import './panel.scss';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Services = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Service name',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Node ID',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Addresses',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Port',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Other Details',
      dataIndex: 'age',
      key: 'age',
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

const Agents = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Other Details',
      dataIndex: 'age',
      key: 'age',
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

const Nodes = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Node Name',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Addresses',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Other Details',
      dataIndex: 'age',
      key: 'age',
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

const InventoryPanel = () => {
  return (
    <div id={'antd'}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Services" key="1">
          <Services />
        </TabPane>
        <TabPane tab="Agents" key="2">
          <Agents />
        </TabPane>
        <TabPane tab="Nodes" key="3">
          <Nodes />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default InventoryPanel;
