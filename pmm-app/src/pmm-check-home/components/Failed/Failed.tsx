import React, { FC } from 'react';
import { useStyles2 } from '@grafana/ui';
import { cx } from '@emotion/css';
import { FailedChecksCounts, FailedCheckSummary } from 'pmm-check-home/types';
import { PMM_SETTINGS_URL, PMM_DATABASE_CHECKS_PANEL_URL } from 'pmm-check-home/CheckPanel.constants';
import Tippy from '@tippyjs/react';
import { TooltipText } from './TooltipText';
import { getStyles } from './Failed.styles';
import { FailedProps } from './Failed.types';

const splitSeverities = (checks: FailedCheckSummary[] = []): FailedChecksCounts => {
  const result: FailedChecksCounts = {
    emergency: 0,
    critical: 0,
    alert: 0,
    error: 0,
    warning: 0,
    debug: 0,
    info: 0,
    notice: 0,
  };

  checks.forEach(({
    counts: {
      emergency, critical, alert, error, warning, debug, info, notice,
    },
  }) => {
    result.emergency += emergency;
    result.critical += critical;
    result.alert += alert;
    result.error += error;
    result.warning += warning;
    result.debug += debug;
    result.info += info;
    result.notice += notice;
  });

  return result;
};

export const Failed: FC<FailedProps> = ({ failed = [], isSttEnabled, hasNoAccess }) => {
  const styles = useStyles2(getStyles);
  const counts = splitSeverities(failed);
  const {
    emergency, critical, alert, error, warning, debug, info, notice,
  } = counts;
  const sum = emergency + critical + alert + error + warning + debug + info + notice;

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
        Advisor Checks feature is disabled.
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
      <Tippy
        delay={[100, 100]}
        content={<TooltipText counts={counts} />}
        placement="top"
        className={styles.tippy}
        interactive
        appendTo={document.body}
      >
        <a href={PMM_DATABASE_CHECKS_PANEL_URL} className={styles.FailedDiv}>
          <span className={styles.Critical}>{emergency + alert + critical}</span>
          <span> / </span>
          <span className={styles.Error}>{error}</span>
          <span> / </span>
          <span className={styles.Warning}>{warning}</span>
          <span> / </span>
          <span className={styles.Notice}>{notice + info + debug}</span>
        </a>
      </Tippy>
    </div>
  );
};
