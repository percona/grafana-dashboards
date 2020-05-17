import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { selectThemeVariant, stylesFactory } from '@grafana/ui';

/**
 * NOTE: These styles may be used to create a theme for PMM
 */
export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const backgroundColor = selectThemeVariant(
    { light: 'rgb(247, 247, 249)', dark: 'rgb(22, 23, 25)' },
    theme.type
  );
  const borderColor = selectThemeVariant(
    { light: theme.colors.gray85, dark: theme.colors.dark7 },
    theme.type
  );
  const cellPadding = '12px 8px';
  const headerPadding = '10px 8px';

  return {
    wrapper: css`
      overflow: auto;
      background-color: ${backgroundColor};
    `,
    caption: css`
      font-size: ${theme.typography.heading.h5};
      padding: ${headerPadding};
      border: 1px solid transparent;
    `,
    table: css`
      border-collapse: collapse;
      border: 1px solid ${borderColor};
      border-spacing: 0;
      background-color: ${backgroundColor};
      color: ${theme.colors.text};
      width: 100%;

      thead {
        tr {
          th {
            padding: ${cellPadding};
            border: 1px solid ${borderColor};
            word-wrap: break-word;
          }
        }
      }
      tbody {
        tr {
          td {
            padding: ${cellPadding};
            border: 1px solid ${borderColor};
          }
        }
      }
    `,
    empty: css`
      font-size: larger;
      display: flex;
      width: 100%;
      height: 160px;
      justify-content: center;
      align-items: center;
      border: 1px solid ${borderColor};
    `,
    link: css`
      color: ${theme.colors.linkExternal};
      &:hover {
        color: ${theme.colors.blueLight};
      }
    `,
  };
});
