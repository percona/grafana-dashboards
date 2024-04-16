import { defaultTheme } from '@ant-design/compatible';
import { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
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
