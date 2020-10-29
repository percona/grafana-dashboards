import React, { FC, useEffect, useState } from 'react';
import { Spinner, useStyles } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { XtraDBService } from '../XtraDB.service';
import { XtraDBClusterConnectionProps } from './XtraDBClusterConnection.types';
import {
  XtraDBClusterConnection as ConnectionParams,
  XtraDBClusterStatus,
  XtraDBClusterConnectionAPI,
} from '../XtraDB.types';
import { INITIAL_CONNECTION } from './XtraDBClusterConnection.constants';
import { getStyles } from './XtraDBClusterConnection.styles';
import {
  XtraDBClusterConnectionPassword,
} from './XtraDBClusterConnectionPassword/XtraDBClusterConnectionPassword';
import { XtraDBClusterConnectionItem } from './XtraDBClusterConnectionItem/XtraDBClusterConnectionItem';
import { isClusterChanging } from '../XtraDB.utils';

export const XtraDBClusterConnection: FC<XtraDBClusterConnectionProps> = ({
  xtraDBCluster,
}) => {
  const styles = useStyles(getStyles);
  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState<ConnectionParams>(INITIAL_CONNECTION);
  const {
    host,
    password,
    port,
    username,
  } = connection;
  const { status } = xtraDBCluster;
  const getClusterConnection = async () => {
    try {
      setLoading(true);
      const connection = await XtraDBService.getXtraDBCluster(xtraDBCluster) as XtraDBClusterConnectionAPI;

      setConnection(connection.connection_credentials);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClusterConnection();
  }, []);

  return (
    <>
      {!loading && !isClusterChanging(xtraDBCluster) ? (
        <div className={styles.connectionWrapper}>
          {status && status === XtraDBClusterStatus.ready ? (
            <>
              <XtraDBClusterConnectionItem
                label={Messages.xtradb.table.connection.host}
                value={host}
                dataQa="cluster-connection-host"
              />
              <XtraDBClusterConnectionItem
                label={Messages.xtradb.table.connection.port}
                value={port}
                dataQa="cluster-connection-port"
              />
              <XtraDBClusterConnectionItem
                label={Messages.xtradb.table.connection.username}
                value={username}
                dataQa="cluster-connection-username"
              />
              <XtraDBClusterConnectionPassword
                label={Messages.xtradb.table.connection.password}
                password={password}
                dataQa="cluster-connection-password"
              />
            </>
          ) : (
            <span
              className={styles.connectionFailed}
              data-qa="cluster-connection-failed"
            >
              -
            </span>
          )}
        </div>
      ) : (
        <div
          className={styles.connectionLoading}
          data-qa="cluster-connection-loading"
        >
          <Spinner />
        </div>
      )}
    </>
  );
};
