import { css } from '@emotion/css';
import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getPmmTheme(theme);

  return {
    tooltipHeader: css`
      padding: 10px;
      padding-left: 30px;
      font-size: 14px;
    `,
    tooltipDivider: css`
      background: #363434 !important;
      margin: 0 !important;
    `,
    tooltipLatencyDivider: css`
      background: #666666 !important;
      margin: 0 !important;
    `,
    metricsWrapper: css`
      padding-left: 20px !important;
      padding-right: 20px !important;
      padding-bottom: 10px !important;
    `,
    singleMetricWrapper: css`
      margin-top: 15px !important;
      margin-bottom: 15px !important;
    `,
    metricName: css`
      margin-left: 10px !important;
    `,
    metricsListDivider: css`
      background: #a9a9a9 !important;
      margin: 0 !important;
    `,
    summarize: (value) => css`
      margin-left: 'auto';
      cursor: ${value && value !== 'NaN' ? 'help' : ''};
      color: ${parameters.mainTextColor};
    `,
    metricStyle: css`
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    `,
  };
});
