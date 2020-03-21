import React, { useEffect, useState } from 'react';
import './DiscoveryPanel.scss';
import DiscoveryService from './Discovery.service';
import CredentialsForm from './CredentialsForm';
import InstancesTable from './InstancesTable';
import { Spin } from 'antd';

interface DiscoverySearchPanelInterface {
  onSelectInstance: (instanceData: any) => void;
}

const DiscoveryPanel = (props: DiscoverySearchPanelInterface) => {
  const [instances, setInstances] = useState([] as any);
  const [credentials, setCredentials] = useState({ aws_secret_key: '', aws_access_key: '' });
  const [loading, startLoading] = useState(false);
  useEffect(() => {
    const updateInstances = async () => {
      try {
        const result = await DiscoveryService.discoveryRDS({
          aws_access_key: credentials.aws_access_key,
          aws_secret_key: credentials.aws_secret_key,
        });
        setInstances(result.rds_instances);
        startLoading(false);
      } catch (e) {
        startLoading(false);
      }
    };
    if (credentials.aws_secret_key && credentials.aws_access_key) {
      startLoading(true);
      updateInstances().then(r => {});
    }
  }, [credentials]);

  return (
    <>
      <div className="form-wrapper">
        <CredentialsForm onSetCredentials={setCredentials} />
        <div className="spinner-wrapper" style={{ width: '100%' }}>
          {loading && <Spin size="large" />}
        </div>
        {!loading && (
          <InstancesTable
            instances={instances}
            onSelectInstance={props.onSelectInstance}
            credentials={credentials}
          />
        )}
      </div>
    </>
  );
};

export default DiscoveryPanel;
