export const getLabelQueryParams = labels => {
  return (
    Object.keys(labels)
      .filter(key => key !== 'interval')
      .map(key => {
        return {
          key: key,
          value: labels[key],
        };
      })
      .filter(item => item.value.filter(element => element !== 'All').length) || []
  );
};
