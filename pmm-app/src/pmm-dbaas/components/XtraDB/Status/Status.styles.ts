import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => ({
  status: css`
    background-color: ${theme.palette.gray1};
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    font-size: ${theme.typography.size.sm};
    opacity: 0.6;
    padding: 3px 15px;
    text-transform: uppercase;
  `,
  statusActive: css`
    background-color: ${theme.colors.formSwitchBgActive};
    label: active;
    opacity: 1;
  `,
});
