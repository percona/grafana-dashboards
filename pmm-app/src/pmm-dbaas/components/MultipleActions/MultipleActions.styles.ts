import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  menu: css`
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    z-index: 9999;
    background: ${theme.colors.dropdownBg};
    border-radius: ${theme.border.radius.sm};
    overflow: hidden;
    box-shadow: 0px 0px 6px rgba(37, 40, 43, 0.12);
    padding-top: ${theme.spacing.sm};
    padding-bottom: ${theme.spacing.sm};
    min-width: 150px;
  `,
  menuWrapper: css`
    position: absolute;
  `,
  menuItem: css`
    position: relative;
    border: none;
    background-color: transparent;
    color: ${theme.colors.text};
    padding: ${theme.spacing.sm};
    text-align: left;

    :hover {
      color: ${theme.colors.text};
      background-color: ${theme.colors.dropdownOptionHoverBg};
    }
  `,
  showMenu: css`
    background-color: transparent;
    border: none;
  `,
  showMenuOpen: css`
    color: green;
  `,
  action: css`
    white-space: nowrap;
  `,
}));
