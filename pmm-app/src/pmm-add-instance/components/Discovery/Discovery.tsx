import React, { useEffect, useState, FC } from 'react';
import DiscoveryService from './Discovery.service';
import Credentials from './Credentials/Credentials';
import InstancesTable from './InstancesTable/InstancesTable';
import { getStyles } from './Discovery.styles';

interface DiscoverySearchPanelInterface {
  onSelectInstance: (instanceData: any) => void;
}

const Discovery: FC<DiscoverySearchPanelInterface> = ({ onSelectInstance }) => {
  const styles = getStyles();

  const [instances, setInstances] = useState([] as any);
  const [credentials, setCredentials] = useState({ aws_secret_key: '', aws_access_key: '' });
  const [loading, startLoading] = useState(false);

  useEffect(() => {
    const updateInstances = async () => {
      try {
        const result = await DiscoveryService.discoveryRDS(credentials);

        console.log(result);
        // setInstances(result.rds_instances);
      } catch (e) {
        console.error(e);
      } finally {
        startLoading(false);
        setInstances([{ address: 'da:123' }, { address: 'da:123' }]);
      }
    };

    if (credentials.aws_secret_key && credentials.aws_access_key) {
      startLoading(true);
      updateInstances();
    }
  }, [credentials]);

  return (
    <>
      <div className={styles.content}>
        <Credentials onSetCredentials={setCredentials} />
        <InstancesTable
          instances={instances}
          onSelectInstance={onSelectInstance}
          credentials={credentials}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Discovery;
