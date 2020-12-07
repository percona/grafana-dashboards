import React, { FC, useMemo } from 'react';
import { cx } from 'emotion';
import { useStyles, Icon } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { getStyles } from './KubernetesOperatorStatus.styles';
import { KubernetesClusterStatus as Status } from './KubernetesOperatorStatus.types';
import { STATUS_DATA_QA } from './DBClusterStatus.constants';
import { OPERATORS_DOCS_URL } from './KubernetesOperatorStatus.constants';

export const KubernetesOperatorStatus: FC<any> = ({ status, databaseType }) => {
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
        <a href={OPERATORS_DOCS_URL[databaseType]} target="_blank" rel="noopener noreferrer">
          <span
            className={cx(styles.status, statusStyles)}
            // data-qa={`cluster-status-${STATUS_DATA_QA[status]}`}
          >
            {Messages.kubernetes.operatorStatus[status]}
            {status === Status.unavailable && <Icon name="external-link-alt" />}
          </span>
        </a>
      ) : (
        <span
          className={cx(styles.status, statusStyles)}
          // data-qa={`cluster-status-${STATUS_DATA_QA[status]}`}
        >
          {Messages.kubernetes.operatorStatus[status]}
        </span>
      )}
    </div>
  );
};
