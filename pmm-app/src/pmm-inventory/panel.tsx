import React from 'react';
import { Tabs } from 'antd';
import { AgentsTab, NodesTab, ServicesTab } from './Tabs';

const { TabPane } = Tabs;

export const InventoryPanel = () => {
  return (
    <div id="antd" style={{ width: '100%' }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Services" key="1">
          <ServicesTab />
        </TabPane>
        <TabPane tab="Agents" key="2">
          <AgentsTab />
        </TabPane>
        <TabPane tab="Nodes" key="3">
          <NodesTab />
        </TabPane>
      </Tabs>
    </div>
  );
};
