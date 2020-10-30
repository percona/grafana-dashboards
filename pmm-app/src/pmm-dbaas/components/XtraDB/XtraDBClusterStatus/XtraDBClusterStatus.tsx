import React, { FC, useMemo } from 'react';
import { cx } from 'emotion';
import { useStyles } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { XtraDBClusterStatusProps } from './XtraDBClusterStatus.types';
import { getStyles } from './XtraDBClusterStatus.styles';
import { XtraDBClusterStatus as Status } from '../XtraDB.types';
import { STATUS_DATA_QA } from './XtraDBClusterStatus.constants';

export const XtraDBClusterStatus: FC<XtraDBClusterStatusProps> = ({
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
        {Messages.xtradb.table.status[status]}
      </span>
    </div>
  );
};
