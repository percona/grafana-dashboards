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
      font-size: 12px;
      margin-top: ${theme.spacing.sm};
      width: fit-content;
      i {
        margin-right: ${theme.spacing.sm}
      }
      span {
        display: flex;
      }
    `
  };
});
