import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  errorMessage: css`
    label: error;
    color: ${theme.palette.red};
    font-size: ${theme.typography.size.xs};
    height: ${theme.typography.size.xs};
    line-height: ${theme.typography.lineHeight.xs};
    margin-top: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.sm};
  `,
  invalid: css`
    input {
      border-color: ${theme.palette.red};
      &:hover {
        border-color: ${theme.palette.red};
      }
    }
  `,
}));
