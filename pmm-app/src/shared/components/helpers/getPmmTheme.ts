import { GrafanaTheme } from '@grafana/data';

interface TableTheme {
  backgroundColor: string;
  borderColor: string;
  headerBackground: string;
  textColor: string;
  selectedRowColor: string;
  sortIconColor: string;
}

interface DropdownTheme {
  bg: string;
  text: string;
  hoverBg: string;
  bgSmallText: string;
}

interface Themes {
  mainTextColor: string;
  table: TableTheme;
  dropdown: DropdownTheme;
}

/**
 * Returns PMM-specific theme values based on Grafana theme.
 * Provides colors for tables, dropdowns, and text.
 * Defaults to light theme if Grafana theme is not initialized.
 *
 * @param theme - The current Grafana theme
 * @returns Theme configuration object with colors for different UI elements
 */
export const getPmmTheme = (theme: GrafanaTheme): Themes => {
  const isLight = theme?.isLight ?? true;
  const mainTextColor = isLight ? (theme?.colors?.text ?? '#000000') : 'rgba(255, 255, 255, 0.8)';

  const backgroundColor = isLight ? '#f7f8fa' : '#0b0c0e';
  const borderColor = isLight ? mainTextColor : '#292929';
  const headerBackground = isLight ? '#dedfe1' : '#202226';
  const selectedRowColor = isLight ? 'deepskyblue' : '#234682';
  const sortIconColor = 'deepskyblue';
  const bg = isLight ? '#ffffff' : '#262626';
  const bgSmallText = isLight ? 'transparent' : '#646464';
  const text = isLight ? '#000000' : '#d8d9da';
  const hoverBg = isLight ? '#f5f5f5' : '#333333';

  return {
    mainTextColor,
    table: {
      backgroundColor,
      borderColor,
      headerBackground,
      textColor: mainTextColor,
      selectedRowColor,
      sortIconColor,
    },
    dropdown: {
      bg,
      text,
      hoverBg,
      bgSmallText,
    },
  };
};

/**
 * Applies PMM theme CSS variables to document.body.
 * These variables are used throughout QAN for consistent theming of dropdowns,
 * backgrounds, and text colors in both light and dark modes.
 *
 * Variables set:
 * - --qan-dropdown-bg: Background color for AntD Select dropdowns
 * - --qan-dropdown-text: Text color for dropdown options
 * - --qan-dropdown-hover-bg: Background color for hovered/selected dropdown options
 * - --page-background: Main background color for QAN panel
 * - --main-text-color: Primary text color
 *
 * @param grafanaTheme - The current Grafana theme
 */
export const applyPmmCssVariables = (grafanaTheme: GrafanaTheme): void => {
  const pmmTheme = getPmmTheme(grafanaTheme);

  if (typeof document === 'undefined') {
    return;
  }

  const root = document.body;

  // QAN dropdown variables
  root.style.setProperty('--qan-dropdown-bg', pmmTheme.dropdown.bg);
  root.style.setProperty('--qan-dropdown-text', pmmTheme.dropdown.text);
  root.style.setProperty('--qan-dropdown-hover-bg', pmmTheme.dropdown.hoverBg);
  root.style.setProperty('--qan-dropdown-bgSmallText', pmmTheme.dropdown.bgSmallText);

  // Page background and text color
  root.style.setProperty('--page-background', pmmTheme.table.backgroundColor);
  root.style.setProperty('--main-text-color', pmmTheme.mainTextColor);
  root.style.setProperty('--main-qan-font', 'inherit');
};
