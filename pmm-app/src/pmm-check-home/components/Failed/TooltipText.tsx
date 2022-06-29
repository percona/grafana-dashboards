import { useStyles2 } from '@grafana/ui';
import { FailedChecksCounts } from 'pmm-check-home/types';
import React, { FC } from 'react';
import { getStyles } from './Failed.styles';

interface TooltipTextProps {
  counts: FailedChecksCounts;
}

export const TooltipText: FC<TooltipTextProps> = ({
  counts: {
    emergency, critical, alert, error, warning, debug, info, notice,
  },
}) => {
  const styles = useStyles2(getStyles);
  const sum = emergency + critical + alert + error + warning + debug + info + notice;

  if (!sum) {
    return null;
  }

  return (
    <div className={styles.TooltipWrapper}>
      <div className={styles.TooltipHeader}>
        Failed checks:
        {' '}
        {sum}
      </div>
      <div className={styles.TooltipBody} data-testid="checks-tooltip-body">
        <div>
          Emergency &ndash;
          {' '}
          {emergency}
        </div>
        <div>
          Alert &ndash;
          {' '}
          {alert}
        </div>
        <div>
          Critical &ndash;
          {' '}
          {critical}
        </div>
        <div>
          Error &ndash;
          {' '}
          {error}
        </div>
        <div>
          Warning &ndash;
          {' '}
          {warning}
        </div>
        <div>
          Notice &ndash;
          {' '}
          {notice}
        </div>
        <div>
          Info &ndash;
          {' '}
          {info}
        </div>
        <div>
          Debug &ndash;
          {' '}
          {debug}
        </div>
      </div>
    </div>
  );
};
