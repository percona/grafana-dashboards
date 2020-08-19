import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  searchWrapper: css`
    align-items: center;
    display: flex;
    margin-left: ${theme.spacing.sm};
    width: 100%;
  `,
  searchInput: css`
    background: transparent;
    border: none;
    box-shadow: none;
    &::placeholder {
      color: ${theme.colors.textWeak};
    }
    &:focus {
      box-shadow: none;
    }
  `,
  searchButton: css`
    background: transparent;
    &:focus,
    &:hover {
      background: transparent;
    }
    i {
      &:hover {
        color: ${theme.colors.linkHover};
      }
    }
  `,
}
));
