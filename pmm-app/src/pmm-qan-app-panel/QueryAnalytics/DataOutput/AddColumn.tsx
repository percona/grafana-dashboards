import React, { useCallback, useContext } from 'react';
import { Divider, Icon, Input, Select } from 'antd';
import { METRIC_CATALOGUE } from './metric-catalogue';
import { StateContext } from '../StateContext';

const { Option } = Select;

const { Search } = Input;

const AddColumn = props => {
  const { dispatch } = useContext(StateContext);
    console.log(props, 'add columns inside')
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
        style={{ width: 180 }}
        placeholder={props.placeholder && METRIC_CATALOGUE[props.placeholder].humanizeName || 'Add column'}
        onChange={changeColumn}
        dropdownMatchSelectWidth={false}
        dropdownRender={menu => (
          <div style={{ width: 400 }} className={'add-column-wrapper'}>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              onMouseDown={e => {
                console.log('mouse down', e);
                // e.preventDefault();
              }}
              onMouseUp={e => {
                console.log('mouse up', e);
                // e.preventDefault();
              }}
              onFocus={e => {
                console.log('focus', e);
              }}
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
