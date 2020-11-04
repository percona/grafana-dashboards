import React, { FC, useMemo } from 'react';
import { cx } from 'emotion';
import { useStyles } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DBClusterStatusProps } from './DBClusterStatus.types';
import { getStyles } from './DBClusterStatus.styles';
import { DBClusterStatus as Status } from '../DBCluster.types';
import { STATUS_DATA_QA } from './DBClusterStatus.constants';

export const DBClusterStatus: FC<DBClusterStatusProps> = ({
  status,
  errorMessage,
}) => {
  const styles = useStyles(getStyles);
  const statusError = status === Status.failed || status === Status.invalid;
  const statusStyles = useMemo(() => ({
    [styles.statusActive]: status === Status.ready,
    [styles.statusFailed]: statusError,
  }), [status]);

  return (
    <div className={styles.clusterStatusWrapper}>
      <span
        title={statusError ? errorMessage : ''}
        className={cx(styles.status, statusStyles)}
        data-qa={`cluster-status-${STATUS_DATA_QA[status]}`}
      >
        {Messages.dbcluster.table.status[status]}
      </span>
    </div>
  );
};
