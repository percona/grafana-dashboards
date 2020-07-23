import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  sshKeyWrapper: css`
      display: flex;
      flex-direction: column;
    `,
  textarea: css`
      margin: ${theme.spacing.md} 0;
      min-height: 150px;
      width: 330px;
    `,
}));
