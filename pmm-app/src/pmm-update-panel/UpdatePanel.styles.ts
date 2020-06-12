import { css } from 'emotion';

export const panel = css`
  position: relative;
  height: inherit;
  padding-top: 5px;

  p {
    margin-bottom: 0;
  }

  .version {
    font-size: 14px;
    margin-bottom: 7px;
  }

  .check-update-button {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
    font-size: 16px;
    color: #27b4e7;
    border-radius: 50%;
    background-color: transparent;
    border: none;
  }

  .update-button {
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
    background: #292929 none;
    box-sizing: border-box;
  }

  .update-button:disabled {
    border: 2px solid #292929;
    background: transparent;
  }

  #available_version {
    display: flex;
  }

  section.state {
    height: 65px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 2px solid #292929;
  }

  section.available-version {
    margin-top: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .last-check-wrapper {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .no-update-text {
    font-size: 12px;
  }

  .pmm-link,
  .pmm-link:hover {
    color: #27b4e7;
  }

  .pmm-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 1281px) {
    #pmm-update-widget h2 {
      font-size: 1.55rem;
      margin-bottom: 0.1rem;
    }
  }

  #pmm-update-modal .pre-scrollable {
    height: 200px;
    overflow-y: scroll;
  }

  #pmm-update-modal .pre-scrollable pre {
    border-radius: 0;
    color: darkgrey;
    background-color: #292929;
    font-size: 0.6em;
    border: none;
  }

  #pmm-update-modal .output-content {
    background-color: #1f1d1d;
    padding: 1em;
  }

  #pmm-update-modal .text-right {
    float: right;
  }

  #pmm-update-modal .text-block {
    padding: 80px;
  }

  #pmm-update-modal .text-primary {
    color: #00729b;
    cursor: pointer;
  }

  #pmm-update-modal .text-primary:hover {
    color: #005f81;
  }

  #pmm-update-modal .btn-block {
    width: 100%;
  }

  #pmm-update-modal .output-collapse {
    cursor: pointer;
  }
`;
