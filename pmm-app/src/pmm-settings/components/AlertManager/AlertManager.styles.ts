import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  alertManagerWrapper: css`
    display: flex;
    flex-direction: column;
  `,
  textarea: css`
    margin: ${theme.spacing.md} 0;
    min-height: 150px;
    width: 330px;
  `,
  input: css`
    margin: ${theme.spacing.md} 0;
  `,
  rulesLabel: css`
    margin-top: ${theme.spacing.sm};
  `,
}));
