import React, { useMemo, useState } from 'react';
import { TabsBar, TabContent, Tab } from '@grafana/ui';
import { Agents, NodesTab, Services } from './Tabs';

export const InventoryPanel = () => {
  const [activeTab, setActiveTab] = useState('services');
  const tabs = useMemo(
    () => [
      { label: 'Services', key: 'services', active: activeTab === 'services' },
      { label: 'Agents', key: 'agents', active: activeTab === 'agents' },
      { label: 'Nodes', key: 'nodes', active: activeTab === 'nodes' },
    ],
    [activeTab]
  );

  return (
    <div id="inventory-wrapper">
      <TabsBar>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            active={tab.active}
            onChangeTab={() => {
              setActiveTab(tab.key);
            }}
          />
        ))}
      </TabsBar>
      <TabContent>
        {tabs[0].active && <Services />}
        {tabs[1].active && <Agents />}
        {tabs[2].active && <NodesTab />}
      </TabContent>
    </div>
  );
};
