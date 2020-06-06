import { css } from 'emotion';

export const styles = {
  tooltipHeader: css`
    padding: 10px;
    padding-left: 30px;
    font-size: 14px;
  `,
  tooltipDivider: css`
    background: #363434;
    margin: 0;
  `,
  tooltipLatencyDivider: css`
    background: #666666;
    margin: 0;
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
    color: 'rgba(255,255,255,0.8)';
  `,
  metricStyle: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
};
