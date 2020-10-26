import { stylesFactory } from '@grafana/ui';
import { css } from 'emotion';

export const getStyles = stylesFactory(() => ({
  instanceForm: css`
    padding: 0px;
    margin-bottom: 10px;
    width: 800px;
  `,
  searchPanel: css`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,
  credentialsField: css`
    width: 42%;
  `,
}));
