import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  instanceForm: css`
    padding: 0px;
    margin-bottom: 10px;
    width: 800px;
  `,
  searchPanel: css`
    display: flex;
    justify-content: space-around;
    width: 100%;
  `,
  credentialsField: css`
    width: 45%;
  `,
}));
