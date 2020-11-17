import React, { FC } from 'react';
import { Spinner, useStyles } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DBClusterParametersProps } from './DBClusterParameters.types';
import { DBClusterStatus } from '../DBCluster.types';
import { getStyles } from './DBClusterParameters.styles';
import { DBClusterConnectionItem } from '../DBClusterConnection/DBClusterConnectionItem/DBClusterConnectionItem';
import { isClusterChanging } from '../DBCluster.utils';

export const DBClusterParameters: FC<DBClusterParametersProps> = ({ dbCluster }) => {
  const styles = useStyles(getStyles);
  const { status } = dbCluster;

  return (
    <>
      {!isClusterChanging(dbCluster) ? (
        <div className={styles.wrapper}>
          {status && status === DBClusterStatus.ready ? (
            <>
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
                dataQa="cluster-parameters-cpu"
              />
            </>
          ) : (
            <span className={styles.connectionFailed} data-qa="cluster-connection-failed">
              -
            </span>
          )}
        </div>
      ) : (
        <div className={styles.connectionLoading} data-qa="cluster-connection-loading">
          <Spinner />
        </div>
      )}
    </>
  );
};
