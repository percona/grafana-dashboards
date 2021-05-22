import React from 'react';
import { Info } from 'shared/components/Elements/Icons';
import { QueryTooltip } from 'shared/components/Elements/QueryTooltip/QueryTooltip';
import { useTheme } from '@grafana/ui';
import { getStyles } from './ReplacedQueryMessage.styles';
import { Messages } from '../../../Details.messages';

export const ReplacedQueryMessage = ({ isVisible, originalQuery }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>{Messages.isDML}</span>
      <QueryTooltip query={originalQuery}>
        <Info />
      </QueryTooltip>
    </div>
  );
};
