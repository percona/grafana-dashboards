import { GrafanaTheme } from '@grafana/data';

interface TableTheme {
  backgroundColor: string;
  borderColor: string;
  headerBackground: string;
  textColor: string;
}

interface Themes {
  mainTextColor: string;
  table: TableTheme;
}
export const getPmmTheme = (theme: GrafanaTheme): Themes => {
  const mainTextColor = theme.isLight ? theme.colors.text : 'rgba(255, 255, 255, 0.8)';

  const backgroundColor = theme.isLight ? '#f7f8fa' : '#0b0c0e';
  const borderColor = theme.isLight ? mainTextColor : '#292929';
  const headerBackground = theme.isLight ? '#dedfe1' : '#202226';

  return {
    mainTextColor,
    table: {
      backgroundColor,
      borderColor,
      headerBackground,
      textColor: mainTextColor,
    },
  };
};
