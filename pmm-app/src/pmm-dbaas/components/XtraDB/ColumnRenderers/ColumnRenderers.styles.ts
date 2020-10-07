import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => ({
  clusterStatusWrapper: css`
    align-items: center;
    display: flex;
    justify-content: center;
    padding: ${theme.spacing.xs} 0;
    span:not(:first-child) {
      margin-left: ${theme.spacing.sm};
    }
  `,
});
