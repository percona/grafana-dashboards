import { css } from 'emotion';

export const updateButton = css`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  background: #292929 none;
  box-sizing: border-box;

  &:disabled {
    border: 2px solid #292929;
    background: transparent;
  }
`;
