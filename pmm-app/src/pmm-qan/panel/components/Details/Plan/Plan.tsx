import React, { FC } from 'react';
import sqlFormatter from 'sql-formatter';
import { Icon, Tooltip, useStyles } from '@grafana/ui';
import { PlanProps } from './Plan.types';
import { getStyles } from './Plan.styles';
import { Highlight } from '../../Highlight/Highlight';
import { Messages } from './Plan.messages';

export const Plan: FC<PlanProps> = ({ planId, planQuery }) => {
  const styles = useStyles(getStyles);

  return (
    <div className={styles.planWrapper}>
      <Highlight key={planQuery || ''} language="sql">
        {sqlFormatter.format(planQuery || '')}
      </Highlight>
      <div className={styles.tooltipWrapper}>
        <Tooltip placement="left" theme="info" content={`${Messages.planId} ${planId}`}>
          <Icon name="info-circle" />
        </Tooltip>
      </div>
    </div>
  );
};
