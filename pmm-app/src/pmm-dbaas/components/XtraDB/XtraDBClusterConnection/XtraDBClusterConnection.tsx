import React, { FC, useEffect, useState } from 'react';
import { Spinner, useStyles } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { XtraDBService } from '../XtraDB.service';
import { XtraDBClusterConnectionProps } from './XtraDBClusterConnection.types';
import { XtraDBClusterConnection as ConnectionParams } from '../XtraDB.types';
import { INITIAL_CONNECTION } from './XtraDBClusterConnection.constants';
import { getStyles } from './XtraDBClusterConnection.styles';
import {
  XtraDBClusterConnectionPassword,
} from './XtraDBClusterConnectionPassword/XtraDBClusterConnectionPassword';
import { XtraDBClusterConnectionItem } from './XtraDBClusterConnectionItem/XtraDBClusterConnectionItem';

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
  const getClusterConnection = async () => {
    try {
      setLoading(true);
      setConnection(await XtraDBService.showXtraDBCluster(xtraDBCluster) as ConnectionParams);
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
      {!loading ? (
        <div className={styles.connectionWrapper}>
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
