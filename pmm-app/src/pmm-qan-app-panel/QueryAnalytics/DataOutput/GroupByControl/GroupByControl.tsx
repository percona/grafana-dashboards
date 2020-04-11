import { StateContext } from '../../StateContext';
import React, { useCallback, useContext } from 'react';
import { Select } from 'antd';
import { css } from 'emotion';

const Styling = {
  groupByWrapper: css`
    display: flex;
    align-items: center;
  `,
  groupByHeader: css`
    margin: 0 !important;
    margin-right: 15px !important;
  `,
};
const { Option } = Select;

export const GROUP_BY_OPTIONS = [
  { value: 'queryid', label: 'Query' },
  { value: 'service_name', label: 'Service Name' },
  { value: 'database', label: 'Database' },
  { value: 'schema', label: 'Schema' },
  { value: 'username', label: 'User Name' },
  { value: 'client_host', label: 'Client Host' },
];

export const GroupByControl = () => {
  const {
    dispatch,
    state: { groupBy },
  } = useContext(StateContext);

  const setGroupBy = useCallback(value => {
    dispatch({
      type: 'CHANGE_GROUP_BY',
      payload: {
        groupBy: value,
      },
    });
  }, []);

  return (
    <div className={Styling.groupByWrapper}>
      <h5 className={Styling.groupByHeader}>Group by</h5>
      <Select
        optionLabelProp="label"
        defaultValue={groupBy}
        style={{ width: '120px' }}
        onChange={setGroupBy}
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
