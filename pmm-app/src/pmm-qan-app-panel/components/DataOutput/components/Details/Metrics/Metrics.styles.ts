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
    color: rgba(138, 164, 255, 0.8);
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
  collapse: css`
    background: #1f1d1d !important;
    margin-bottom: 10 !important;
    border: 1 !important;
    border-color: white !important;
    color: white !important;
    text-color: white !important;
  `,
  panel: css`
    background: transparent !important;
    margin-bottom: 10 !important;
    border: 1 !important;
    border-color: black !important;
    color: white !important;
    text-color: white !important;
  `,
};
