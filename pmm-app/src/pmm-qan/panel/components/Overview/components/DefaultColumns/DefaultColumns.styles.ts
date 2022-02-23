import { css } from '@emotion/css';

import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const metricTextColor = theme.isLight ? '#202226' : 'rgba(32, 215, 255, 0.8)';
  const totalTextColor = theme.isLight ? 'red' : '#8AA4FF';

  return {
    getMainMetric: (isTotal) => css`
      word-wrap: break-word !important;
      word-break: break-word !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      max-width: calc(100% - 15px);
      color: ${isTotal ? totalTextColor : metricTextColor};
    `,
    metricWrapper: css`
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0 5px;
      justify-content: space-between;
    `,
    tooltipIcon: css`
      margin-left: auto;
    `,
  };
});
