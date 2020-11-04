import { stylesFactory } from '@grafana/ui';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme) => ({
  groupWrapper: css`
    width: 50%;
  `,
  addServiceButton: css`
    margin-top: 30px;
  `,
  // Temporary solution, will be removed after tooltip labels will be added to platform inputs
  labelWrapper: css`
    display: flex;
    font-weight: 500;
    color: rgb(159, 167, 179);
    svg {
      margin-left: ${theme.spacing.xs};
    }
    margin-bottom: ${theme.spacing.xs};
  `,
}));
