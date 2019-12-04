import React, { useEffect, useState } from 'react';
import { Table, Tabs } from 'antd';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import './panel.scss';
import InventoryService from './InventoryService';
import { InventoryDataService } from './DataService/DataService';

const { TabPane } = Tabs;

const getCustomLabels = customLabels => {
  return customLabels.map(label => (
    <span>
      `${label.key}: ${label.value}` }
    </span>
  ));
};

const servicesColumns = [
  {
    title: 'ID',
    dataIndex: 'service_id',
    key: 'service_id',
  },
  {
    title: 'Type',
    dataIndex: 'agentType',
    key: 'agentType',
  },
  {
    title: 'Service name',
    dataIndex: 'service_name',
    key: 'service_name',
  },
  {
    title: 'Node ID',
    dataIndex: 'node_id',
    key: 'node_id',
  },
  {
    title: 'Addresses',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Port',
    dataIndex: 'port',
    key: 'port',
  },
  {
    title: 'Other Details',
    dataIndex: 'age',
    key: 'age',
    render: (text, element) => {
      return getCustomLabels(element.custom_labels);
    },
  },
];
const agentsColumns = [
  {
    title: 'ID',
    dataIndex: 'agent_id',
    key: 'agent_id',
  },
  {
    title: 'Type',
    dataIndex: 'agentType',
    key: 'agentType',
  },
  {
    title: 'Other Details',
    dataIndex: 'age',
    key: 'age',
    render: (text, agentData) => {
      const labels = ['connected', 'runs_on_node_id', 'metrics_url', 'listen_port', 'pmm_agent_id', 'service_id', 'status', 'username', 'disabled'];
      return (
        <div className={'other-details-wrapper'}>
          {labels.map(label => (agentData[label] ? <span>{`${label}: ${agentData[label]}`}</span> : null))}
          {agentData.username ? <span>{`password: ******`}</span> : null}
          {/* TODO: know more about isString*/}
          {agentData.service_ids && agentData.service_ids.length ? (
            <>
              service_ids: <span>{agentData.service_ids.map(serviceId => serviceId)}</span>
            </>
          ) : null}
          {getCustomLabels(agentData.custom_labels)}
        </div>
      );
    },
  },
];
const nodesColumns = [
  {
    title: 'ID',
    dataIndex: 'node_id',
    key: 'node_id',
  },
  {
    title: 'Node Name',
    dataIndex: 'node_name',
    key: 'node_name',
  },
  {
    title: 'Addresses',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Other Details',
    dataIndex: 'age',
    key: 'age',
    render: (text, element) => {
      const labels = [
        'docker_container_id',
        'docker_container_name',
        'machine_id',
        'distro',
        'distro_version',
        'node_id',
        'node_name',
        'instance',
        'region',
        'address',
        'connected',
      ];
      return (
        <div className={'other-details-wrapper'}>
          {labels.map(label => (element[label] ? <span>{`${label}: ${element[label]}`}</span> : null))}
          {getCustomLabels(element.custom_labels)}
        </div>
      );
    },
  },
];

const Services = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await InventoryService.getServices({});
      setData(InventoryDataService.generateStructure(result));
      setLoading(false);
    })();
  }, []);

  return <Table dataSource={data} columns={servicesColumns} pagination={false} bordered loading={loading} />;
};

const Agents = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await InventoryService.getAgents({});
      setData(InventoryDataService.generateStructure(result));
      setLoading(false);
    })();
  }, []);

  return <Table dataSource={data} columns={agentsColumns} pagination={false} bordered loading={loading} />;
};

const Nodes = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await InventoryService.getNodes({});
      setData(InventoryDataService.generateStructure(result));
      setLoading(false);
    })();
  }, []);

  return <Table dataSource={data} columns={nodesColumns} pagination={false} bordered loading={loading} />;
};

const InventoryPanel = () => {
  return (
    <div id={'antd'}>
      <Tabs defaultActiveKey="1">
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
