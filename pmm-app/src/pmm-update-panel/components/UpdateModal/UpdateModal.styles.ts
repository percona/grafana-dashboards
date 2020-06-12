import { css } from 'emotion';

export const modal = css`
  .pre-scrollable {
    height: 200px;
    overflow-y: scroll;
  }

  .pre-scrollable pre {
    border-radius: 0;
    color: darkgrey;
    background-color: #292929;
    font-size: 0.6em;
    border: none;
  }

  .output-content {
    background-color: #1f1d1d;
    padding: 1em;
  }

  .text-right {
    float: right;
  }

  .text-block {
    padding: 80px;
  }

  .text-primary {
    color: #00729b;
    cursor: pointer;
  }

  .text-primary:hover {
    color: #005f81;
  }

  .btn-block {
    width: 100%;
  }

  .output-collapse {
    cursor: pointer;
  }
`;
