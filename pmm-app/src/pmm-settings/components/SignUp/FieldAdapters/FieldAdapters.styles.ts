import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  errorMessage: css`
    color: ${(theme.colors as any).red};
    font-size: 10px;
    height: 10px;
    line-height: 1;
    margin-top: 3px;
  `,
}));
