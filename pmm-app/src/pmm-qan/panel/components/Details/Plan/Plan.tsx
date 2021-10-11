import React, { FC } from 'react';
import sqlFormatter from 'sql-formatter';
import { Icon, Tooltip, useStyles } from '@grafana/ui';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { getStyles } from './Plan.styles';
import { Highlight } from '../../Highlight/Highlight';
import { Messages } from './Plan.messages';
import { usePlan } from './Plan.hooks';
import { OVERLAY_LOADER_SIZE } from '../Details.constants';

export const Plan: FC = () => {
  const styles = useStyles(getStyles);
  const [plan, loading] = usePlan();

  return (
    <Overlay isPending={loading} size={OVERLAY_LOADER_SIZE}>
      <div className={styles.planWrapper}>
        {plan ? (
          <>
            <Highlight key={plan?.id || ''} language="sql">
              {sqlFormatter.format(plan?.plan || '')}
            </Highlight>
            <div className={styles.tooltipWrapper}>
              <Tooltip placement="left" theme="info" content={`${Messages.planId} ${plan?.id}`}>
                <Icon name="info-circle" />
              </Tooltip>
            </div>
          </>
        ) : (
          !loading && <pre>{Messages.noPlan}</pre>
        )}
      </div>
    </Overlay>
  );
};
