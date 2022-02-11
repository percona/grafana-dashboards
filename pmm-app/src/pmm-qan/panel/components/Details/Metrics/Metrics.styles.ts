import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';

export const getStyles = (theme: GrafanaTheme2) => {
  const parameters = getPmmTheme(theme.v1);

  return {
    metricColumn: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      word-break: keep-all;
      color: ${parameters.mainTextColor} !important;
    `,
    metricTooltip: css`
      text-align: center;
    `,
    metricTooltipIcon: css`
      margin-left: auto;
    `,
    sum: css`
      margin-right: 10px;
      min-width: 65px;
      display: inline-block;
    `,
    percentOfTotal: css`
      color: rgba(138, 164, 255, 0.8);
      margin-left: 5px;
      min-width: 90px;
      display: inline-block;
    `,
    complexMetric: css`
      color: rgba(223, 159, 85, 0.8);
      min-width: 90px;
      display: inline-block;
    `,
    metricData: css`
      white-space: pre;
      color: ${parameters.mainTextColor} !important;
    `,
    sparkline: css`
      margin-left: 5px;
      margin-right: 5px;
    `,
    perQueryStats: css`
      margin-right: 10px;
    `,
    histogramWrapper: css`
      width: 100%;
    `,
  };
};
