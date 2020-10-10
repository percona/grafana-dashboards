import React from 'react';
import { useTheme } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { Status } from '../Status/Status';
import { getStyles } from './ColumnRenderers.styles';

export const clusterStatusRender = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.clusterStatusWrapper}>
      <Status
        label={Messages.xtradb.table.status.active}
        active
        dataQa="cluster-status-active"
      />
      <Status
        label={Messages.xtradb.table.status.suspended}
        active={false}
        dataQa="cluster-status-suspended"
      />
    </div>
  );
};

export const actionsRender = () => {
  // TODO: add DB cluster actions here
};
