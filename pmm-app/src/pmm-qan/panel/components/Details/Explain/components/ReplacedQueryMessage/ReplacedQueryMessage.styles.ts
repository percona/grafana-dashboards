import { css } from '@emotion/css';

import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getPmmTheme(theme);

  return {
    wrapper: css`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      word-break: keep-all;
      color: ${parameters.mainTextColor} !important;
      margin: ${theme.spacing.sm} 0;

      border: ${theme.border.width.sm} solid ${theme.colors.pageHeaderBorder};
      border-radius: ${theme.border.radius.sm};
      padding: ${theme.spacing.sm};
    `,
    text: css`
      margin-right: ${theme.spacing.sm};
    `,
  };
});
