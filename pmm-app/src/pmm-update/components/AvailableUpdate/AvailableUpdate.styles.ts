import { css } from 'emotion';

export const availableUpdate = css`
  align-items: flex-start;
  display: flex;
  font-weight: bold;
  justify-content: flex-start;
  line-height: 1.2;
  margin-top: 5px;

  > div {
    display: flex;
  }

  a {
    margin-left: 5px;
  }
`;

export const availableUpdateVersion = css`
  font-size: 14px;
  margin-bottom: 7px;
`;

export const whatsNewLink = css`
  height: 1em;
  padding: 0;
`;

export const releaseDate = css`
  font-size: 12px;
`;
