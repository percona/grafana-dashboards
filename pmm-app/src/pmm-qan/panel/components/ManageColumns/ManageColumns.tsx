import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  Divider, Select, Tooltip,
} from 'antd';
import { cx } from '@emotion/css';
import { useTheme } from '@grafana/ui';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { METRIC_CATALOGUE } from 'pmm-qan/panel/QueryAnalytics.constants';
import { MinusOutlined, SwapOutlined } from '@ant-design/icons';
import { OptionContent } from './OptionContent/OptionContent';
import './ManageColumns.scss';
import { getStyles } from './ManageColumns.styles';

const { Option } = Select;

export const ManageColumns = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const {
    onlyAdd, currentMetric, placeholder, width, mainMetric,
  } = props;
  const {
    contextActions,
    panelState: { columns },
  } = useContext(QueryAnalyticsProvider);
  const [availableColumns, setAvailableColumns] = useState(Object.values(METRIC_CATALOGUE));
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const extraSelectProps = {
    dropdownAlign: { overflow: { adjustX: true } },
    getPopupContainer: (trigger) => trigger.closest('.panel-content'),
  };

  useEffect(() => {
    setAvailableColumns(
      Object.values(METRIC_CATALOGUE).filter((metric) => !columns.find((item) => item === metric.simpleName)),
    );
  }, [columns]);

  const changeColumn = useCallback(
    (column) => {
      if (onlyAdd) {
        contextActions.addColumn(column);
      } else {
        contextActions.changeColumn({
          column,
          oldColumn: currentMetric,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentMetric, onlyAdd],
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const removeColumn = useCallback(() => contextActions.removeColumn(currentMetric), [currentMetric]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const swapWithMain = useCallback(() => contextActions.swapMainColumn(currentMetric), [currentMetric]);

  const Placeholder = () => (!onlyAdd ? (
    <Tooltip
      title={() => (
        <div className={styles.metricsTooltip}>
          <b className={styles.placeholder}>{placeholder && METRIC_CATALOGUE[placeholder].humanizeName}</b>
          <span className={styles.placeholder}>
            {placeholder && METRIC_CATALOGUE[placeholder].tooltipText}
          </span>
        </div>
      )}
      placement="topLeft"
    >
      <div>
        <span className={cx(styles.placeholder, styles.placeholderPadding)}>
          {placeholder && METRIC_CATALOGUE[placeholder].humanizeName}
        </span>
      </div>
    </Tooltip>
  ) : (
    <div className={styles.placeholderAdd}>
      {!isDropdownOpen && (
        <div>
          <i className={cx('fa fa-plus-circle', styles.iconMargin)} />
          <span>Add column</span>
        </div>
      )}
    </div>
  ));

  const dropdownRender = (menu) => (
    <div className={styles.addColumnWrapper}>
      {menu}
      {!onlyAdd ? <Divider className={styles.dividerMargin} /> : null}
      {!onlyAdd && columns.length > 1 ? (
        <div className={styles.actionElement} onMouseDown={(e) => e.preventDefault()} onClick={removeColumn}>
          <MinusOutlined className={styles.iconMargin} />
          Remove column
        </div>
      ) : null}
      {!onlyAdd && mainMetric !== currentMetric.simpleName ? (
        <div className={styles.actionElement} onMouseDown={(e) => e.preventDefault()} onClick={swapWithMain}>
          <SwapOutlined className={styles.iconMargin} />
          Swap with main metric
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={!onlyAdd ? styles.manageColumns : styles.addColumns} onClick={(e) => e.stopPropagation()}>
      <Select
        optionLabelProp="label"
        showSearch
        style={{ width: width || '125px' }}
        placeholder={<Placeholder />}
        filterOption={(value, option) => String(option?.props.label)
          .toLowerCase()
          .includes(value.toLowerCase())}
        onChange={changeColumn}
        onDropdownVisibleChange={(open) => setDropdownOpen(open)}
        popupMatchSelectWidth={false}
        value={undefined}
        suffixIcon={false}
        className={`${onlyAdd ? 'add' : 'manage'}-columns-selector`}
        popupClassName={`${onlyAdd ? 'add' : 'manage'}-columns-selector-dropdown`}
        dropdownRender={dropdownRender}
        data-testid="manage-columns-selector"
        {...extraSelectProps}
      >
        {availableColumns.map((item) => (
          // @ts-ignore
          <Option key={item.simpleName} label={item.humanizeName}>
            <OptionContent
              title={item.humanizeName}
              description={item.tooltipText}
              tags={item.serviceTypes}
            />
          </Option>
        ))}
      </Select>
    </div>
  );
};
