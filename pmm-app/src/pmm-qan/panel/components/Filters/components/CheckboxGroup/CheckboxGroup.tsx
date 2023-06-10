import React, { FC, useRef } from 'react';
import { CheckboxField } from 'shared/components/Form/Checkbox/Checkbox';
import { humanize } from 'shared/components/helpers/Humanization';
import { Icon, useTheme } from '@grafana/ui';
import { ViewportList } from 'react-viewport-list';
import { RawTimeRange } from '@grafana/data';
import { getStyles } from './CheckboxGroup.styles';
import { CheckboxGroupProps } from './CheckboxGroup.types';

export const CheckboxGroup: FC<CheckboxGroupProps> = (
  {
    name,
    items,
    group,
    showAll,
    filter: searchFilterBy,
    getDashboardURL,
    rawTime,
  },
) => {
  const theme = useTheme();
  const styles = getStyles(theme);

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

  const itemsList = filteredData
    .filter((item, _, list) => !(showAll && !item.value && list.length === 1))
    .filter(searchFilter);

  const ref = useRef(null);
  const listRef = useRef(null);

  return itemsList.length ? (
    <div>
      <p className={styles.filterHeaderWrapper}>
        <span className={styles.filterHeader} data-testid="checkbox-group-header">
          {name}
        </span>
        <span
          className={styles.showModeSwitcher}
          data-testid="show-top-switcher"
        >
          {`${filteredData.filter(searchFilter).length}`}
        </span>
      </p>
      <div className={styles.divider} />
      <div className={styles.scrollContainer} ref={ref}>
        <ViewportList ref={listRef} viewportRef={ref} items={itemsList}>
          {(item) => (
            <FilterCheckbox
              key={item.value}
              hidden={false}
              item={item}
              group={group}
              getDashboardURL={getDashboardURL}
              rawTime={rawTime}
            />
          )}
        </ViewportList>
      </div>
    </div>
  ) : null;
};

export interface FilterCheckboxProps {
  hidden?: boolean,
  item: any;
  rawTime: RawTimeRange;
  group: string;
  getDashboardURL?: (value: string) => string;
}

export const FilterCheckbox: FC<FilterCheckboxProps> = (
  {
    hidden,
    getDashboardURL,
    item,
    group,
    rawTime,
  },
) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const valueExists = item.main_metric_percent !== undefined;
  const dashboardURL = getDashboardURL && getDashboardURL(item.value)
    ? `${getDashboardURL(item.value)}&from=${rawTime.from}&to=${rawTime.to}`
    : '';

  return (
    <div
      hidden={hidden}
      className={styles.label}
      data-testid={`filter-checkbox-${item.value}`}
    >
      <span className={styles.filterName}>
        <CheckboxField
              // TODO: using '--' because final form think that it is a nested fields
          name={`${group};${item.value ? item.value.replace(/\./gi, '--') : 'na'}`}
          label={item.value || 'n/a'}
          disabled={!valueExists}
        />
      </span>
      {dashboardURL && item.value && (
        <span className={styles.dashboardLink}>
          <a href={dashboardURL} target="_blank" rel="noreferrer">
            <Icon name="graph-bar" />
          </a>
        </span>
      )}
      <span className={styles.percentage}>
        <span>{valueExists ? humanize.transform(item.main_metric_percent, 'percent') : null}</span>
      </span>
    </div>
  );
};
