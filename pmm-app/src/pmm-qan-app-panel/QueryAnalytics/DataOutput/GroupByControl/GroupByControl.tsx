import { StateContext } from '../../StateContext';
import React, { useCallback, useContext } from 'react';
import { Select } from 'antd';
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
    <>
      <h5 style={{ margin: '3px', marginRight: '15px' }}>Group by</h5>
      <Select optionLabelProp="label" defaultValue={groupBy} style={{ width: '120px' }} onChange={setGroupBy}>
        {GROUP_BY_OPTIONS.map(option => (
          <Option value={option.value} label={option.label}>
            {option.label}
          </Option>
        ))}
      </Select>
    </>
  );
};
