import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import { Form } from 'react-final-form';
import { cx } from '@emotion/css';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { Filter } from 'shared/components/Elements/Icons';
import { Scrollbar } from 'shared/components/Elements/Scrollbar/Scrollbar';
import { Input, useTheme, Button } from '@grafana/ui';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { CheckboxGroup } from './components/CheckboxGroup/CheckboxGroup';
import { FILTERS_BODY_HEIGHT, FILTERS_GROUPS } from './Filters.constants';
import { getSelectedCheckboxes } from './Filters.tools';
import { getStyles } from './Filters.styles';
import { useFilters } from './hooks/useFilters';
import { useInitialFilterValues } from './hooks/useInitialFilterValues';
import { useFiltersContainerHeight } from './hooks/useFiltersContainerHeight';
import { Messages } from './Filters.messages';
import 'shared/style.less';

export const Filters: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const {
    contextActions,
    panelState: { loadingDetails, rawTime },
  } = React.useContext(QueryAnalyticsProvider);
  const [filters, loading] = useFilters();
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

  const ShowAllButton = ({ loading }) => (
    <Button
      variant="primary"
      fill="text"
      size="sm"
      key="qan-filters-show-selected"
      onClick={() => showSetAll(!showAll)}
      data-testid="qan-filters-show-selected"
      disabled={!selectedCheckboxes || loading}
      className={styles.resetButton}
    >
      {showAll ? Messages.buttons.showSelected : Messages.buttons.showAll}
    </Button>
  );

  const ResetButton = ({ loading }) => (
    <Button
      variant="primary"
      fill="text"
      size="sm"
      key="qan-filters-reset-all"
      data-testid="qan-filters-reset-all"
      disabled={!selectedCheckboxes || loading}
      className={styles.resetButton}
      type="reset"
    >
      {Messages.buttons.reset}
    </Button>
  );

  const FiltersHeader = ({ loading }) => (
    <div className={styles.filtersHeader}>
      <h5 className={styles.title}>Filters</h5>
      <ShowAllButton loading={loading} />
      <ResetButton loading={loading} />
    </div>
  );

  const FilterInput = useMemo(
    () => ({ filter }) => (
      <Input
        suffix={<Filter className={styles.icon} />}
        placeholder="Filter by..."
        data-testid="filters-search-field"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          const element = e.target as HTMLInputElement;

          setFilter(element.value);
          e.stopPropagation();
        }}
        value={filter}
        className={styles.filtersField}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Form
      onSubmit={() => {}}
      initialValues={initialValues}
      render={({ form, handleSubmit }) => (
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
            <FiltersHeader loading={loading} />
            <Overlay isPending={loading}>
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
            </Overlay>
          </div>
        </form>
      )}
    />
  );
};
