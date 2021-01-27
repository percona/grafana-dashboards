import { CSSProperties } from 'react';
import { css } from 'emotion';

export const styles = {
  disabled: {
    opacity: 0.6,
    pointerEvents: 'none',
  } as CSSProperties,
  panelContentWrapper: css`
    margin-top: 20px;
  `,
};
