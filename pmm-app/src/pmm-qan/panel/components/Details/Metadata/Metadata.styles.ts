import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';

export const getStyles = (theme: GrafanaTheme2) => {
  const parameters = getPmmTheme(theme.v1);

  return {
    metadataColumn: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      word-break: keep-all;
      color: ${parameters.mainTextColor};
    `,
  };
};
