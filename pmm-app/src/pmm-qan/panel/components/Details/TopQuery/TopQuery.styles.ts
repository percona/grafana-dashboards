import { css } from 'emotion';
import { selectThemeVariant } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const metricTextColor = selectThemeVariant(
    { light: '#202226', dark: 'rgba(32, 215, 255, 0.8)' },
    theme.type,
  );

  return {
    query: css`
      cursor: pointer;
      word-wrap: break-word !important;
      word-break: break-word !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      max-width: calc(100% - ${theme.spacing.lg});
      color: ${metricTextColor};
      position: absolute;
    `,
    wrapper: css`
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0 5px;
      justify-content: space-between;
      position: relative;
    `,
    tooltipIcon: css`
      margin-left: auto;
    `,
  };
};
