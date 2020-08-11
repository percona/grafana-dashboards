import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { colors }: any = theme;

  return {
    ptSummaryWrapper: css`
      background: ${colors.dark2};
      border: ${theme.border.width.sm} solid ${colors.pageHeaderBorder};
      border-radius: ${theme.border.radius.sm};
      font-size: ${theme.typography.size.sm};
      height: 100%;
    `,
    ptSummary: css`
      background: ${colors.dark2};
      border: none;
      color: ${colors.white};
      height: 100%;
      margin: 0;
    `,
  };
});
