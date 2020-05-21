import { css } from 'emotion';

export const Styling = {
  metricColumn: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    color: #8aa4ff;
    margin-left: 5px;
    min-width: 90px;
    display: inline-block;
  `,
  complexMetric: css`
    color: #268b40;
    min-width: 90px;
    display: inline-block;
  `,
  metricData: css`
    white-space: pre;
  `,
  sparkline: css`
    margin-left: 5px;
    margin-right: 5px;
  `,
  perQueryStats: css`
    margin-right: 10px;
  `,
};
