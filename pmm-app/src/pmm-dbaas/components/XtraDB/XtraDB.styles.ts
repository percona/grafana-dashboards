import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => ({
  actionPanel: css`
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${theme.spacing.sm};
  `,
  tableWrapper: css`
    padding: ${theme.spacing.md};
  `,
});
