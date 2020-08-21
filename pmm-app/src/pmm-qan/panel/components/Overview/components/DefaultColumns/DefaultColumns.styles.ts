import { css } from 'emotion';

import { selectThemeVariant, stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const metricTextColor = selectThemeVariant(
    // @ts-ignore
    { light: '#202226', dark: 'rgba(32, 215, 255, 0.8)' },
    theme.type,
  );

  const totalTextColor = selectThemeVariant(
    // @ts-ignore
    { light: 'red', dark: '#8AA4FF' },
    theme.type,
  );

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
    `,
    tooltipIcon: css`
  margin-left: auto;
`
  };
});
