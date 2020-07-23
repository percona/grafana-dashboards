import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  resolutionsWrapper: css`
      display: flex;
      flex-direction: column;
    `,
  resolutionsRadioButtonGroup: css`
      font-size: 12px;
      padding: ${theme.spacing.lg} 0 ${theme.spacing.xl} 0;
    `,
  resolutionInput: css`
      margin-bottom: ${theme.spacing.md};
    `,
}));
