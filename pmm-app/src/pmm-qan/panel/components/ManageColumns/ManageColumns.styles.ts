import { css } from '@emotion/css';

import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getPmmTheme(theme);

  return {
    placeholder: css`
      font-size: 16px;
      color: ${parameters.mainTextColor};
    `,
    placeholderAdd: css`
      font-size: 14px;
      color: ${parameters.mainTextColor};
    `,
    placeholderPadding: css`
      padding-left: 3px;
    `,
    iconMargin: css`
      margin-right: 4px;
    `,
    dividerMargin: css`
      margin: 0 !important;
      margin-right: 4px !important;
    `,
    actionElement: css`
      padding: 4px 8px;
      cursor: pointer;
      background-color: #3d3d3d;
      transition: background 0.3s ease;
      &:hover {
        background-color: #2d2e2f;
      }
    `,
    metricsTooltip: css`
      display: flex;
      flex-direction: column;
    `,
    manageColumns: css`
      .ant-select-selection__rendered {
        margin: 0;
      }

      .ant-select-selection {
        background-color: transparent !important;
        border: none;
      }

      .ant-select-search__field {
        padding-left: 11px;
      }

      .ant-select-selection__placeholder {
        font-size: 16px;
        color: ${parameters.mainTextColor} !important;
        text-decoration: underline !important;
      }

      .ant-select-selection {
        border: none !important;
      }
    `,
    addColumns: css`
      .ant-select-selection {
        border-radius: 2px;
      }
    `,
    addColumnWrapper: css`
      width: 430px;
      background-color: rgba(47, 47, 50, 0.5);
      box-shadow: rgba(255, 255, 255, 0.1) -1px 0px 0px 0px, rgba(0, 0, 0, 0.3) 1px 1px 0px 0px;

      .fields__select-field .ant-slider-mark-text {
        color: white;
      }

      .fields__select-field .ant-select-selection__rendered,
      .fields__select-field .ant-select-selection {
        background-color: rgb(20, 20, 20);
        border-radius: 0;
      }

      .fields__select-field .ant-select-selection {
        border: 1px solid rgb(40, 40, 40);
      }

      .fields__select-field .ant-select-focused .ant-select-selection__rendered,
      .fields__select-field .ant-select-focused .ant-select-selection {
        background-color: rgb(20, 20, 20);
      }
      .fields__select-field .ant-select-selection-selected-value {
        color: white;
      }

      .fields__select-field .ant-select-arrow {
        color: white;
      }
      .ant-select-selection--single {
        height: 40px;
      }
      .ant-select-dropdown-menu {
        max-height: 270px;
        margin-bottom: 0;
      }
      .ant-empty {
        margin-top: 16px;
        text-align: center;
      }
    `,
  };
});
