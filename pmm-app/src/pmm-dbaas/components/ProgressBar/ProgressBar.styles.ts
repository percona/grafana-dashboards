import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({ palette, spacing, typography }: GrafanaTheme) => ({
  progressBarWrapper: css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  labelWrapper: css`
    align-items: baseline;
    display: flex;
    justify-content: flex-start;
    margin-bottom: ${spacing.sm};
  `,
  stepsLabel: css`
    color: ${palette.blue80};
    font-size: ${typography.size.lg};
    font-weight: ${typography.weight.bold};
    margin-right: ${spacing.sm};
  `,
  stepsLabelError: css`
    color: ${palette.orange};
    label: error;
  `,
  message: css`
    font-size: ${typography.size.xs};
  `,
  progressBarBackground: css`
    background-color: ${palette.gray1};
    border-radius: 50px;
    height: ${spacing.md};
    width: 100%;
  `,
  getFillerStyles: (width: number) => css`
    background-color: ${palette.blue80};
    border-radius: inherit;
    height: 100%;
    transition: width 1s ease-in-out;
    width: ${width}%;
  `,
  progressBarError: css`
    background-color: ${palette.orange};
    label: error;
  `,
});
