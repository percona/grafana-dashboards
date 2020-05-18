import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Icon } from '@grafana/ui';
import { cx } from 'emotion';
import { FailedChecks } from 'pmm-check/types';
import { PMM_SETTINGS_URL } from 'pmm-check/CheckPanel.constants';
import { TooltipText } from './TooltipText';
import * as styles from './Failed.styles';

interface FailedProps {
  failed?: FailedChecks;
  isSttEnabled: boolean;
}

export const Failed: FC<FailedProps> = ({ failed = [0, 0, 0], isSttEnabled }) => {
  const sum = useMemo(() => failed.reduce((acc, val) => acc + val, 0), [failed]);

  if (!isSttEnabled) {
    return (
      <div className={styles.Empty} data-qa="db-check-panel-settings-link">
        Security Threat Tool is disabled. You can enable it in&nbsp;
        <Link className={styles.Link} to={PMM_SETTINGS_URL}>
          PMM Settings.
        </Link>
      </div>
    );
  }

  if (!sum) {
    return (
      <div>
        <span className={cx(styles.FailedDiv, styles.Green)}>{sum}</span>
        <Tooltip placement="top" theme="info" content={<TooltipText sum={sum} data={failed} />}>
          <span>
            <Icon name="info-circle" className={styles.InfoIcon} />
          </span>
        </Tooltip>
      </div>
    );
  }

  const [critical, major, trivial] = failed;
  return (
    <div>
      <span className={(styles.FailedDiv, styles.LargeSize)}>
        <span>{critical}</span>
        <span> / </span>
        <span>{major}</span>
        <span> / </span>
        <span>{trivial}</span>
      </span>
      <Tooltip placement="top" theme="info" content={<TooltipText sum={sum} data={failed} />}>
        <span>
          <Icon name="info-circle" className={styles.InfoIcon} />
        </span>
      </Tooltip>
    </div>
  );
};
