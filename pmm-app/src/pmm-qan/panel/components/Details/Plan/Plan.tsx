import React, { FC } from 'react';
import { Icon, useStyles, Tooltip } from '@grafana/ui';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { Highlight } from 'shared/components/Hightlight/Highlight';
// import Tippy from '@tippyjs/react';
import { getStyles } from './Plan.styles';
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
              {plan?.plan || ''}
            </Highlight>
            <div className={styles.tooltipWrapper}>
              <Tooltip
                interactive
                placement="left"
                content={`${Messages.planId} ${plan?.id}`}
              >
                <div>
                  <Icon name="info-circle" />
                </div>
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
