import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({ spacing, typography, colors }: GrafanaTheme) => ({
  stepProgressWrapper: css`
    overflow: hidden;

    div[class$='-current'] {
      overflow: auto;
    }
  `,
  warningIcon: css`
    fill: red;
    height: 30px;
    width: 30px;
    margin-right: 10px;
  `,
  settingsLink: css`
    color: ${colors.linkExternal};
    &:hover {
      color: ${colors.linkExternal};
    }
  `,
  warningWrapper: css`
    align-items: center;
    display: flex;
  `,
  warningMessage: css`
    font-size: ${typography.size.md};
    margin-left: ${spacing.xs};
  `,
});
