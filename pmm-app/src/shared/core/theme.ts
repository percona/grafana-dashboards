import { defaultTheme } from '@ant-design/compatible';
import { ThemeConfig } from 'antd';
import type { GrafanaTheme } from '@grafana/data';

export const antdDarkTheme: ThemeConfig = {
  ...defaultTheme,
  token: {
    ...defaultTheme.token,
    colorBgBase: 'rgb(22, 23, 25)',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    fontSize: 14,
    fontFamily: 'inherit',
    colorTextHeading: 'rgba(255, 255, 255, 0.8)',
    colorText: 'rgba(255, 255, 255, 0.8)',
    colorTextSecondary: 'rgba(255,255,255,0.8)',
    colorTextDisabled: 'rgba(255,255,255, 0.6)',
    borderRadius: 0,
    colorBorder: 'rgb(40, 40, 40)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    colorBgContainer: '#rgb(22, 23, 25)',
    colorLink: 'rgb(51, 181, 229)',
  },
  components: {
    ...defaultTheme.components,
    Table: {
      headerBg: '#202226',
      rowSelectedBg: 'gray',
      rowHoverBg: 'transparent',
      cellPaddingBlock: 4,
    },
    Select: {
      optionSelectedBg: '#2d2e2f',
      optionActiveBg: '#2d2e2f',
      colorTextPlaceholder: '#fff',
    },
    Tag: {
      defaultBg: 'transparent',
      defaultColor: 'rgba(255, 255, 255, 0.8)',
    },
    Tooltip: {
      colorBgSpotlight: '#3274d9',
    },
    Tabs: {
      itemActiveColor: 'rgba(255, 255, 255, 0.8)',
      itemSelectedColor: '#fff',
    },
  },
};

export const antdLightTheme: ThemeConfig = {
  ...defaultTheme,
  token: {
    ...defaultTheme.token,
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorText: '#000000',
    colorTextHeading: '#000000',
    colorTextSecondary: '#000000',
    colorTextDisabled: 'rgba(0, 0, 0, 0.45)',
    fontSize: 14,
    fontFamily: 'inherit',
    borderRadius: 0,
    colorBorder: '#d9d9d9',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    colorLink: 'rgb(51, 181, 229)',
  },
  components: {
    ...defaultTheme.components,
    Table: {
      headerBg: '#dedfe1',
      rowSelectedBg: 'deepskyblue',
      rowHoverBg: '#f5f5f5',
      cellPaddingBlock: 4,
    },
    Select: {
      optionSelectedBg: '#f5f5f5',
      optionActiveBg: '#f5f5f5',
      colorTextPlaceholder: '#000000',
      selectorBg: '#ffffff',
    },
    Checkbox: {
      colorBgContainer: '#ffffff',
      colorBorder: '#d9d9d9',
    },
    Tag: {
      defaultBg: 'transparent',
      defaultColor: '#000000',
    },
    Tooltip: {
      colorBgSpotlight: '#3274d9',
    },
    Tabs: {
      itemActiveColor: '#000000',
      itemSelectedColor: '#000000',
    },
  },
};

/**
 * Returns the appropriate AntD theme based on Grafana theme.
 * Defaults to light theme if Grafana theme is not initialized.
 *
 * @param grafanaTheme - The current Grafana theme
 * @returns AntD theme configuration for dark or light mode
 */
export const getAntdTheme = (grafanaTheme: GrafanaTheme): ThemeConfig => {
  if (!grafanaTheme?.type) {
    return antdLightTheme;
  }

  return grafanaTheme.type === 'dark' ? antdDarkTheme : antdLightTheme;
};
