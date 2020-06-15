import { css } from 'emotion';

export const modal = css`
  .modal-dialog {
    position: fixed;
    z-index: 1050;
    width: 100%;
    background: #161719;
    -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    background-clip: padding-box;
    outline: none;
    max-width: 750px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 10%;
  }

  .backdrop {
    opacity: 0.7;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #343b40;
  }

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
