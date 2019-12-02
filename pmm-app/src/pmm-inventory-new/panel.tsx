import React, { useState } from 'react';
import { Collapse, Table, Tabs } from 'antd';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import './panel.scss';
import InventoryService from './InventoryService';
import { InventoryDataService } from './DataService/DataService';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Services = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const responseData = {
    postgresql: [
      {
        service_id: '/service_id/fb62589b-ecb7-4af7-abe5-1e6564efbc67',
        service_name: 'pmm-server-postgresql',
        node_id: 'pmm-server',
        address: '127.0.0.1',
        port: 5432,
      },
    ],
  };

  const content = InventoryDataService.generateStructure(responseData);
  const columns = [
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
        return element.custom_labels.map(label => {
          return (
            <span>
              `${label.key}: ${label.value}` }
            </span>
          );
        });
      },
    },
  ];

  return <Table dataSource={content} columns={columns} />;
};

const Agents = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const responseData = {
    pmm_agent: [{ agent_id: 'pmm-server', runs_on_node_id: 'pmm-server', connected: true }],
    node_exporter: [
      { agent_id: '/agent_id/42383b72-372f-4bf9-b1d8-1747006edf30', pmm_agent_id: 'pmm-server', status: 'RUNNING', listen_port: 42000 },
    ],
    postgres_exporter: [
      {
        agent_id: '/agent_id/b5920469-47a1-41ae-98bb-e4c54f264f42',
        pmm_agent_id: 'pmm-server',
        service_id: '/service_id/fb62589b-ecb7-4af7-abe5-1e6564efbc67',
        username: 'pmm-managed',
        status: 'RUNNING',
        listen_port: 42001,
      },
    ],
    qan_postgresql_pgstatements_agent: [
      {
        agent_id: '/agent_id/503fbb92-dc22-4080-9805-bc578ba63bc6',
        pmm_agent_id: 'pmm-server',
        service_id: '/service_id/fb62589b-ecb7-4af7-abe5-1e6564efbc67',
        username: 'pmm-managed',
        status: 'RUNNING',
      },
    ],
  };
  const content = InventoryDataService.generateStructure(responseData);
  console.log(content);
  const columns = [
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
        return (
          <p>
            {agentData.connected ? <span>{`connected: ${agentData.connected}`}</span> : null}
            {agentData.runs_on_node_id ? <span>{`runs_on_node: ${agentData.runs_on_node_id}`}</span> : null}
            {agentData.metrics_url ? <span>{`metrics_url: ${agentData.metrics_url}`}</span> : null}
            {agentData.listen_port ? <span>{`listen_port: ${agentData.listen_port}`}</span> : null}
            {agentData.pmm_agent_id ? <span>{`pmm_agent_id: ${agentData.pmm_agent_id}`}</span> : null}
            {agentData.service_id ? <span>{`service_id: ${agentData.service_id}`}</span> : null}
            {agentData.status ? <span>{`status: ${agentData.status}`}</span> : null}
            {agentData.username ? <span>{`username: ${agentData.username}`}</span> : null}
            {agentData.username ? <span>{`password: ******`}</span> : null}
            {/* TODO: know more about isString*/}
            {agentData.disabled ? <span>{`disabled: ${agentData.disabled}`}</span> : null}
            {agentData.service_ids && agentData.service_ids.length ? (
              <>
                service_ids: <span>{agentData.service_ids.map(serviceId => serviceId)}</span>
              </>
            ) : null}
            {agentData.custom_labels.map(label => (
              <span>
                `${label.key}: ${label.value}` }
              </span>
            ))}
          </p>
        );
      },
    },
  ];

  return <Table dataSource={content} columns={columns} />;
};

const Nodes = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const responseData = { generic: [{ node_id: 'pmm-server', node_name: 'pmm-server', address: '127.0.0.1' }] };
  const content = InventoryDataService.generateStructure(responseData);

  const columns = [
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
        return (
          <div>
            {element.docker_container_id ? <span>{`docker_container_id: ${element.docker_container_id}`}</span> : null}
            {element.docker_container_name ? <span>{`docker_container_name: ${element.docker_container_name}`}</span> : null}
            {element.machine_id ? <span>{`machine_id: ${element.machine_id}`}</span> : null}
            {element.distro ? <span>{`distro: ${element.distro}`}</span> : null}
            {element.distro_version ? <span>{`distro_version: ${element.distro_version}`}</span> : null}
            {element.node_id ? <span>{`node_id: ${element.node_id}`}</span> : null}
            {element.node_name ? <span>{`node_name: ${element.node_name}`}</span> : null}
            {element.instance ? <span>{`instance: ${element.instance}`}</span> : null}
            {element.region ? <span>{`region: ${element.region}`}</span> : null}
            {element.address ? <span>{`address: ${element.address}`}</span> : null}
            {element.connected ? <span>{`connected: ${element.connected}`}</span> : null}
            {element.custom_labels.map(label => (
              <span>
                `${label.key}: ${label.value}` }
              </span>
            ))}
          </div>
        );
      },
    },
  ];

  return <Table dataSource={content} columns={columns} />;
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
