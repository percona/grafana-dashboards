import React, { FC, useMemo } from 'react';
import { Icon, useStyles } from '@grafana/ui';
import { getStyles } from './DBClusterName.styles';
import { DBClusterNameProps } from './DBClusterName.types';
import { DASHBOARD_URL_MAP } from './DBClusterName.constants';

export const DBClusterName: FC<DBClusterNameProps> = ({
  dbCluster: {
    clusterName,
    databaseType,
  },
}) => {
  const styles = useStyles(getStyles);
  const dashboardURL = useMemo(() => (
    `${DASHBOARD_URL_MAP[databaseType]}${clusterName}`
  ), [databaseType, clusterName]);

  return (
    <div className={styles.clusterNameWrapper}>
      <span>{clusterName}</span>
      <a
        href={dashboardURL}
        target="_blank"
        rel="noreferrer"
        className={styles.dashboardIcon}
      >
        <Icon name="graph-bar" />
      </a>
    </div>
  );
};
