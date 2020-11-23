import { css } from 'emotion';

export const styles = {
  stepProgressWrapper: css`
    overflow: hidden;

    div[class$='-current'] {
      overflow: auto;
    }
  `,
};
