import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { colors }: any = theme;

  return {
    advancedWrapper: css`
      table {
        width: 300px;
      }
      tr {
        border-bottom: ${theme.spacing.md} solid transparent;
      }
      .gf-form-switch  {
        background: none;
        border: none;
        display: flex;
        height: fit-content;
        justify-content: left;
      }
      input:checked+.gf-form-switch__slider {
        background: ${colors.blue95};
      }
    `,
    retentionInput: css`
      width: 70px;
    `,
    label: css`
      font-size: ${theme.typography.size.sm};
    `,
    retentionUnitslabel: css`
      font-size: ${theme.typography.size.sm};
      margin-left: ${theme.spacing.sm};
    `,
    switchDisabled: css`
      label: disabled;
      opacity: 0.6;
      pointer-events: none;
      .gf-form-switch-container-react {
        cursor: not-allowed;
      }
    `,
  };
});
