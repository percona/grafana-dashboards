import { css } from '@emotion/css';

import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const iconsFill = theme.isLight ? 'black' : 'rgba(255, 255, 255, 0.8)';

  return {
    icon: css`
      path,
       polygon, circle {
        fill: ${iconsFill}
      }
  `,
  };
});
