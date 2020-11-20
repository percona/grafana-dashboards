import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({
  spacing,
  typography,
}: GrafanaTheme) => ({
  addClusterButtonWrapper: css`
    align-items: center;
    display: flex;
    flex-direction: column;
  `,
  warningWrapper: css`
    align-items: center;
    display: flex;
  `,
  warningMessage: css`
    font-size: ${typography.size.sm};
    margin-left: ${spacing.xs};
  `,
});
