import { css } from '@emotion/css';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({ spacing }: GrafanaTheme) => ({
  container: css`
    display: flex;
    flex-direction: column;
    padding: ${spacing.md};
  `,
  follow: css`
    padding-bottom: ${spacing.md};
  `,
  description: css`
    padding-top: ${spacing.md};
  `,
  field: css`
    margin-bottom: ${spacing.md};
  `,
  form: css`
    max-width: 600px;
    width: 100%;
  `,
});
