export const processClassicExplain = (classic) => {
  if (!classic) {
    return { columns: [], rows: [] };
  }

  const [header, ...data] = classic.split('\n');
  const headerList = header
    .split('|')
    .map((e) => (String(e) ? e.trim() : ''))
    .filter(Boolean)
    .map((title) => ({ title, key: title, dataIndex: title }));

  const rowsList = data.map((item) => item
    .split('|')
    .map((e) => (String(e) ? e.trim() : ''))
    .filter(Boolean)
    .reduce((acc, row, index) => {
      acc[headerList[index].title] = row;

      return acc;
    }, {}));

  return { columns: headerList, rows: rowsList };
};
