import { ClassicExplainInterface } from './Explain.types';

export const processClassicExplain = (classic): ClassicExplainInterface => {
  if (!classic) {
    return { columns: [], rows: [] };
  }

  const [header, ...data] = classic.split('\n');
  const headerList = header
    .split('|')
    .map((e) => (String(e) ? e.trim() : ''))
    .filter(Boolean)
    .map((title) => ({ Header: title, key: title, accessor: title }));

  const rowsList = data.map((item) => item
    .split('|')
    .map((e) => (String(e) ? e.trim() : ''))
    .filter(Boolean)
    .reduce((acc, row, index) => {
      acc[headerList[index].accessor] = row;

      return acc;
    }, {}));

  return { columns: headerList, rows: rowsList };
};
