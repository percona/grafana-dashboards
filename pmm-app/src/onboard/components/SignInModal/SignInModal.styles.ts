import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme2) => ({
  test: css`
    background: ${theme.colors.background}
  `,
  leftPane: css`
    /* USPs */
    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;

    width: 352px;
    height: 524px;

    /* Dark/Border/Weak */

    background: rgba(204, 204, 220, 0.07);
    border-radius: 8px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 1;
  `,
  leftPaneLogo: css`
    border-radius: 8px 8px 0px 0px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  `,
  leftPaneTitle: css`
    padding: 8px;
    text-align: center;
    width: 100%
  `,
  liStyle: css`
    white-space: pre-wrap
  `,
  labelTitle: css`
    font-size: ${theme.typography.bodySmall.fontSize};
    padding: ${theme.spacing(0.5, 0, 0.5, 0)};
  `,
  inputStyle: css`
    width: "fill-content";
  `,
  rightPaneGroup: css`
    width: 100%
  `,
  linkStyle: css`
    color: ${theme.colors.text.link}
  `,
  rightPane: css`
    width: 330px;
  `,
  divider: css`
    width: 300px;
    borderBottom: '1px solid ${theme.colors.border.weak}',
    height: '1px',
    margin: ${theme.spacing(1)} 0,
    overflow: 'hidden',
  `,
});
