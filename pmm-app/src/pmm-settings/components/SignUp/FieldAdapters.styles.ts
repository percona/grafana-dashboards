import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  errorMessage: css`
    font-size: 10px;
    height: 10px;
    margin-top: 2px;
    color: ${(theme.colors as any).red};
  `,
}));
