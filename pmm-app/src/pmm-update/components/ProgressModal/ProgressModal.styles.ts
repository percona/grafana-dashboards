import { css } from 'emotion';

export const modal = css`
  background-clip: padding-box;
  background: #161719;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 750px;
  outline: none;
  position: fixed;
  right: 0;
  top: 10%;
  width: 100%;
  z-index: 1050;
  padding: 28px;
`;

export const outputHeader = css`
  display: flex;

  span {
    flex: 1;
  }
`;

export const clipboardButton = css`
  margin-right: 8px;
`;

export const output = css`
  height: 200px;
  margin-right: 0;
  margin-top: 15px;
  overflow-y: scroll;
  width: 100%;

  pre {
    background-color: #292929;
    border: none;
    border-radius: 0;
    color: darkgrey;
  }
`;

export const backdrop = css`
  background-color: #343b40;
  bottom: 0;
  left: 0;
  opacity: 0.7;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1040;
`;

export const outputContent = css`
  background-color: #1f1d1d;
  margin-top: 15px;
  padding: 1em;
`;

export const outputVisibilityToggle = css`
  cursor: pointer;
  margin-right: 5px;
`;

export const successNote = css`
  padding: 80px;
  text-align: center;
`;

export const closeModal = css`
  align-self: center;
`;
