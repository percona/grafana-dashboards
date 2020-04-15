import React, { useState } from 'react';
import { CheckboxField } from '../../../react-plugins-deps/components/FormComponents/Checkbox/Checkbox';
import { Humanize } from '../../../react-plugins-deps/components/helpers/Humanization';
import { Divider } from 'antd';
import { css } from 'emotion';

const TOP_LIMIT = 5;

const Styling = {
  label: css`
    display: grid;
    grid-template-areas: 'filtername percentagearea';
    grid-template-rows: 30px;
    grid-template-columns: 150px auto;
    grid-gap: 10px;
    height: auto;
    margin: 0;
  `,
  filterName: css`
    grid-area: filtername;
  `,
  percentage: css`
    grid-area: percentagearea;
    display: flex;
    justify-content: flex-end;
  `,
  filterHeaderWrapper: css`
    display: flex;
    justify-items: space-between;
    margin-bottom: 0 !important;
    margin-top: 20px !important;
  `,
  filterHeader: css`
    margin-right: auto;
    font-weight: 700;
    font-size: 14px;
  `,
  divider: css`
    margin-top: 0 !important;
    margin-bottom: 5px !important;
  `,
  showModeSwitcher: css`
    cursor: pointer;
  `,
};

export const CheckboxGroup = ({ form, name, items, group, showAll, filter, labels }) => {
  const [showTop, setShowTop] = useState(true);
  const filteredData = items
    .filter(item => item.hasOwnProperty('main_metric_percent'))
    .filter(item => {
      if (!showAll) {
        return item.checked;
      }
      return true;
    });
  const itemsList = (showTop ? filteredData.slice(0, TOP_LIMIT) : filteredData)
    .filter((item, index, list) => {
      if (!item.value && list.length === 1) {
        return false;
      }
      return true;
    })
    .filter(item => {
      if (!item.value) {
        return 'n/a'.includes(filter.toLowerCase());
      }
      return item.value.toLowerCase().includes(filter.toLowerCase());
    })
    .map(item => {
      return (
        <div className={Styling.label} key={`${group}:${item.value || ''}`}>
          <span className={Styling.filterName}>
            <CheckboxField
              form={form}
              // TODO: using '--' because final form think that it is a nested fields
              //  need to replace it with something better
              name={`${group}:${item.value ? item.value.replace(/\./gi, '--') : ''}`}
              label={item.value || 'n/a'}
              checked={labels && labels[group] && labels[group].includes(item.value)}
            />
          </span>
          <span className={Styling.percentage}>
            <span>{Humanize.transform(item.main_metric_percent, 'percent')}</span>
          </span>
        </div>
      );
    });
  return itemsList.length ? (
    <div>
      <p className={Styling.filterHeaderWrapper}>
        <span className={Styling.filterHeader}>{name}</span>
        {filteredData.length > TOP_LIMIT ? (
          <span
            onClick={() => {
              setShowTop(!showTop);
            }}
            className={Styling.showModeSwitcher}
          >
            {showTop ? `Show all (${filteredData.length})` : `Show top ${TOP_LIMIT}`}
          </span>
        ) : (
          <span></span>
        )}
      </p>
      <Divider className={Styling.divider}></Divider>
      {itemsList}
    </div>
  ) : null;
};
