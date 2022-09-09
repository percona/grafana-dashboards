import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

export const getStyles = ({ v1: { palette, colors } }: GrafanaTheme2) => ({
  tippy: css`
    background-color: ${colors.bg2};
  `,
  TooltipWrapper: css`
    padding: 0.5em;
  `,
  TooltipHeader: css`
    border-bottom: 1px solid #8e8e8e;
    padding: 0em 0.5em;
    margin-bottom: 0.5em;
  `,
  TooltipBody: css`
    padding: 0em 0.5em;
    font-weight: normal;
  `,
  InfoIcon: css`
    color: #6495ed;
  `,
  FailedDiv: css`
    margin-right: 0.5em;
    font-size: 30px;
  `,
  Green: css`
    color: #299c46;
  `,
  Empty: css`
    text-align: center;
  `,
  Link: css`
    color: rgb(51, 181, 229);
    &:hover {
      color: rgb(87, 148, 242);
    }
  `,
  Critical: css`
    color: ${palette.red};
  `,
  Error: css`
    color: ${palette.orange};
  `,
  Warning: css`
    color: ${palette.yellow};
  `,
  Notice: css`
    color: ${palette.blue80};
  `,
});
