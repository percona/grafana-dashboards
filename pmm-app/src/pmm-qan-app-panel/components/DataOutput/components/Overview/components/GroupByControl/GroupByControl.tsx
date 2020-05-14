import { PanelProvider } from '../../../../../../panel/panel.provider';
import React, { useContext } from 'react';
import { Select } from 'antd';
import { Styling } from './GroupByControl.styles';
import { GROUP_BY_OPTIONS } from './GroupByControl.types';
import './GroupByControl.scss';

const { Option } = Select;

export const GroupByControl = () => {
  const {
    contextActions,
    panelState: { groupBy },
  } = useContext(PanelProvider);

  return (
    <div className={Styling.groupByWrapper}>
      <h5 className={Styling.groupByHeader}>Group by</h5>
      <Select
        optionLabelProp="label"
        defaultValue={groupBy}
        style={{ width: '120px' }}
        onChange={contextActions.changeGroupBy}
        className="group-by-selector"
        data-qa="group-by"
        dropdownClassName="group-by-selector-dropdown"
      >
        {GROUP_BY_OPTIONS.map(option => (
          <Option value={option.value} label={option.label} key={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};
