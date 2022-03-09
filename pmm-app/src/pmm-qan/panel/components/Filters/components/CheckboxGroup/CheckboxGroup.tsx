import React, { FC, useMemo, useState } from 'react';
import { CheckboxField } from 'shared/components/Form/Checkbox/Checkbox';
import { humanize } from 'shared/components/helpers/Humanization';
import { useTheme, Icon } from '@grafana/ui';
import { getStyles } from './CheckboxGroup.styles';
import { TOP_LIMIT } from './CheckboxGroup.constants';
import { CheckboxGroupProps } from './CheckboxGroup.types';
import { Messages } from './CheckboxGroup.messages';

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  name,
  items,
  group,
  showAll,
  filter: searchFilterBy,
  getDashboardURL,
  rawTime,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

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

  const itemsList = filteredData
    .filter((item, _, list) => {
      if (showAll && !item.value && list.length === 1) {
        return false;
      }

      return true;
    })
    .filter(searchFilter);

  const FilterCheckbox = useMemo(
    () => ({ item }) => {
      const valueExists = item.main_metric_percent !== undefined;
      const dashboardURL = getDashboardURL && getDashboardURL(item.value)
        ? `${getDashboardURL(item.value)}&from=${rawTime.from}&to=${rawTime.to}`
        : '';

      return (
        <div
          className={styles.label}
          key={`${group};${item.value || ''}`}
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [group, rawTime],
  );

  const filteredList = showTop ? itemsList.slice(0, TOP_LIMIT) : itemsList;

  const hiddenSelectedFilters = items
    .slice(TOP_LIMIT, items.length)
    .filter(({ checked }) => checked)
    .filter(searchFilter);

  return filteredList.length ? (
    <div>
      <p className={styles.filterHeaderWrapper}>
        <span className={styles.filterHeader} data-testid="checkbox-group-header">
          {name}
        </span>
        {filteredData.filter(searchFilter).length > TOP_LIMIT ? (
          <span
            onClick={() => setShowTop(!showTop)}
            className={styles.showModeSwitcher}
            data-testid="show-top-switcher"
          >
            {showTop ? `Show all (${filteredData.filter(searchFilter).length})` : `Show top ${TOP_LIMIT}`}
          </span>
        ) : (
          <span />
        )}
      </p>
      <div className={styles.divider} />
      {filteredList.map((item) => (
        <FilterCheckbox item={item} />
      ))}

      {showTop && hiddenSelectedFilters.length && filteredList.length >= TOP_LIMIT ? (
        <>
          <p className={styles.notTopWrapper}>
            <span className={styles.notTopHeader}>{Messages.titles.additionalSelectedSection}</span>
          </p>
          {hiddenSelectedFilters.map((item) => (
            <FilterCheckbox item={item} />
          ))}
        </>
      ) : null}
    </div>
  ) : null;
};
