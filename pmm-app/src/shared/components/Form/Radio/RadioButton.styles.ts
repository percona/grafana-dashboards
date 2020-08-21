import { stylesFactory, selectThemeVariant } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { colors, palette }: any = theme;
  const textColor = selectThemeVariant(
    { light: colors.text, dark: palette.gray4 },
    theme.type,
  );
  const textColorHover = selectThemeVariant(
    { light: palette.dark1, dark: palette.white },
    theme.type,
  );

  return {
    radioButtonInput: css`
      position: absolute;
      opacity: 0;
    `,
    radioButtonLabel: css`
      align-items: center;
      background: ${colors.formInputBg};
      border: ${theme.border.width.sm} solid ${colors.pageHeaderBorder};
      border-radius: ${theme.border.radius.sm};
      color: ${textColor};
      cursor: pointer;
      display: flex;
      height: 32px;
      margin-left: -1px;
      padding: 0px ${theme.spacing.lg};
      &:hover {
        color: ${textColorHover};
      }
    `,
    radioButtonActive: css`
      background: ${palette.greenBase};
      border: ${theme.border.width.sm} solid ${colors.pageHeaderBorder};
      color: ${palette.white};      
      label: active;
      &:hover {
        color: ${palette.white};
      }
    `,
  };
});
