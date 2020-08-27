import React, { FC, useState } from 'react';
import { TabsBar, TabContent, Tab } from '@grafana/ui';
import { KubernetesInventory } from './components/Kubernetes/KubernetesInventory';
import { Messages } from './DBaaS.messages';
import { TabKeys } from './DBaaS.types';

const tabs = [
  { label: Messages.tabs.kubernetes, key: TabKeys.kubernetes, component: <KubernetesInventory /> },
];

export const DBaaSPanel: FC = () => {
  const [activeTab, setActiveTab] = useState(TabKeys.kubernetes);

  return (
    <div>
      <TabsBar>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            active={tab.key === activeTab}
            onChangeTab={() => setActiveTab(tab.key)}
          />
        ))}
      </TabsBar>
      <TabContent>
        {tabs.map((tab) => tab.key === activeTab && tab.component)}
      </TabContent>
    </div>
  );
};
