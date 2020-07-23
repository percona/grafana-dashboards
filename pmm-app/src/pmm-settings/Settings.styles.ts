import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getSettingsStyles = stylesFactory((theme: GrafanaTheme) => {
  const { spacing } = theme;

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
      font-size: ${theme.typography.size.sm};
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
      background-color: #3d3d3d;
      border: ${theme.border.width.sm} solid #c4c4c4;
      border-radius: ${theme.border.radius.sm};
      font-size: ${theme.typography.size.sm};
      line-height: ${theme.typography.lineHeight.md};
      padding: ${theme.spacing.formSpacingBase / 4}px ${theme.spacing.formSpacingBase}px;
    `,
  };
});
