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

  .no-update-text {
    font-size: 12px;
  }

  @media (max-width: 1281px) {
    #pmm-update-widget h2 {
      font-size: 1.55rem;
      margin-bottom: 0.1rem;
    }
  }
`;

export const lastCheck = css`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  button {
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
`;
