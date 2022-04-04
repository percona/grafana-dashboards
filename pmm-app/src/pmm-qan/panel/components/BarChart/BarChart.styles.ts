import { css } from '@emotion/css';

export const getStyles = (height: number | string | undefined) => ({
  barChartWrapperInner: css`
    left: 0;
    right: 0;
    position: absolute;
  `,

  barCharWrapperOuter: css`
    position: relative;
    height: ${height}px;
  `,
});
