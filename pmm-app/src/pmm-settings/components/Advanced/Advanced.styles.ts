import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  advancedWrapper: css`
    form {
      width: 300px;
    }
  `,
  advancedRow: css`
    display: flex;
    padding-bottom: ${theme.spacing.md};
  `,
  advancedCol: css`
    align-items: center;
    display: flex;
    width: 180px;
  `,
  retentionInputWrapper: css`
    align-items: center;
    display: flex;
    input {
      width: 60px;
    }
    div {
      margin: 0;
      div[class*="-error"] {
        position: absolute;
      }
    }
  `,
  retentionUnitslabel: css`
    font-size: ${theme.typography.size.sm};
    margin-left: ${theme.spacing.sm};
  `,
  switchDisabled: css`
    label: disabled;
    opacity: 0.6;
  `,
}));
