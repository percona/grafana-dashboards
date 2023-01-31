import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme2) => {
  return {
  componentStyle: css`
        width: 100%;
    `,
  toolbar: css`
      align-items: center;
      height: 64px;
      background: ${theme.colors.background.canvas};
      display: flex;
      gap: ${theme.spacing(2)};
      justify-content: space-between;
      padding: ${theme.spacing(1.5, 2)};
    `,
  pmmIconHolder: css`
        display: inline-block;
        line-height: 0;
    `,
  pmmIcon: css`
        height: 32px;
        width: 32px;
    `,
  leftWrapper: css`
        display: flex;
        flex-wrap: nowrap;
        max-width: 70%;
    `,
  navElement: css`
        display: flex;
        align-items: center;
        min-width: 0;
    `,
  titleWrapper: css`
        display: flex;
        margin: 0;
        min-width: 0;
    `,
  pageIcon: css`
        display: flex;
        padding-right: 15px;
        align-items: center;
    `,
  h1Styles: css`
        margin: 0;
        line-height: inherit;
        flex-grow: 1;
        min-width: 0;
    `,
  titleText: css`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0.01071em;
    flex: none;
    order: 0;
    flex-grow: 1;
    `,
  qNotificationMaker: css`
    position: absolute;
    width: 8px;
    height: 8px;
    right: -3px;
    top: -3px;

    background: #FF5286;

    border: 2px solid #111217;
    border-radius: 16px;

    flex: none;
    order: 6;
    flex-grow: 0;
    z-index: 6;
  `,
  notificationMaker: css`
    position: absolute;
    width: 8px;
    height: 8px;
    right: 37px;
    top: -3px;
    background: #FF5286;
    border: 2px solid #111217;
    border-radius: 16px;
    flex: none;
    order: 4;
    flex-grow: 0;
    z-index: 4;
  `,
}}
