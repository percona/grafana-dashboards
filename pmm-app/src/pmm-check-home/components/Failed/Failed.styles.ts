import { css } from 'emotion';

/**
 * TODO(atymchuk): refactor to use themes
 */
export const TooltipWrapper = css`
  padding: 0.5em;
`;

export const TooltipHeader = css`
  border-bottom: 1px solid #8e8e8e;
  padding: 0em 0.5em;
  margin-bottom: 0.5em;
`;

export const TooltipBody = css`
  padding: 0em 0.5em;
  font-weight: normal;
`;

export const InfoIcon = css`
  color: #6495ed;
`;

export const FailedDiv = css`
  margin-right: 0.5em;
`;

export const Green = css`
  color: #299c46;
`;

export const Empty = css`
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(41, 42, 45);
`;

export const Link = css`
  color: rgb(51, 181, 229);
  &:hover {
    color: rgb(87, 148, 242);
  }
`;

export const LargeSize = css`
  font-size: 30px;
`;
