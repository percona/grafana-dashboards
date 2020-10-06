import { css } from 'emotion';

export const styles = {
  wrapper: css`
    position: relative;

    .menu {
      position: absolute;
      left: -80%;
      display: flex;
      flex-direction: column;
      z-index: 9999;
      background: white;
      border-radius: 3px;
      overflow: hidden;
      box-shadow: 0px 0px 5.8125px rgba (37, 40, 43, 0.12);
      padding-top: 5px;
      padding-bottom: 5px;
      min-width: 150px;
    }

    .menu-item {
      border: none;
      background-color: transparent;
      color: #5f5f5f;
      padding: 5px;
      text-align: left;

      :hover {
        color: #5187f6;
        background-color: #f6fafe;
      }
    }

    .show-menu {
      background-color: transparent;
      border: none;
    }
    .show-menu.menu-open {
      color: green;
    }
  `,
};
