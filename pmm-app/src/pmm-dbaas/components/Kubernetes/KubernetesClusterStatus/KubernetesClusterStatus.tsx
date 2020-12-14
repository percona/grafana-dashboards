import React, { FC, useMemo } from 'react';
import { cx } from 'emotion';
import { useStyles, Icon } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { getStyles } from './KubernetesClusterStatus.styles';
import { KubernetesClusterStatus as Status } from './KubernetesClusterStatus.types';
import { OPERATORS_DOCS_URL } from './KubernetesClusterStatus.constants';

export const KubernetesClusterStatus: FC<any> = ({ status }) => {
  const styles = useStyles(getStyles);
  const statusStyles = useMemo(
    () => ({
      [styles.statusActive]: status === Status.ok,
      [styles.statusFailed]: status === Status.invalid,
      [styles.statusUnavailable]: status === Status.unavailable,
    }),
    [status],
  );

  return (
    <div className={styles.clusterStatusWrapper}>
      <span
        className={cx(styles.status, statusStyles)}
        // data-qa={`cluster-status-${STATUS_DATA_QA[status]}`}
      >
        {Messages.kubernetes.kubernetesStatus[status]}
      </span>
    </div>
  );
};
