import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from '@emotion/css';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';

export const getCheckboxStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getPmmTheme(theme);

  return {
    checkboxContainer: css`
      --checkbox-size: 14px;
      --checkbox-border: rgb(123, 123, 123);
      --checkbox-color: rgb(211, 211, 211);

      position: relative;
      cursor: pointer;

      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 10px;

      text-align: left;

      user-select: none;
      font-weight: 300;

      /* Hide the browser's default checkbox */
      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      &.no-gap {
        grid-column-gap: 0;
      }

      /* Styles for main (first) checkbox when it is unchecked*/
      .checkbox-container__main-input ~ span {
        opacity: 0.6;
      }

      /* Styles for main (first) checkbox when it is checked*/
      .checkbox-container__main-input:checked ~ span {
        opacity: 1;
      }

      /* Create a custom checkbox */
      .checkbox-container__checkmark {
        width: 20px;
        height: 20px;

        color: var(--checkbox-color);
        border: 1px solid var(--checkbox-border);
        background: var(--page-background);
      }

      /* Create the checkmark/indicator (hidden when not checked) */
      .checkbox-container__checkmark:after {
        content: '';

        display: none;
      }

      /* Show the checkmark when checked */
      input:checked ~ .checkbox-container__checkmark:after {
        display: block;
      }

      /* Style the checkmark/indicator */
      .checkbox-container__checkmark:after {
        margin: 0 auto;
        width: calc(var(--checkbox-size) / 2);
        height: var(--checkbox-size);

        transform: rotate(45deg);
        border: solid ${parameters.mainTextColor};
        border-width: 0 2px 2px 0;
      }

      /* Styles for main (first) checkbox when it is unchecked*/
      .checkbox-container__main-input ~ span {
        opacity: 0.6;
      }

      /* Styles for main (first) checkbox when it is checked*/
      .checkbox-container__main-input:checked ~ span {
        opacity: 1;
      }

      /* Disabled styles */
      input:disabled ~ .checkbox-container__checkmark,
      input:disabled ~ .checkbox-container__label-text {
        opacity: 0.6;
        color: ${parameters.mainTextColor};
      }

      input:checked ~ .checkbox-container__checkmark {
        background-color: #32b3e3;
      }

      .checkbox-container__label-text {
        color: ${parameters.mainTextColor};
        word-break: break-all;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    `,
  };
});
