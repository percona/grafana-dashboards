import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory, selectThemeVariant } from '@grafana/ui';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const backgroundColor = selectThemeVariant(
    { dark: (theme.colors as any).dark4, light: (theme.colors as any).gray6 },
    theme.type,
  );

  return {
    inputLabel: css`
      align-items: center;
      background-color: ${backgroundColor};
      border-radius: ${theme.border.radius.md} 0 0 ${theme.border.radius.md};
      color: ${theme.colors.text};
      display: flex;
      font-family: ${theme.typography.fontFamily.sansSerif};
      font-size: ${theme.typography.size.md};
      height: 100%;
      min-width: 80px;
      padding: 0 8px 0 12px;
    `,
  };
});
