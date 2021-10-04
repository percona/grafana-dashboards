import React, { FC, useContext } from 'react';
import { Select } from 'antd';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { useTheme } from '@grafana/ui';
import { Search } from '../Search/Search';
import { getStyles } from './Dimension.styles';
import { DIMENSIONS_OPTIONS } from './Dimension.constants';

const { Option } = Select;

export const Dimension: FC = () => {
  const {
    contextActions,
    panelState: { groupBy, dimensionSearchText },
  } = useContext(QueryAnalyticsProvider);

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.groupByWrapper}>
      <Select
        optionLabelProp="label"
        defaultValue={groupBy}
        onChange={contextActions.changeGroupBy}
        className="group-by-selector"
        data-testid="group-by"
        dropdownClassName="group-by-selector-dropdown"
      >
        {DIMENSIONS_OPTIONS.map((option) => (
          <Option value={option.value} label={option.label} key={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
      <Search initialValue={dimensionSearchText} handleSearch={contextActions.setDimensionSearchText} />
    </div>
  );
};
