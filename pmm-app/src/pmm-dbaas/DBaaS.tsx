import React, { FC, useState, useMemo } from 'react';
import { TabsBar, TabContent, Tab } from '@grafana/ui';
import { KubernetesInventory } from './components/Kubernetes/KubernetesInventory';
import { XtraDB } from './components/XtraDB/XtraDB';
import { useKubernetes } from './components/Kubernetes/Kubernetes.hooks';
import { Messages } from './DBaaS.messages';
import { TabKeys } from './DBaaS.types';
import { styles } from './DBaaS.styles';

export const DBaaSPanel: FC = () => {
  const [activeTab, setActiveTab] = useState(TabKeys.kubernetes);
  const [kubernetes, deleteKubernetes, addKubernetes, kubernetesLoading] = useKubernetes();
  const tabs = useMemo(
    () => [
      {
        label: Messages.tabs.kubernetes,
        key: TabKeys.kubernetes,
        component:
          <KubernetesInventory
            key={TabKeys.kubernetes}
            kubernetes={kubernetes}
            deleteKubernetes={deleteKubernetes}
            addKubernetes={addKubernetes}
            loading={kubernetesLoading}
          />
      },
      {
        label: Messages.tabs.xtradb,
        key: TabKeys.xtradb,
        disabled: kubernetes.length === 0,
        component:
          <XtraDB
            key={TabKeys.xtradb}
            kubernetes={kubernetes}
          />
      },
    ],
    [kubernetes, kubernetesLoading]
  );

  return (
    <div>
      <TabsBar>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            active={tab.key === activeTab}
            style={tab.disabled ? styles.disabled : undefined}
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
