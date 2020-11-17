import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DBClusterParametersProps } from './DBClusterParameters.types';
import { DBClusterStatus } from '../DBCluster.types';
import { getStyles } from './DBClusterParameters.styles';
import { DBClusterConnectionItem } from '../DBClusterConnection/DBClusterConnectionItem/DBClusterConnectionItem';

export const DBClusterParameters: FC<DBClusterParametersProps> = ({ dbCluster }) => {
  const styles = useStyles(getStyles);
  const { status } = dbCluster;

  return (
    <>
      {status && status === DBClusterStatus.ready ? (
        <div className={styles.wrapper}>
          <DBClusterConnectionItem
            label={Messages.dbcluster.table.parameters.clusterName}
            value={dbCluster.clusterName}
            dataQa="cluster-parameters-cluster-name"
          />
          <DBClusterConnectionItem
            label={Messages.dbcluster.table.parameters.cpu}
            value={dbCluster.cpu}
            dataQa="cluster-parameters-cpu"
          />
          <DBClusterConnectionItem
            label={Messages.dbcluster.table.parameters.memory}
            value={`${dbCluster.memory} GB`}
            dataQa="cluster-parameters-memory"
          />
          <DBClusterConnectionItem
            label={Messages.dbcluster.table.parameters.disk}
            value={`${dbCluster.disk} GB`}
            dataQa="cluster-parameters-disk"
          />
        </div>
      ) : (
        <span className={styles.parametersFailed} data-qa="cluster-parameters-failed">
          -
        </span>
      )}
    </>
  );
};
