import { css } from 'emotion';

export const styles = {
  actionsColumn: css`
    display: flex;
    justify-content: center;
    /* TODO: remove once updated platform-core */
    div[data-qa="dropdown-menu-container"] {
      z-index: 1;
    }
  `,
};
