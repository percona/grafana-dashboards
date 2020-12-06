import React, { FC, useMemo } from 'react';
import { cx } from 'emotion';
import { useStyles, Icon } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
// import { DBClusterStatusProps } from './DBClusterStatus.types';
import { getStyles } from './DBClusterStatus.styles';
import { KubernetesClusterStatus as Status } from './DBClusterStatus.types';
import { STATUS_DATA_QA } from './DBClusterStatus.constants';

export const DBClusterStatus: FC<any> = ({ status, errorMessage }) => {
  const styles = useStyles(getStyles);
  const statusError = status === Status.invalid || status === Status.unsupported;
  const statusStyles = useMemo(
    () => ({
      [styles.statusActive]: status === Status.ok || status === Status.unavailable,
      [styles.statusFailed]: statusError,
    }),
    [status],
  );

  return (
    <div className={styles.clusterStatusWrapper}>
      {status === Status.unavailable ? (
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <span
            title={statusError ? errorMessage : ''}
            className={cx(styles.status, statusStyles)}
            // data-qa={`cluster-status-${STATUS_DATA_QA[status]}`}
          >
            {Messages.kubernetes.operatorStatus[status]}
            {status === Status.unavailable && <Icon name="external-link-alt" />}
          </span>
        </a>
      ) : (
        <span
          title={statusError ? errorMessage : ''}
          className={cx(styles.status, statusStyles)}
          // data-qa={`cluster-status-${STATUS_DATA_QA[status]}`}
        >
          {Messages.kubernetes.operatorStatus[status]}
        </span>
      )}
    </div>
  );
};
