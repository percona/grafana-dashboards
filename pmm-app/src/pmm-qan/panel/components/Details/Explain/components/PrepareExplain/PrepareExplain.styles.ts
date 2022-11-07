import { css } from '@emotion/css';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({ spacing }: GrafanaTheme) => ({
  aside: css`
    display: flex;
    flex-direction: row;
  `,
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
