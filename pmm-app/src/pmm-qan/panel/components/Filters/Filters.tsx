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
import { useFilters, useFiltersContainerHeight, useInitialFilterValues } from './Filters.hooks';
import { getSelectedCheckboxes } from './Filters.tools';
import { FiltersContainerProps } from './Filters.types';
import { getStyles } from './Filters.styles';

export const FiltersContainer: FC<FiltersContainerProps> = ({
  contextActions,
  form,
  filters,
  disabled,
  rawTime,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const filtersWrapperRef = useRef<HTMLDivElement>(null);

  const height = useFiltersContainerHeight(FILTERS_BODY_HEIGHT, filtersWrapperRef);
  const [filter, setFilter] = useState('');
  const [showAll, showSetAll] = useState(true);
  const selectedCheckboxes = getSelectedCheckboxes(filters);

  useEffect(() => {
    if (!selectedCheckboxes) {
      showSetAll(true);
    }
  }, [selectedCheckboxes]);

  return (
    <div ref={filtersWrapperRef} className={cx({ [styles.filtersDisabled]: disabled })}>
      <div className={styles.filtersHeader}>
        <h5 className={styles.title}>Filters</h5>
        <Button
          type="link"
          className={styles.showAllButton}
          onClick={() => showSetAll(!showAll)}
          disabled={!selectedCheckboxes}
          data-qa="qan-filters-show-selected"
        >
          {showAll ? 'Show Selected' : 'Show All'}
        </Button>
        <Button
          type="link"
          className={styles.resetButton}
          data-qa="qan-filters-reset-all"
          onClick={() => {
            setFilter('');
            showSetAll(true);
            contextActions.resetLabels();
            form.reset();
          }}
          disabled={!selectedCheckboxes}
        >
          Reset All
        </Button>
      </div>
      <Scrollbar className={styles.getFiltersWrapper(height)}>
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
  );
};

export const Filters: FC = () => {
  const {
    contextActions,
    panelState: { loadingDetails, rawTime },
  } = useContext(QueryAnalyticsProvider);
  const { filters, loading } = useFilters();
  const initialValues = useInitialFilterValues();

  return useMemo(
    () => (
      <Form
        onSubmit={() => {}}
        initialValues={initialValues}
        render={({ form, handleSubmit }) => (
          <Spin spinning={loading}>
            <form onSubmit={handleSubmit} onChange={() => contextActions.setLabels(form.getState().values)}>
              <FiltersContainer
                contextActions={contextActions}
                form={form}
                filters={filters}
                disabled={loadingDetails}
                rawTime={rawTime}
              />
            </form>
          </Spin>
        )}
      />
    ),
    [contextActions, filters, loading, loadingDetails, initialValues, rawTime],
  );
};
