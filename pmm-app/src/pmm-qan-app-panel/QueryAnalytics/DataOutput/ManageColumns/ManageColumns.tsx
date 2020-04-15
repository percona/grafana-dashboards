import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Divider, Icon, Select } from 'antd';
import { METRIC_CATALOGUE } from '../MetricCatalogue';
import { StateContext } from '../../StateContext';
import './ManageColumns.less';

const { Option } = Select;

const ManageColumns = props => {
  const {
    contextActions,
    panelState: { columns },
  } = useContext(StateContext);
  const [availableColumns, setAvailableColumns] = useState(Object.values(METRIC_CATALOGUE));
  useEffect(() => {
    setAvailableColumns(
      Object.values(METRIC_CATALOGUE).filter(metric => !columns.find(item => item === metric.simpleName))
    );
  }, [columns]);
  const changeColumn = useCallback(
    column => {
      if (props.onlyAdd) {
        contextActions.addColumn(column);
      } else {
        contextActions.changeColumn({
          column: column,
          oldColumn: props.currentMetric,
        });
      }
    },
    [props.currentMetric, props.onlyAdd]
  );

  const removeColumn = useCallback(() => contextActions.removeColumn(props.currentMetric), [
    props.currentMetric,
  ]);
  // @ts-ignore
  return (
    <div className={!props.onlyAdd ? 'manage-columns' : 'add-columns'} onClick={e => e.stopPropagation()}>
      <Select
        optionLabelProp="label"
        showSearch={true}
        style={{ width: props.width || '160px' }}
        placeholder={
          !props.onlyAdd ? (
            props.placeholder && METRIC_CATALOGUE[props.placeholder].humanizeName
          ) : (
            <div style={{ fontSize: '16px' }}>
              <i className="fa fa-plus-circle" style={{ marginRight: '5px' }}></i> <span> Add column</span>
            </div>
          )
        }
        filterOption={(value, option) => {
          return String(option.props.label)
            .toLowerCase()
            .includes(value.toLowerCase());
        }}
        onChange={changeColumn}
        dropdownMatchSelectWidth={false}
        value={undefined}
        showArrow={false}
        className={`${props.onlyAdd ? 'add' : 'manage'}-columns-selector`}
        dropdownClassName={`${props.onlyAdd ? 'add' : 'manage'}-columns-selector-dropdown`}
        dropdownRender={menu => (
          <div
            style={{
              width: 400,
              backgroundColor: 'rgba(47, 47, 50, 0.5)',
              boxShadow: 'rgba(255, 255, 255, 0.1) -1px -1px 0px 0px, rgba(0, 0, 0, 0.3) 1px 1px 0px 0px',
            }}
            className="add-column-wrapper"
          >
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            {!props.onlyAdd && (
              <div
                style={{ padding: '4px 8px', cursor: 'pointer' }}
                onMouseDown={e => e.preventDefault()}
                onClick={removeColumn}
              >
                <Icon type="minus" style={{ marginRight: '4px' }} />
                Remove column
              </div>
            )}
          </div>
        )}
      >
        {availableColumns.map(item => (
          <Option key={item.simpleName} label={item.humanizeName}>
            {item.humanizeName}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default ManageColumns;
