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
    margin-left: 5px;
  `,
  sum: css`
    margin-right: 10px;
    min-width: 65px;
    display: inline-block;
  `,
  percentOfTotal: css`
    color: #26afe1;
    margin-left: 5px;
    min-width: 90px;
    display: inline-block;
  `,
  complexMetric: css`
    color: #268b40;
    min-width: 90px;
    display: inline-block;
  `,
  perQueryStats: css`
    margin-right: 10px;
  `,
};
