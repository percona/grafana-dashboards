import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '@grafana/ui';
import { cx } from 'emotion';
import { FailedChecks } from 'pmm-check/types';
import { PMM_SETTINGS_URL, PMM_DATABASE_CHECKS_PANEL_URL } from 'pmm-check-home/CheckPanel.constants';
import { TooltipText } from './TooltipText';
import * as styles from './Failed.styles';

interface FailedProps {
  failed?: FailedChecks;
  hasNoAccess: boolean;
  isSttEnabled: boolean;
}

export const Failed: FC<FailedProps> = ({ failed = [0, 0, 0], isSttEnabled, hasNoAccess }) => {
  const sum = useMemo(() => failed.reduce((acc, val) => acc + val, 0), [failed]);

  if (hasNoAccess) {
    return (
      <div className={styles.Empty} data-qa="db-check-panel-no-access">
        Insufficient access rights.
      </div>
    );
  }

  if (!isSttEnabled) {
    return (
      <div className={styles.Empty} data-qa="db-check-panel-settings-link">
        Security Threat Tool is disabled.
        <br />
        {'Check '}
        <Link className={styles.Link} to={PMM_SETTINGS_URL}>
          PMM Settings.
        </Link>
      </div>
    );
  }

  if (!sum) {
    return (
      <div data-qa="db-check-panel-zero-checks">
        <span className={cx(styles.FailedDiv, styles.Green)}>{sum}</span>
      </div>
    );
  }

  const [critical, major, trivial] = failed;
  return (
    <div data-qa="db-check-panel-has-checks">
      <Tooltip placement="top" theme="info" content={<TooltipText sum={sum} data={failed} />}>
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
