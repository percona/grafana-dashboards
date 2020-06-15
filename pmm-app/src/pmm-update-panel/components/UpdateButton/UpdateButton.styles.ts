import { css } from 'emotion';

export const updateButton = css`
  align-items: center;
  background: #292929 none;
  border-radius: 2px;
  border: none;
  border: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-size: 14px;
  font-weight: 500;
  height: 32px;
  justify-content: center;
  line-height: 1;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 8px 16px;
  text-align: center;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  vertical-align: middle;
  width: 100%;

  &:disabled {
    border: 2px solid #292929;
    background: transparent;
  }
`;
