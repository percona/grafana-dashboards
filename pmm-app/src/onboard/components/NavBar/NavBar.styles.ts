import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme2) => ({
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
    color: ${theme.colors.text.primary}
    `,
  notificationMaker: css`
    position: absolute;
    width: 10px;
    height: 10px;
    right: -3px;
    top: -3px;
    background: #FF5286;
    border: 2px solid ${theme.colors.background.canvas};
    border-radius: 16px;
    flex: none;
    order: 6;
    flex-grow: 0;
    z-index: 6;
  `,
  perconaButton: css`
    color: ${theme.colors.text.secondary};

    &:hover {
      color: ${theme.colors.text.primary};
      background: ${theme.colors.background.secondary};
    }

    border-radius: ${theme.shape.borderRadius()};
    line-height: ${theme.components.height.md * theme.spacing.gridSize - 2}px;
    font-weight: ${theme.typography.fontWeightMedium};
    border: 1px solid ${theme.colors.border.weak};

    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 0px 0px 0px;

    border-radius: ${theme.shape.borderRadius()};
    background-color: rgb(24, 27, 31);

    flex: none;
    order: 0;
    flex-grow: 0;
    z-index: 0;
  `,
  perconaButtonImage: css`
    width: 32px;
    height: 32px;
    margin-right: 8px;
    flex: none;
    order: 0;
    flex-grow: 0;
  `,
  perconaButtonLabel: css`
    padding: 8px;
    justify-content: center;
    width: 97px;
    height: 16px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;

    margin-right: 8px;
    flex: none;
    order: 1;
    flex-grow: 0;
  `,
  tooltip: css`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;

    letter-spacing: 0.01071em;

    /* Dark/Text/Secondary */

    color: ${theme.colors.text.secondary};
    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    margin-right: 24px;
  `,
  tooltipLabel: css`

  `,

});
