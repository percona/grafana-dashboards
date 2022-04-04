import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from '@emotion/css';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  ptSummaryWrapper: css`
    background: ${theme.palette.dark2};
    border: ${theme.border.width.sm} solid ${theme.colors.pageHeaderBorder};
    border-radius: ${theme.border.radius.sm};
    font-size: ${theme.typography.size.sm};
    height: 100%;
  `,
  ptSummary: css`
    background: ${theme.palette.dark2};
    border: none;
    color: ${theme.palette.white};
    height: 100%;
    margin: 0;
  `,
}));
