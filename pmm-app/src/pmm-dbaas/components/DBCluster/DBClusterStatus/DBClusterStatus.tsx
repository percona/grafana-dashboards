import React, {
  FC, useMemo, useEffect, useRef, useState,
} from 'react';
import { cx } from 'emotion';
import { Icon, useStyles, Tooltip } from '@grafana/ui';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { ProgressBar } from 'pmm-dbaas/components/ProgressBar/ProgressBar';
import { ProgressBarStatus } from 'pmm-dbaas/components/ProgressBar/ProgressBar.types';
import { DBClusterStatusProps } from './DBClusterStatus.types';
import { getStyles } from './DBClusterStatus.styles';
import { DBClusterStatus as Status } from '../DBCluster.types';
import { COMPLETE_PROGRESS_DELAY, STATUS_DATA_QA } from './DBClusterStatus.constants';
import { getProgressMessage, getShowProgressBarValue } from './DBClusterStatus.utils';

export const DBClusterStatus: FC<DBClusterStatusProps> = ({
  status,
  message,
  finishedSteps,
  totalSteps,
}) => {
  const styles = useStyles(getStyles);
  const prevStatus = useRef<Status>();
  const statusError = status === Status.failed || status === Status.invalid;
  const [showProgressBar, setShowProgressBar] = useState(getShowProgressBarValue(status, prevStatus.current));
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

  useEffect(() => {
    // handles the last step of the progress bar
    // creates a delay between the last step and showing active status
    // without this the bar would jump from the second last step to active status
    if (prevStatus.current === Status.changing && status === Status.ready) {
      setTimeout(() => setShowProgressBar(false), COMPLETE_PROGRESS_DELAY);
    } else {
      setShowProgressBar(getShowProgressBarValue(status, prevStatus.current));
    }
  }, [status]);

  useEffect(() => {
    prevStatus.current = status;
  });

  return (
    <div className={cx(styles.clusterStatusWrapper, { [styles.clusterPillWrapper]: !showProgressBar })}>
      {showProgressBar ? (
        <ProgressBar
          status={statusError ? ProgressBarStatus.error : ProgressBarStatus.progress}
          finishedSteps={finishedSteps}
          totalSteps={totalSteps}
          message={getProgressMessage(status, prevStatus.current)}
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
