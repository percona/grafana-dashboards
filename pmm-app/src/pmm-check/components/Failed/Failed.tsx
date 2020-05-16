import React, { FC } from 'react';
import { Tooltip, Icon } from '@grafana/ui';
import { FailedChecks } from 'pmm-check/types';
import { TooltipText } from './TooltipText';
import * as styles from './Failed.styles';

interface FailedProps {
  failed: FailedChecks;
}

export const Failed: FC<FailedProps> = ({ failed }) => {
  const sum = failed.reduce((acc, val) => acc + val, 0);
  return (
    <div>
      <span className={styles.FailedDiv}>
        {sum} ({failed.join(' / ')})
      </span>
      <Tooltip placement="top" theme="info" content={<TooltipText sum={sum} data={failed} />}>
        <Icon name="info-circle" />
      </Tooltip>
    </div>
  );
};
