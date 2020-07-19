import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { colors }: any = theme;

  return {
    tabsWrapper: css`
      background: ${colors.dark3};
    `,
    tabs: css`
      li {
        border: solid ${colors.pageHeaderBorder};
        border-radius: ${theme.border.radius.md} ${theme.border.radius.md} 0 0;
        border-width: ${theme.border.width.sm};
        border-bottom: 0;
        margin: 0;
        &::before {
          background-image: linear-gradient(#f05a28 30%, #fbca0a 99%);
          height: 100%;
          width: 2px;
        }
        &:last-child {
          border-bottom: ${theme.border.width.sm} solid ${colors.pageHeaderBorder};
          border-radius: ${theme.border.radius.md} ${theme.border.radius.md} 0 0;
        }
      }
    `,
  };
});
