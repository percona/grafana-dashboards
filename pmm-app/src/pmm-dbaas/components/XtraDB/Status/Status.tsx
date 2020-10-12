import React, { FC } from 'react';
import { cx } from 'emotion';
import { useStyles } from '@grafana/ui';
import { StatusProps } from './Status.types';
import { getStyles } from './Status.styles';

export const Status: FC<StatusProps> = ({ active, label, dataQa }) => {
  const styles = useStyles(getStyles);

  return (
    <span
      className={cx(styles.status, { [styles.statusActive]: active })}
      data-qa={dataQa}
    >
      {label}
    </span>
  );
};
