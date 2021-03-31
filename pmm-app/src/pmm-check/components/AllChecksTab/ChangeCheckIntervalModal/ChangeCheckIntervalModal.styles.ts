import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => ({
  title: css`
    margin-bottom: ${theme.spacing.xl};
  `,
  content: css`
    margin-bottom: ${theme.spacing.xl};
    text-align: center;
    word-break: break-word;
  `,
  form: css`
    display: inline-flex;
  `,
});
