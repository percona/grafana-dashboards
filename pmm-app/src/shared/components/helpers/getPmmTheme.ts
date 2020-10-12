import { selectThemeVariant } from '@grafana/ui';


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
export const getPmmTheme = (theme): Themes => {
  const mainTextColor = selectThemeVariant(
    { light: theme.colors.text, dark: 'rgba(255, 255, 255, 0.8)' },
    theme.type,
  ) as string;


  const backgroundColor = selectThemeVariant({ light: '#f7f8fa', dark: '#0b0c0e' }, theme.type) as string;
  const borderColor = selectThemeVariant(
    { light: mainTextColor, dark: '#292929' },
    theme.type,
  ) as string;
  const headerBackground = selectThemeVariant({ light: '#dedfe1', dark: '#202226' }, theme.type) as string;


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
