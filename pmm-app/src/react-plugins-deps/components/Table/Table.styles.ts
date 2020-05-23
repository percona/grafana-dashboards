import { css } from 'emotion';

const theme = 'dark';
const themeVariables = {
  dark: {
    background: '#161719',
    border: '#292929',
    textColor: 'rgba(255, 255, 255, 0.8)',
    headerBg: '#3D3D3D',
  },
  light: {
    background: 'white',
    border: 'black',
    textColor: 'deepskyblue',
  },
};
const currentTheme = themeVariables[theme];
export const classNameTable = css`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border: 1px solid ${currentTheme.border};
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      background-color: ${currentTheme.background};
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid ${currentTheme.border};
      border-right: 1px solid ${currentTheme.border};
      color: ${currentTheme.textColor};

      /* The secret sauce */
      /* Each cell should grow equally */
      // width: 1%;
      /* But "collapsed" cells should be as small as possible */
      // &.collapse {
      //   width: 0.0000000001%;
      // }

      :last-child {
        border-right: 0;
      }
    }

    th {
      background-color: ${currentTheme.headerBg};
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;
