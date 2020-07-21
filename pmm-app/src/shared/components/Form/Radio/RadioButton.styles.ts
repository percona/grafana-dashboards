import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { colors }: any = theme;

  return {
    radioButtonInput: css`
      position: absolute;
      opacity: 0;
    `,
    radioButtonLabel: css`
      align-items: center;
      background: ${colors.black};
      border: ${theme.border.width.sm} solid ${colors.pageHeaderBorder};
      border-radius: ${theme.border.radius.sm};
      color: ${colors.gray4};
      cursor: pointer;
      display: flex;
      height: 32px;
      margin-left: -1px;
      padding: 0px ${theme.spacing.lg};
      &:hover {
        color: ${colors.white};
      }
    `,
    radioButtonActive: css`
      background: ${colors.greenBase};
      border: ${theme.border.width.sm} solid ${colors.pageHeaderBorder};
      color: ${colors.white};      
      label: active;
    `,
  };
});
