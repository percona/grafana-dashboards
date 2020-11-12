import React, {
  FC, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { Button, Input, Spin } from 'antd';
import { Form } from 'react-final-form';
import { cx } from 'emotion';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { Filter } from 'shared/components/Elements/Icons/Filter';
import { Scrollbar } from 'shared/components/Elements/Scrollbar/Scrollbar';
import { useTheme } from '@grafana/ui';
import { CheckboxGroup } from './components/CheckboxGroup/CheckboxGroup';
import { FILTERS_BODY_HEIGHT, FILTERS_GROUPS } from './Filters.constants';
import { getSelectedCheckboxes } from './Filters.tools';
import { getStyles } from './Filters.styles';
import { useFilters } from './hooks/useFilters';
import { useInitialFilterValues } from './hooks/useInitialFilterValues';
import { useFiltersContainerHeight } from './hooks/useFiltersContainerHeight';
import { Messages } from './Filters.messages';

export const Filters: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const {
    contextActions,
    panelState: { loadingDetails, rawTime },
  } = useContext(QueryAnalyticsProvider);

  const { filters, loading } = useFilters();
  const initialValues = useInitialFilterValues();
  const filtersWrapperRef = useRef<HTMLDivElement>(null);
  const height = useFiltersContainerHeight(FILTERS_BODY_HEIGHT, filtersWrapperRef);
  const [showAll, showSetAll] = useState(true);
  const [filter, setFilter] = useState('');
  const selectedCheckboxes = getSelectedCheckboxes(filters);

  useEffect(() => {
    if (!selectedCheckboxes) {
      showSetAll(true);
    }
  }, [selectedCheckboxes]);

  const ShowAllButton = () => (
    <Button
      type="link"
      className={styles.showAllButton}
      onClick={() => showSetAll(!showAll)}
      disabled={!selectedCheckboxes}
      data-qa="qan-filters-show-selected"
    >
      {showAll ? Messages.buttons.showSelected : Messages.buttons.showAll}
    </Button>
  );

  const ResetButton = () => (
    <Button
      type="link"
      htmlType="reset"
      className={styles.resetButton}
      data-qa="qan-filters-reset-all"
      disabled={!selectedCheckboxes}
    >
      {Messages.buttons.reset}
    </Button>
  );

  const FiltersHeader = () => (
    <div className={styles.filtersHeader}>
      <h5 className={styles.title}>Filters</h5>
      <ShowAllButton />
      <ResetButton />
    </div>
  );

  const FilterInput = useMemo(
    () => ({ filter }) => (
      <Input
        suffix={<Filter fill="#c6c6c6" />}
        placeholder="Filter by..."
        onChange={(e) => {
          setFilter(e.target.value);
          e.stopPropagation();
        }}
        value={filter}
        className={styles.filtersField}
        data-qa="filters-search-field"
      />
    ),
    [],
  );

  return (
    <Form
      onSubmit={() => {}}
      initialValues={initialValues}
      render={({ form, handleSubmit }) => (
        <Spin spinning={loading}>
          <form
            onSubmit={handleSubmit}
            onChange={() => {
              contextActions.setLabels(form.getState().values);
            }}
            onReset={() => {
              contextActions.resetLabels();
              setFilter('');
            }}
          >
            <div ref={filtersWrapperRef} className={cx({ [styles.filtersDisabled]: loadingDetails })}>
              <FiltersHeader />
              <Scrollbar className={styles.getFiltersWrapper(height)}>
                <FilterInput filter={filter} />
                {FILTERS_GROUPS.filter((group) => filters[group.dataKey]).map(
                  ({ name, dataKey, getDashboardURL }) => (
                    <CheckboxGroup
                      key={name}
                      name={name}
                      items={filters[dataKey].name}
                      group={dataKey}
                      showAll={showAll}
                      filter={filter}
                      getDashboardURL={getDashboardURL}
                      rawTime={rawTime}
                    />
                  ),
                )}
              </Scrollbar>
            </div>
          </form>
        </Spin>
      )}
    />
  );
};
