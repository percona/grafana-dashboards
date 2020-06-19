import { css } from 'emotion';

export const styles = {
  actionPanel: css`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
  `,
  tableWrapper: css`
    padding: 10px;
  `,
  destructiveButton: css`
    background: rgba(0, 0, 0, 0) linear-gradient(rgb(224, 47, 68) 0%, rgb(196, 22, 42) 100%) repeat scroll 0%
      0%;
    color: white;
  `,
  confirmationText: css`
    margin-bottom: 2em;
  `,
};
