export const processTableData = (input): { columns: any[]; rows: any[] } => {
  if (!input) {
    return { columns: [], rows: [] };
  }

  const [header, ...data] = JSON.parse(input);
  const headerList = header
    .map((e) => (String(e) ? String(e).trim() : 'NULL'))
    .filter(Boolean)
    .map((title) => ({ Header: title, key: title, accessor: title }));
  const rowsList = data.map((item) => item
    .map((e) => (String(e) ? String(e).trim() : 'NULL'))
    .filter(Boolean)
    .reduce((acc, row, index) => {
      acc[headerList[index].accessor] = row;

      return acc;
    }, {}));

  return { columns: headerList, rows: rowsList };
};
