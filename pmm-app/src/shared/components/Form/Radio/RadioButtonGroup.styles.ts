import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from '@emotion/css';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const mq = `@media (max-width: ${theme.breakpoints.md})`;

  return {
    radioButtonGroup: css`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    ${mq} {
      flex-direction: column;
      label {
        justify-content: center;
      }
    }
  `,
  };
});
