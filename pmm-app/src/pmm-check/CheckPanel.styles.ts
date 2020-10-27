import { css } from 'emotion';

export const panel = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 1em;
`;

export const spinner = css`
  display: flex;
  height: 10em;
  align-items: center;
  justify-content: center;
`;

export const tabBar = css`
  height: 42px;
`;

export const tabContent = css`
  height: calc(100% - 42px);
`;
