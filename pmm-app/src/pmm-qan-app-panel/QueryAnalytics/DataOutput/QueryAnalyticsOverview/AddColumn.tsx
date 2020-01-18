import React, { useContext } from 'react';
import { Divider, Icon, Input, Select } from 'antd';
import { METRIC_CATALOGUE } from './OverviewTable/metric-catalogue';
import { StateContext } from '../../StateContext';

const { Option } = Select;

const { Search } = Input;

const AddColumn = props => {
  const context = useContext(StateContext);
  console.log('context', context);
  // @ts-ignore
  return (
    <div
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <Select
        style={{ width: 240 }}
        placeholder={props.placeholder}
        onChange={(column, second) => {
          if (props.onlyAdd) {
            context.changeColumn({
              column: column,
              action: 'ADD',
            });
          } else {
            context.changeColumn({
              column: column,
              oldColumn: props.currentMetric,
              action: 'REPLACE',
            });
          }
          // context.addColumn(column);
        }}
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
              <div
                style={{ padding: '4px 8px', cursor: 'pointer' }}
                onMouseDown={e => e.preventDefault()}
                onClick={() => {
                  context.changeColumn({
                    column: props.currentMetric,
                    action: 'REMOVE',
                  });
                }}
              >
                <Icon type="minus" /> Remove column
              </div>
            )}
          </div>
        )}
      >
        {Object.values(METRIC_CATALOGUE).map(item => (
          <Option key={item.simpleName}>{item.humanizeName}</Option>
        ))}
      </Select>
    </div>
  );
};

export default AddColumn;
