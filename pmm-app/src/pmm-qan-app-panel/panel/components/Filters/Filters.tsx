import React, { useContext, useState } from 'react';
import { Button, Spin, Input} from 'antd';
import { Form } from 'react-final-form';
import ScrollArea from 'react-scrollbar';
import { QueryAnalyticsProvider } from 'pmm-qan-app-panel/panel/panel.provider';
import { Filter } from 'shared/components/Elements/Icons/Filter';
import { CheckboxGroup } from './components/CheckboxGroup/CheckboxGroup';
import { FILTERS_BODY_HEIGHT, FILTERS_GROUPS } from './Filters.constants';
import { styles } from './Filters.styles';
import { useFilters, useFiltersContainerHeight, useInitialFilterValues } from './Filters.hooks';
import { getSelectedCheckboxes } from './Filters.tools';

export const FiltersContainer = ({
  contextActions, form, labels, filters
}) => {
  const height = useFiltersContainerHeight(FILTERS_BODY_HEIGHT);
  const [filter, setFilter] = useState('');
  const [showAll, showSetAll] = useState(true);
  const selectedCheckboxes = getSelectedCheckboxes(filters)

  return (
    <div>
      <div className={styles.filtersHeader}>
        <h5 className={styles.title}>Filters</h5>
        <Button
          type="link"
          className={styles.showAllButton}
          onClick={() => showSetAll(!showAll)}
          disabled={!selectedCheckboxes}
        >
          {showAll ? 'Show Selected' : 'Show All'}
        </Button>
        <Button
          type="link"
          className={styles.resetButton}
          id="reset-all-filters"
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

export const Filters = () => {
  const {
    contextActions,
    panelState: { labels = {} },
  } = useContext(QueryAnalyticsProvider);
  const { filters, loading } = useFilters();
  const initialValues = useInitialFilterValues();

  return (
    <Form
      onSubmit={() => {}}
      initialValues={initialValues}
      render={({ form, handleSubmit }) => (
        // @ts-ignore
        <Spin spinning={loading}>
          <form onSubmit={handleSubmit} onChange={() => contextActions.setLabels(form.getState().values)}>
            <FiltersContainer contextActions={contextActions} form={form} labels={labels} filters={filters} />
          </form>
        </Spin>
      )}
    />
  );
};
