import { css } from 'emotion';

const headerPadding = '10px 8px';

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
export const header = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
export const title = css`
  font-size: 16px;
  padding: ${headerPadding};
  border: 1px solid transparent;
`;
