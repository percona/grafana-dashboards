import React, { FC } from 'react';
import { PanelProps } from '@grafana/data';
import { useTheme } from '@grafana/ui';
import { getStyles } from './PTSummary.styles';

export const PTSummaryPanel: FC<PanelProps> = ({ data }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const series = data.series[0];
  const summary: any = series?.fields.find((f) => f.name === 'summary');
  const fingerprint = summary?.values.buffer[0];

  return (
    <div className={styles.ptSummaryWrapper}>
      <pre className={styles.ptSummary}>{fingerprint}</pre>
    </div>
  );
};
