import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from '@emotion/css';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  background: css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: ${theme.zIndex.modalBackdrop};
      background-color: ${theme.colors.bg3};
      opacity: 0.7;
  `,
  body: css`
      position: fixed;
      z-index: ${theme.zIndex.modal};
      background: ${theme.colors.bodyBg};
      box-shadow: 0 0 20px ${theme.colors.dropdownShadow};
      background-clip: padding-box;
      outline: none;
      max-width: 750px;
      min-width: 400px;
      width: 40%;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      top: 10%;
  `,
  modalHeader: css`
      label: modalHeader;
      background: ${theme.colors.bg2};
      border-bottom: 1px solid ${theme.colors.pageHeaderBorder};
      display: flex;
      height: 3em;
      align-items: center;
      justify-content: space-between;
      padding-left: ${theme.spacing.d};
  `,
  content: css`
      padding: ${theme.spacing.d};
      overflow: auto;
      width: 100%;
      max-height: calc(90vh - ${theme.spacing.d});
  `,
  modalHeaderClose: css`
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: ${theme.spacing.sm};
    `,
}));
