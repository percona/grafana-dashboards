import { css } from 'emotion';

const headerPadding = '10px 0';

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

export const runChecksButton = css`
  width: 140px;
`;

export const actionButtons = css`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding: ${headerPadding};
  align-items: center;
`;
