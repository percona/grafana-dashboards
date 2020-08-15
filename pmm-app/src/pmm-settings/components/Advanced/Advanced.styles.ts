import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  advancedWrapper: css`
    table {
      width: 300px;
    }
    tr {
      border-bottom: ${theme.spacing.md} solid transparent;
    }
  `,
  retentionInputWrapper: css`
    align-items: center;
    display: flex;
    input {
      width: 60px;
    }
    div {
      margin: 0;
      div:nth-child(2) {
        position: absolute;
        z-index: 2;
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
