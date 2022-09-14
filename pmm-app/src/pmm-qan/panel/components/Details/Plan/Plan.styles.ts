import { css } from '@emotion/css';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({ spacing, colors }: GrafanaTheme) => ({
  planWrapper: css`
    position: relative;
  `,
  tooltipWrapper: css`
    position: absolute;
    top: ${spacing.sm};
    right: ${spacing.sm};
  `,
  tippy: css`
    background-color: ${colors.bg2};
  `,
});
