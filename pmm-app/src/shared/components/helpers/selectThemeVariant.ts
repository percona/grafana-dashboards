import { selectThemeVariant } from '@grafana/ui';

interface Themes {
  mainTextColor: string;
}
export const getThemeParameters = (theme): Themes => {
  const mainTextColor = selectThemeVariant(
    // @ts-ignore
    { light: theme.colors.text, dark: 'rgba(255, 255, 255, 0.8)' },
    theme.type,
  );


  const backgroundColor = selectThemeVariant({ light: '#f7f8fa', dark: '#0b0c0e' }, theme.type);
  const borderColor = selectThemeVariant(
    { light: mainTextColor, dark: '#292929' },
    theme.type
  );
  const headerBackground = selectThemeVariant({ light: '#dedfe1', dark: '#202226' }, theme.type);


  return {
    mainTextColor: mainTextColor,
    table: {
      backgroundColor,
      borderColor,
      headerBackground,
      textColor: mainTextColor
    }
  };
};
