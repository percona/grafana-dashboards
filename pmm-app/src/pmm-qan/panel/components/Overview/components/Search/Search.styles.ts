import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from '@emotion/css';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  searchWrapper: css`
    align-items: center;
    display: flex;
    margin-left: ${theme.spacing.sm};
    justify-content: flex-end;
    width: 100%;
  `,
  searchInput: css`
    max-width: 150px;
    input {
      background: transparent;
      border: none;
      box-shadow: none;
      &::placeholder {
        color: ${theme.colors.textWeak};
      }
      &:focus {
        box-shadow: none;
      }
    }
  `,
  searchButton: css`
    background: transparent;
    border: none;
    &:focus,
    &:hover {
      background: transparent;
      border: none;
      box-shadow: none;
    }
    svg {
      &:hover {
        color: ${theme.colors.linkHover};
      }
    }
  `,
}));
