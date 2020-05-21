import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Divider, Icon, Select } from 'antd';
import { PanelProvider } from '../../../../panel/panel.provider';
import './ManageColumns.scss';
import { METRIC_CATALOGUE } from '../../../../panel/panel.constants';
import Tooltip from 'antd/es/tooltip';
import { Styling } from './ManageColumns.styles';

const { Option } = Select;

const ManageColumns = props => {
  const {
    contextActions,
    panelState: { columns },
  } = useContext(PanelProvider);
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

  const Placeholder = () => {
    return !props.onlyAdd ? (
      <Tooltip
        title={props.placeholder && METRIC_CATALOGUE[props.placeholder].humanizeName}
        placement="topLeft"
      >
        <span className={Styling.placeholder}>
          {props.placeholder && METRIC_CATALOGUE[props.placeholder].humanizeName}
        </span>
      </Tooltip>
    ) : (
      <div className={Styling.placeholder}>
        <i className="fa fa-plus-circle" style={{ marginRight: '5px' }}></i> <span> Add column</span>
      </div>
    );
  };

  const dropdownRender = menu => (
    <div className="add-column-wrapper">
      {menu}
      <Divider style={{ margin: '4px 0' }} />
      {!props.onlyAdd && columns.length > 1 && (
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
  );
  // @ts-ignore
  return (
    <div className={!props.onlyAdd ? 'manage-columns' : 'add-columns'} onClick={e => e.stopPropagation()}>
      <Select
        optionLabelProp="label"
        showSearch
        style={{ width: props.width || '160px' }}
        placeholder={<Placeholder />}
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
        dropdownRender={dropdownRender}
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
