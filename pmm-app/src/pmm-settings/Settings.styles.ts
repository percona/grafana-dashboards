import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getSettingsStyles = stylesFactory((theme: GrafanaTheme) => {
  const { spacing } = theme;
  const { colors }: any = theme;
  const mq = `@media (max-width: ${theme.breakpoints.md})`;
  const input = css`
    background-color: ${colors.formInputBg};
    border: ${theme.border.width.sm} solid ${colors.pageHeaderBorder};
    border-radius: ${theme.border.radius.sm};
    font-size: ${theme.typography.size.sm};
    padding: ${theme.spacing.formSpacingBase / 4}px ${theme.spacing.formSpacingBase}px;
    ${mq} {
      width: 100%;
    }
  `;

  return {
    settingsWrapper: css`
      display: flex;
      margin-top: ${spacing.lg};
      ${mq} {
        flex-direction: column;
      }
    `,
    settingsLoading: css`
      align-items: center;
      display: flex;
    `,
    tabsWrapper: css`
      margin-right: 40px;
      height: fit-content;
      width: 230px;
      ${mq} {
        margin-right: 0;
        margin-bottom: ${spacing.lg};
        width: 100%;
      }
    `,
    tabContentWrapper: css`
      border-left: ${theme.border.width.sm} solid ${theme.colors.pageHeaderBorder};
      padding: 0 0 0 60px;
      position: relative;
      width: 100%;
      ${mq} {
        border: none;
        padding: 0;
        margin-bottom: ${spacing.lg};
      }
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
