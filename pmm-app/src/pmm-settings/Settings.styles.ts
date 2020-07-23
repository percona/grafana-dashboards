import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getSettingsStyles = stylesFactory((theme: GrafanaTheme) => {
  const { spacing } = theme;
  const { colors }: any = theme;
  const input = `
    background-color: ${colors.formInputBg};
    border: ${theme.border.width.sm} solid ${colors.pageHeaderBorder};
    border-radius: ${theme.border.radius.sm};
    font-size: ${theme.typography.size.sm};
    padding: ${theme.spacing.formSpacingBase / 4}px ${theme.spacing.formSpacingBase}px;
  `;

  return {
    settingsWrapper: css`
      display: flex;
      margin-top: ${spacing.lg};
    `,
    settingsLoading: css`
      align-items: center;
      display: flex;
    `,
    tabsWrapper: css`
      margin-right: 40px;
      height: fit-content;
      width: 230px;
    `,
    tabContentWrapper: css`
      border-left: ${theme.border.width.sm} solid ${theme.colors.pageHeaderBorder};
      padding: 0 0 0 60px;
    `,
    diagnosticsWrapper: css`
      align-items: flex-end;
      display: flex;
      flex: 1;
      flex-direction: column;
    `,
    labelWrapper: css`
      display: flex;
      i {
        margin-left: ${theme.spacing.xs};
      }
    `,
    actionButton: css`
      margin-top: ${theme.spacing.sm};
      width: fit-content;
      i {
        margin-right: ${theme.spacing.sm}
      }
      span {
        display: flex;
      }
    `,
    textarea: css`
      ${input}
      line-height: ${theme.typography.lineHeight.md};
    `,
    input: css`
      ${input}
      min-height: ${theme.height.md};
    `,
  };
});
