import { css } from 'emotion';

export const modal = css`
  .modal-dialog {
    background-clip: padding-box;
    background: #161719;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    left: 0;
    margin-left: auto;
    margin-right: auto;
    max-width: 750px;
    outline: none;
    position: fixed;
    right: 0;
    top: 10%;
    width: 100%;
    z-index: 1050;
  }

  .backdrop {
    background-color: #343b40;
    bottom: 0;
    left: 0;
    opacity: 0.7;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1040;
  }

  .pre-scrollable {
    height: 200px;
    overflow-y: scroll;
    width: 100%;
    margin-right: 0;
  }

  .pre-scrollable pre {
    background-color: #292929;
    border-radius: 0;
    border: none;
    color: darkgrey;
    font-size: 0.6em;
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
    margin-right: 5px;
  }
  .btn-block {
    width: 100%;
  }

  .modal-body {
    position: relative;
  }
  .modal-content {
    padding: 28px;
  }
`;
