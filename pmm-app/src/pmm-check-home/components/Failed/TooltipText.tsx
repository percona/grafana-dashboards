import { useStyles2 } from '@grafana/ui';
import React, { FC } from 'react';
import { getStyles } from './Failed.styles';

interface TooltipTextProps {
  sum: number;
  data: [number, number, number];
}

export const TooltipText: FC<TooltipTextProps> = ({ sum, data }) => {
  const styles = useStyles2(getStyles);

  if (!sum) {
    return null;
  }

  const [critical, major, trivial] = data;

  return (
    <div className={styles.TooltipWrapper}>
      <div className={styles.TooltipHeader}>
        Failed checks:
        {' '}
        {sum}
      </div>
      <div className={styles.TooltipBody}>
        <div>
          Critical &ndash;
          {' '}
          {critical}
        </div>
        <div>
          Major &ndash;
          {' '}
          {major}
        </div>
        <div>
          Trivial &ndash;
          {' '}
          {trivial}
        </div>
      </div>
    </div>
  );
};
