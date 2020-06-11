import React, { useState } from 'react';
import { Divider } from 'antd';
import { CheckboxField } from 'shared/components/Form/Checkbox/Checkbox';
import { humanize } from 'shared/components/helpers/Humanization';
import { styles } from './CheckboxGroup.styles';

const TOP_LIMIT = 5;

export const CheckboxGroup = ({
  name, items, group, showAll, filter: searchFilterBy,
}) => {
  const [showTop, setShowTop] = useState(true);
  const filteredData = items.filter((item) => {
    if (!showAll) {
      return item.checked;
    }
    return true;
  });

  const searchFilter = (item) => {
    if (!item.value) {
      return (
        'n/a'.includes(searchFilterBy.toLowerCase())
        || name.toLowerCase().includes(searchFilterBy.toLowerCase())
      );
    }
    return (
      item.value.toLowerCase().includes(searchFilterBy.toLowerCase())
      || name.toLowerCase().includes(searchFilterBy.toLowerCase())
    );
  };

  const itemsList = (showTop ? filteredData.slice(0, TOP_LIMIT) : filteredData)
    .filter((item, index, list) => {
      if (showAll && !item.value && list.length === 1) {
        return false;
      }
      return true;
    })
    .filter(searchFilter)
    .map((item) => {
      const valueExists = item.main_metric_percent !== undefined;
      return (
        <div className={styles.label} key={`${group}:${item.value || ''}`}>
          <span className={styles.filterName}>
            <CheckboxField
              // TODO: using '--' because final form think that it is a nested fields
              name={`${group}:${item.value ? item.value.replace(/\./gi, '--') : 'na'}`}
              label={item.value || 'n/a'}
              disabled={!valueExists}
            />
          </span>
          <span className={styles.percentage}>
            <span>{valueExists ? humanize.transform(item.main_metric_percent, 'percent') : null}</span>
          </span>
        </div>
      );
    });
  return itemsList.length ? (
    <div>
      <p className={styles.filterHeaderWrapper}>
        <span className={styles.filterHeader}>{name}</span>
        {filteredData.filter(searchFilter).length > TOP_LIMIT ? (
          <span onClick={() => setShowTop(!showTop)} className={styles.showModeSwitcher}>
            {showTop ? `Show all (${filteredData.filter(searchFilter).length})` : `Show top ${TOP_LIMIT}`}
          </span>
        ) : (
          <span />
        )}
      </p>
      <Divider className={styles.divider} />
      {itemsList}
    </div>
  ) : null;
};
