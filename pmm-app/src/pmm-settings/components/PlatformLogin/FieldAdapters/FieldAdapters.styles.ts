import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  errorMessage: css`
    color: ${(theme.colors as any).red};
    font-size: ${theme.typography.size.xs};
    height: ${theme.typography.size.xs};
    line-height: ${theme.typography.lineHeight.xs};
    margin-top: ${theme.spacing.xs};
  `,
}));
