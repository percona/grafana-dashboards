import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  content: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
}));
