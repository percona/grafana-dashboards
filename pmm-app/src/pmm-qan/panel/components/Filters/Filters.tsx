import React, {
  FC, useContext, useEffect, useMemo, useRef, useState
} from 'react';
import { Button, Input, Spin } from 'antd';
import { Form } from 'react-final-form';
import ScrollArea from 'react-scrollbar';
import { cx } from 'emotion';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { Filter } from 'shared/components/Elements/Icons/Filter';
import { CheckboxGroup } from './components/CheckboxGroup/CheckboxGroup';
import { FILTERS_BODY_HEIGHT, FILTERS_GROUPS } from './Filters.constants';
import { styles } from './Filters.styles';
import { useFilters, useFiltersContainerHeight, useInitialFilterValues } from './Filters.hooks';
import { getSelectedCheckboxes } from './Filters.tools';
import { FiltersContainerProps } from './Filters.types';

export const FiltersContainer = ({
  contextActions, form, labels, filters, disabled
}: FiltersContainerProps) => {
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
      <ScrollArea className={styles.getFiltersWrapper(height)}>
        <Input
          suffix={<Filter />}
          placeholder="Filter by..."
          onChange={(e) => {
            setFilter(e.target.value);
            e.stopPropagation();
          }}
          value={filter}
          className={styles.filtersField}
          data-qa="filters-search-field"
        />
        {FILTERS_GROUPS.filter((group) => filters[group.dataKey]).map((group) => {
          const { name, dataKey } = group;

          return (
            <CheckboxGroup
              key={name}
              {...{
                name,
                items: filters[dataKey].name,
                group: dataKey,
                showAll,
                filter,
                labels,
              }}
            />
          );
        })}
      </ScrollArea>
    </div>
  );
};

export const Filters: FC = () => {
  const {
    contextActions,
    panelState: { labels = {}, loadingDetails },
  } = useContext(QueryAnalyticsProvider);
  const { filters, loading } = useFilters();
  const initialValues = useInitialFilterValues();

  return useMemo(() => (
    <Form
      onSubmit={() => {}}
      initialValues={initialValues}
      render={({ form, handleSubmit }) => (
        <Spin spinning={loading}>
          <form onSubmit={handleSubmit} onChange={() => contextActions.setLabels(form.getState().values)}>
            <FiltersContainer
              contextActions={contextActions}
              form={form}
              labels={labels}
              filters={filters}
              disabled={loadingDetails}
            />
          </form>
        </Spin>
      )}
    />
  ), [contextActions, filters, loading, loadingDetails, initialValues, labels]);
};
