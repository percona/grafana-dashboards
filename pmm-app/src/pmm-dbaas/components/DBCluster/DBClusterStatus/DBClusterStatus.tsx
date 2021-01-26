import React, { FC, useMemo } from 'react';
import { cx } from 'emotion';
import { Icon, useStyles, Tooltip } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { ProgressBar } from 'pmm-dbaas/components/ProgressBar/ProgressBar';
import { ProgressBarStatus } from 'pmm-dbaas/components/ProgressBar/ProgressBar.types';
import { DBClusterStatusProps } from './DBClusterStatus.types';
import { getStyles } from './DBClusterStatus.styles';
import { DBClusterStatus as Status } from '../DBCluster.types';
import { STATUS_DATA_QA } from './DBClusterStatus.constants';

export const DBClusterStatus: FC<DBClusterStatusProps> = ({
  status,
  message,
  finishedSteps,
  totalSteps,
}) => {
  const styles = useStyles(getStyles);
  const statusError = status === Status.failed || status === Status.invalid;
  const showProgressBar = status === Status.changing || statusError;
  const statusStyles = useMemo(
    () => ({
      [styles.statusActive]: status === Status.ready,
      [styles.statusFailed]: statusError,
    }),
    [status],
  );
  const ErrorMessage = useMemo(() => () => (
    <pre>{message ? message.replace(/;/g, '\n') : Messages.dbcluster.table.status.errorMessage}</pre>
  ), [message]);

  return (
    <div className={cx(styles.clusterStatusWrapper, { [styles.clusterPillWrapper]: !showProgressBar })}>
      {showProgressBar ? (
        <ProgressBar
          status={statusError ? ProgressBarStatus.error : ProgressBarStatus.progress}
          finishedSteps={finishedSteps}
          totalSteps={totalSteps}
          message={statusError ? Messages.dbcluster.table.status.progressError : message}
          dataQa="cluster-progress-bar"
        />
      ) : (
        <span
          className={cx(styles.status, statusStyles)}
          data-qa={`cluster-status-${STATUS_DATA_QA[status]}`}
        >
          {Messages.dbcluster.table.status[status]}
        </span>
      )}
      {statusError && message && (
        <div className={styles.logsWrapper}>
          <span className={styles.logsLabel}>
            {Messages.dbcluster.table.status.logs}
          </span>
          <Tooltip content={<ErrorMessage />} placement="bottom">
            <span className={cx(styles.statusIcon)} data-qa="cluster-status-error-message">
              <Icon name="info-circle" />
            </span>
          </Tooltip>
        </div>
      )}
    </div>
  );
};
