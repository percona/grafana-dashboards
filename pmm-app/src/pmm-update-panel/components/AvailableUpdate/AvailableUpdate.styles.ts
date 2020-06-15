import { css } from 'emotion';

export const availableUpdate = css`
  margin-top: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  > div {
    display: flex;
  }

  a {
    margin-left: 5px;
  }

  a,
  a:hover {
    color: #27b4e7;
  }

  a:hover {
    text-decoration: underline;
  }

  .version {
    font-size: 14px;
    margin-bottom: 7px;
  }
`;
