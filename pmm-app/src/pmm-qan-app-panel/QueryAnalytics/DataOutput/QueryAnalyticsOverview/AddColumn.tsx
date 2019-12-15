import React, { useContext } from 'react';
import { Divider, Icon, Input, Select } from 'antd';
// import { METRIC_CATALOGUE } from './data/metric-catalogue';
import { StateContext } from '../../StateContext';

// const { Option } = Select;

const { Search } = Input;

const AddColumn = props => {
  const context = useContext(StateContext);

  // @ts-ignore
  return (
    <Select
      style={{ width: 240 }}
      placeholder={props.placeholder}
      onChange={context.addColumn}
      dropdownRender={menu => (
        <div>
          <Search placeholder="input search text" onSearch={value => console.log(value)} style={{ width: '100%' }} />
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ padding: '4px 8px', cursor: 'pointer' }} onMouseDown={e => e.preventDefault()} onClick={() => {}}>
            <Icon type="minus" /> Remove column
          </div>
        </div>
      )}
    >
      {/*{Object.values(METRIC_CATALOGUE).map(item => (*/}
      {/*  <Option key={item.simpleName}>{item.humanizeName}</Option>*/}
      {/*))}*/}
    </Select>
  );
};

export default AddColumn;
