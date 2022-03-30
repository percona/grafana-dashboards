import React, { FC } from 'react';
import { Tooltip, useStyles2 } from '@grafana/ui';
import { cx } from '@emotion/css';
import { FailedCheckSummary } from 'pmm-check-home/types';
import { PMM_SETTINGS_URL, PMM_DATABASE_CHECKS_PANEL_URL } from 'pmm-check-home/CheckPanel.constants';
import { TooltipText } from './TooltipText';
import { getStyles } from './Failed.styles';

interface FailedProps {
  failed: FailedCheckSummary[];
  hasNoAccess: boolean;
  isSttEnabled: boolean;
}

const splitSeverities = (checks: FailedCheckSummary[] = []): [number, number, number] => {
  const result: [number, number, number] = [0, 0, 0];

  checks.forEach(({ criticalCount, warningCount, noticeCount }) => {
    result[0] += criticalCount;
    result[1] += warningCount;
    result[2] += noticeCount;
  });

  return result;
};

export const Failed: FC<FailedProps> = ({ failed = [], isSttEnabled, hasNoAccess }) => {
  const styles = useStyles2(getStyles);
  const totalFailedChecks = splitSeverities(failed);
  const [critical, major, trivial] = totalFailedChecks;
  const sum = critical + major + trivial;

  if (hasNoAccess) {
    return (
      <div className={styles.Empty} data-testid="unauthorized">
        Insufficient access permissions.
      </div>
    );
  }

  if (!isSttEnabled) {
    return (
      <div className={styles.Empty} data-testid="db-check-panel-settings-link">
        Advisors Checks feature is disabled.
        <br />
        {'Check '}
        <a className={styles.Link} href={PMM_SETTINGS_URL}>PMM Settings.</a>
      </div>
    );
  }

  if (!sum) {
    return (
      <div data-testid="db-check-panel-zero-checks">
        <span className={cx(styles.FailedDiv, styles.Green)}>{sum}</span>
      </div>
    );
  }

  return (
    <div data-testid="db-check-panel-has-checks">
      <Tooltip placement="top" theme="info" content={<TooltipText sum={sum} data={totalFailedChecks} />}>
        <a href={PMM_DATABASE_CHECKS_PANEL_URL} className={styles.FailedDiv}>
          <span className={styles.Critical}>{critical}</span>
          <span> / </span>
          <span className={styles.Major}>{major}</span>
          <span> / </span>
          <span className={styles.Trivial}>{trivial}</span>
        </a>
      </Tooltip>
    </div>
  );
};
