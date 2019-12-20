import React, { useEffect, useState } from 'react';
import { Table, Tabs } from 'antd';
import InventoryService from './Inventory.service';
import { InventoryDataService } from './DataService';

const { TabPane } = Tabs;

const getCustomLabels = customLabels => customLabels.map(label => <span>{`${label.key}: ${label.value}`}</span>);

export const servicesColumns = [
  {
    title: 'ID',
    dataIndex: 'service_id',
    key: 'service_id',
  },
  {
    title: 'Service Type',
    dataIndex: 'type',
    key: 'type',
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
      const mainColumns = ['service_id', 'type', 'service_name', 'custom_labels', 'node_id', 'address', 'port'];
      const labels = Object.keys(element).filter(label => !mainColumns.includes(label));
      return (
        <div className={'other-details-wrapper'}>
          {labels.map(label => (element[label] ? <span>{`${label}: ${element[label]}`}</span> : null))}
          {element.custom_labels && getCustomLabels(element.custom_labels)}
        </div>
      );
    },
  },
];
export const agentsColumns = [
  {
    title: 'ID',
    dataIndex: 'agent_id',
    key: 'agent_id',
  },
  {
    title: 'Agent Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Other Details',
    dataIndex: 'age',
    key: 'age',
    render: (text, element) => {
      const mainColumns = ['agent_id', 'type', 'isDeleted', 'service_ids', 'custom_labels'];
      const labels = Object.keys(element).filter(label => !mainColumns.includes(label));
      return (
        <div className={'other-details-wrapper'}>
          {labels.map(label => (element[label] ? <span>{`${label}: ${element[label]}`}</span> : null))}
          {element.username ? <span>{`password: ******`}</span> : null}
          {/* TODO: know more about isString*/}
          {element.service_ids && element.service_ids.length ? (
            <>
              service_ids: <span>{element.service_ids.map(serviceId => serviceId)}</span>
            </>
          ) : null}
          {element.custom_labels && getCustomLabels(element.custom_labels)}
        </div>
      );
    },
  },
];
export const nodesColumns = [
  {
    title: 'ID',
    dataIndex: 'node_id',
    key: 'node_id',
  },
  {
    title: 'Node Type',
    dataIndex: 'type',
    key: 'type',
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
      const mainColumns = ['node_id', 'node_name', 'address', 'custom_labels', 'type', 'isDeleted'];
      const labels = Object.keys(element).filter(label => !mainColumns.includes(label));
      return (
        <div className={'other-details-wrapper'}>
          {labels.map(label => (element[label] ? <span>{`${label}: ${element[label]}`}</span> : null))}
          {element.custom_labels && getCustomLabels(element.custom_labels)}
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
      try {
        const result = await InventoryService.getServices({});
        setData(InventoryDataService.generateStructure(result));
      } catch (e) {
      } finally {
        setLoading(false);
      }
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
      try {
        const result = await InventoryService.getAgents({});
        setData(InventoryDataService.generateStructure(result));
      } catch (e) {
      } finally {
        setLoading(false);
      }
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
      try {
        const result = await InventoryService.getNodes({});
        setData(InventoryDataService.generateStructure(result));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <Table dataSource={data} columns={nodesColumns} pagination={false} bordered loading={loading} />;
};

const InventoryPanel = () => {
  return (
    <div id={'antd'} style={{ width: '100%' }}>
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
