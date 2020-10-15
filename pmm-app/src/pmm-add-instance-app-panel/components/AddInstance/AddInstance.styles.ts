import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  console.log(theme);

  return {
    navigationButton: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 10px;
      border-radius: 10px;
      width: 240px;
      height: 170px;
      text-align: center;
      background-color: transparent;
      border: 1px dashed ${theme.colors.border2};

      :hover {
        cursor: pointer;
        background-color: ${theme.colors.dropdownOptionHoverBg};
        border: 1px solid ${theme.colors.border2};
      }
    `,
    navigationPanel: css`
      display: flex;
      flex-direction: row;
      justify-content: start;
      flex-wrap: wrap;
      max-width: 800px;
      width: 100%;
      overflow: hidden;
    `,
    content: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
    addInstance: css`
      margin-top: 10px;
    `,
    addInstanceTitle: css`
      margin-top: 5px;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 65%;
      height: 1.5em;
      white-space: nowrap;
    `,
  };
});
