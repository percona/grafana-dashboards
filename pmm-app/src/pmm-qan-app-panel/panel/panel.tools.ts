export const getLabelQueryParams = (labels) => Object.keys(labels)
  .filter((key) => key !== 'interval')
  .map((key) => ({
    key,
    value: labels[key],
  }))
  .filter((item) => item.value.filter((element) => element !== 'All').length) || [];
