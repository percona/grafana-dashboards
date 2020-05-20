import React, { useState } from 'react';
import { CheckboxField } from '../../../../../react-plugins-deps/components/Form/Checkbox/Checkbox';
import { Humanize } from '../../../../../react-plugins-deps/components/helpers/Humanization';
import { Divider } from 'antd';
import { Styling } from './CheckboxGroup.styles';

const TOP_LIMIT = 5;

export const CheckboxGroup = ({ name, items, group, showAll, filter: searchFilterBy }) => {
  const [showTop, setShowTop] = useState(true);
  const filteredData = items.filter(item => {
    if (!showAll) {
      return item.checked;
    }
    return true;
  });
  const itemsList = (showTop ? filteredData.slice(0, TOP_LIMIT) : filteredData)
    .filter((item, index, list) => {
      if (showAll && !item.value && list.length === 1) {
        return false;
      }
      return true;
    })
    .filter(item => {
      if (!item.value) {
        return 'n/a'.includes(searchFilterBy.toLowerCase());
      }
      return (
        item.value.toLowerCase().includes(searchFilterBy.toLowerCase()) ||
        name.toLowerCase().includes(searchFilterBy.toLowerCase())
      );
    })
    .map(item => {
      const valueExists = item.hasOwnProperty('main_metric_percent');
      return (
        <div className={Styling.label} key={`${group}:${item.value || ''}`}>
          <span className={Styling.filterName}>
            <CheckboxField
              // TODO: using '--' because final form think that it is a nested fields
              //  need to replace it with something better
              name={`${group}:${item.value ? item.value.replace(/\./gi, '--') : 'na'}`}
              label={item.value || 'n/a'}
              // checked={item.checked}
              disabled={!valueExists}
            />
          </span>
          <span className={Styling.percentage}>
            <span>{valueExists ? Humanize.transform(item.main_metric_percent, 'percent') : null}</span>
          </span>
        </div>
      );
    });
  return itemsList.length ? (
    <div>
      <p className={Styling.filterHeaderWrapper}>
        <span className={Styling.filterHeader}>{name}</span>
        {filteredData.length > TOP_LIMIT ? (
          <span onClick={() => setShowTop(!showTop)} className={Styling.showModeSwitcher}>
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
