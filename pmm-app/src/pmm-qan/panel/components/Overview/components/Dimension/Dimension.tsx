import React, { FC, useContext } from 'react';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { useTheme, Select } from '@grafana/ui';
import { Search } from '../Search/Search';
import { getStyles } from './Dimension.styles';
import { DIMENSIONS_OPTIONS } from './Dimension.constants';


export const Dimension: FC = () => {
  const {
    contextActions,
    panelState: { groupBy, dimensionSearchText },
  } = useContext(QueryAnalyticsProvider);

  const theme = useTheme();
  const styles = getStyles(theme);

  const options = DIMENSIONS_OPTIONS.map((option) => ({ value: option.value, label: option.label }));
  const value = options.filter((option) => option.value === groupBy);

  return (
    <div className={styles.groupByWrapper}>
      <Select
        options={options}
        value={value}
        onChange={({ value }) => contextActions.changeGroupBy(value)}
        className="group-by-selector"
        data-qa="group-by"
      />
      <Search initialValue={dimensionSearchText} handleSearch={contextActions.setDimensionSearchText} />
    </div>
  );
};
