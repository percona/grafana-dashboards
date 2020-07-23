import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { colors }: any = theme;

  return {
    diagnosticsWrapper: css`
      align-items: flex-end;
      display: flex;
      flex: 1;
      flex-direction: column;
    `,
    diagnosticsLabel: css`
      display: flex;
      i {
        margin-left: ${theme.spacing.xs};
      }
    `,
    diagnosticsButton: css`
      background: linear-gradient(180deg, ${colors.gray15} 0%, #292c31 100%);
      border: ${theme.border.width.sm} solid ${colors.gray25};
      font-size: ${theme.typography.size.sm};
      margin-top: ${theme.spacing.md};
      &:hover {
        background: ${colors.gray15};
      }
    `
  };
});
