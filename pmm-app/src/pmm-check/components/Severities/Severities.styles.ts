import { css } from 'emotion';

export const List = css`
  list-style-type: none;
`;

export const ListItem = css`
  align-items: center;
  display: flex;
  padding: 12px 8px;

  &:not(:last-child) {
    border-bottom: 1px solid #292a2d;
  }
`;
