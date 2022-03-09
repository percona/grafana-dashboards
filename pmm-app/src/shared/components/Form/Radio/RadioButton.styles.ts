import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from '@emotion/css';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { colors, palette }: any = theme;
  const textColor = theme.isLight ? colors.text : palette.gray4;
  const textColorHover = theme.isLight ? palette.dark1 : palette.white;

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
    radioButtonDisabled: css`
      label: disabled;
      opacity: 0.6;
      pointer-events: none;
    `,
  };
});
