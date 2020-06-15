import { css } from 'emotion';

export const updateButton = css`
  --button-color: #292929;

  background: var(--button-color);
  display: flex;
  justify-content: center;
  margin: 10px 0;
  width: 100%;

  &:hover,
  &:focus {
    background: var(--button-color);
  }
`;
