import { css } from 'emotion';

import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { getThemeParameters } from 'shared/components/helpers/selectThemeVariant';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getThemeParameters(theme);

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
    collapse: css`
    background: #1f1d1d !important;
    margin-bottom: 10px !important;
    border-color: white !important;
    color: white !important;
    text-color: white !important;
  `,
    panel: css`
    background: transparent !important;
    margin-bottom: 10px !important;
    border: none !important;
    color: white !important;
    text-color: white !important;
  `,
  };
});
