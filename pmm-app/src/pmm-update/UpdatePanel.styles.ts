import { css } from 'emotion';

export const panel = css`
  position: relative;
  height: 100%;
  padding-top: 5px;

  p {
    margin-bottom: 0;
  }

  @media (max-width: 1281px) {
    #pmm-update-widget h2 {
      font-size: 1.55rem;
      margin-bottom: 0.1rem;
    }
  }
`;
