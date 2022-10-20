import { css } from '@emotion/css';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({ spacing }: GrafanaTheme) => ({
  container: css`
    padding: ${spacing.md};
  `,
  follow: css`
    padding-bottom: ${spacing.md};
  `,
  description: css`
    padding-top: ${spacing.md};
  `,
});
