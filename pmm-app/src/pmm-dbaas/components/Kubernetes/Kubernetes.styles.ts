import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  actionPanel: css`
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${theme.spacing.sm};
  `,
  tableWrapper: css`
    padding: ${theme.spacing.md};
  `,
  deleteModalContent: css`
    margin-bottom: ${theme.spacing.xl};
  `,
}));
