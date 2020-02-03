import React, { useCallback, useContext } from 'react';
import { Divider, Icon, Input, Select } from 'antd';
import { METRIC_CATALOGUE } from '../metric-catalogue';
import { StateContext } from '../../StateContext';

const { Option } = Select;

const { Search } = Input;

const AddColumn = props => {
  const { dispatch } = useContext(StateContext);

  const changeColumn = useCallback(
    (column, second) => {
      if (props.onlyAdd) {
        dispatch({
          type: 'ADD_COLUMN',
          payload: {
            column: column,
          },
        });
      } else {
        dispatch({
          type: 'REPLACE_COLUMN',
          payload: {
            column: column,
            oldColumn: props.currentMetric,
          },
        });
      }
    },
    [props.currentMetric, props.onlyAdd]
  );

  const removeColumn = useCallback(() => {
    dispatch({
      type: 'REMOVE_COLUMN',
      payload: {
        column: props.currentMetric,
      },
    });
  }, [props.currentMetric]);
  // @ts-ignore
  return (
    <div onClick={e => e.stopPropagation()}>
      <Select
        optionLabelProp="label"
        style={{ width: 240 }}
        placeholder={props.placeholder || 'Add column'}
        onChange={changeColumn}
        dropdownRender={menu => (
          <div>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              onClick={e => e.stopPropagation()}
              onFocus={e => e.stopPropagation()}
              style={{ width: '100%' }}
            />
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            {!props.onlyAdd && (
              <div style={{ padding: '4px 8px', cursor: 'pointer' }} onMouseDown={e => e.preventDefault()} onClick={removeColumn}>
                <Icon type="minus" /> Remove column
              </div>
            )}
          </div>
        )}
      >
        {Object.values(METRIC_CATALOGUE).map(item => (
          <Option key={item.simpleName} label={item.humanizeName}>
            {item.humanizeName}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default AddColumn;
