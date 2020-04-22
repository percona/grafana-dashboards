import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { AgentsTab, NodesTab, ServicesTab } from './Tabs';
import Styling from '../react-plugins-deps/components/helpers/styling';

const { TabPane } = Tabs;

export const InventoryPanel = () => {
  useEffect(() => Styling.addPluginPanelClass(), []);
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
