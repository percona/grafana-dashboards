export const processTableData = input => {
  const [header, ...data] = JSON.parse(input);
  const headerList = header
    .map(e => (String(e) ? e.trim() : 'NULL'))
    .filter(Boolean)
    .map(title => ({ title: title, key: title, dataIndex: title }));
  const rowsList = data.map(item =>
    item
      .map(e => (String(e) ? e.trim() : 'NULL'))
      .filter(Boolean)
      .reduce((acc, item, index) => {
        acc[headerList[index].title] = item;
        return acc;
      }, {})
  );
  return { columns: headerList, rows: rowsList };
};
