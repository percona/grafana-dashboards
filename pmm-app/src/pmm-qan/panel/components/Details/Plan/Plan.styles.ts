import { css } from 'emotion';

import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = stylesFactory(({ spacing }: GrafanaTheme) => ({
  planWrapper: css`
    position: relative;
  `,
  tooltipWrapper: css`
    position: absolute;
    top: ${spacing.sm};
    right: ${spacing.sm};
  `,
}));
