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
  const themeBasicColor = selectThemeVariant({ light: 'blue', dark: 'rgba(255, 255, 255, 0.8)' }, theme.type);
  const tableBackgroundColor = selectThemeVariant({ light: 'rgb(247, 247, 249)', dark: '#161719' }, theme.type);
  // @ts-ignore
  const tableBorderColor = selectThemeVariant({ light: theme.colors.gray85, dark: '#292929' }, theme.type);
  const tableHeaderBackground = selectThemeVariant({ light: 'rgb(247, 247, 249)', dark: '#3D3D3D' }, theme.type);

  return {
    mainTextColor: mainTextColor,
  };
};
