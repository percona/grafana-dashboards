import { css } from 'emotion';
// import { GrafanaTheme } from '@grafana/data'
import { stylesFactory } from '@grafana/ui';

// export const getStyles = stylesFactory((theme: GrafanaTheme) => {
export const getStyles = stylesFactory((theme) => {
  const arrow = css`
    position: absolute;
    right: 0.3em;
    width: 0;
    height: 0;
    border-style: solid;
  `;

  const button = css`
    position: absolute;
    border: none;
    right: 2px;
    width: 1.2em;
    text-align: center;
    cursor: default;
    background: transparent;
    z-index: 1;
    color: ${theme.colors.formInputText};

    &:disabled {
      color: ${theme.colors.formInputDisabledText};
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
    }
  `;

  const baseInput = css`
    height: 100%;

    input {
      box-sizing: border-box;
      border-radius: 3px;
      padding-right: 1.4em;
    }

    &,
    &:hover {
      input[type='number']::-webkit-outer-spin-button,
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0 !important;
      }
      input[type='number'] {
        -moz-appearance: textfield !important;
      }
    }
  `;

  return {
    wrapper: css`
      display: flex;
      margin-bottom: 5px;
      min-height: 30px;
    `,
    inputWrapper: css`
      position: relative;
      display: inline-block;
    `,
    arrowUp: css`
      ${arrow};
      bottom: 2px;
      border-width: 0 0.3em 0.3em 0.3em;
      border-color: transparent transparent currentColor;
    `,
    arrowDown: css`
      ${arrow};
      top: 2px;
      border-width: 0.3em 0.3em 0 0.3em;
      border-color: currentColor transparent transparent;
    `,
    buttonDown: css`
      ${button};
      bottom: 2px;
      top: 50%;
    `,
    buttonUp: css`
      ${button};
      bottom: 50%;
      top: 2px;
    `,
    baseInput: css`
      ${baseInput};
    `,
    baseInputWithLabel: css`
      ${baseInput};

      input {
        border-radius: 0 3px 3px 0;
      }
    `,
  };
});
