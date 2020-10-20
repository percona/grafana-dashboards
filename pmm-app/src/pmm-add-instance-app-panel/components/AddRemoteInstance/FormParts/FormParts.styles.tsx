import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  groupWrapper: css`
    width: 50%;
  `,
  addServiceButton: css`
    margin-top: 30px;
  `
}));
