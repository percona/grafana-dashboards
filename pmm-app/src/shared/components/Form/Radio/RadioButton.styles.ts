import { stylesFactory, selectThemeVariant } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { colors }: any = theme;
  const textColor = selectThemeVariant(
    { light: colors.text, dark: colors.gray4 },
    theme.type,
  );
  const textColorHover = selectThemeVariant(
    { light: colors.dark1, dark: colors.white },
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
      background: ${colors.greenBase};
      border: ${theme.border.width.sm} solid ${colors.pageHeaderBorder};
      color: ${colors.white};      
      label: active;
      &:hover {
        color: ${colors.white};
      }
    `,
  };
});
