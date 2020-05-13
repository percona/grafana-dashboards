import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import { PanelProvider } from '../../panel/panel.provider';
import { Form as FormFinal } from 'react-final-form';
import Search from 'antd/lib/input/Search';
import { CheckboxGroup } from './components/CheckboxGroup/CheckboxGroup';
import useWindowSize from 'react-plugins-deps/helpers/WindowSize.hooks';
import ScrollArea from 'react-scrollbar';
import {
  FILTERS_BODY_HEIGHT,
  FILTERS_GROUPS,
  FILTERS_HEADER_SIZE,
  FILTERS_MARGIN_BOTTOM,
} from './Filters.constants';
import { Styling } from './Filters.styles';
import { useFilters, useInitialFilterValues } from './Filters.hooks';

export const Filters = ({ contextActions, form, labels, filters }) => {
  // @ts-ignore
  const [width, height] = useWindowSize();
  const [filtersBodyHeight, setFiltersBodyHeight] = useState(FILTERS_BODY_HEIGHT);
  const [filter, setFilter] = useState('');
  const [showAll, showSetAll] = useState(true);
  const checkboxesSelected = FILTERS_GROUPS.map(group => filters[group.dataKey])
    .filter(Boolean)
    .map(item => item.name)
    .flat()
    .some(item => item.checked);

  // TODO: replace with something more elegant & fast
  useEffect(() => {
    const filtersWrapperElement = document.querySelector('#query-analytics-filters');
    const filtersHeight = filtersWrapperElement
      ? height - filtersWrapperElement.getBoundingClientRect().y - FILTERS_HEADER_SIZE - FILTERS_MARGIN_BOTTOM
      : FILTERS_BODY_HEIGHT;
    setFiltersBodyHeight(Math.max(filtersHeight, FILTERS_BODY_HEIGHT));
  }, [height]);

  return (
    <div>
      <div className={Styling.filtersHeader}>
        <h5 className={Styling.title}>Filters</h5>
        <Button
          type="link"
          className={Styling.showAllButton}
          onClick={showSetAll.bind(null, !showAll)}
          disabled={!checkboxesSelected}
        >
          {showAll ? 'Show Selected' : 'Show All'}
        </Button>
        <Button
          type="link"
          className={Styling.resetButton}
          id="reset-all-filters"
          onClick={() => {
            setFilter('');
            showSetAll(true);
            contextActions.resetLabels();
            form.reset();
          }}
          disabled={!checkboxesSelected}
        >
          Reset All
        </Button>
      </div>
      <ScrollArea className={Styling.getFiltersWrapper(filtersBodyHeight)}>
        <Search
          placeholder="Filters search..."
          onChange={e => {
            setFilter(e.target.value);
            e.stopPropagation();
          }}
          value={filter}
          style={{ width: '100%' }}
        />
        {FILTERS_GROUPS.filter(group => filters[group.dataKey]).map(group => {
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

const FiltersContainer = () => {
  const {
    contextActions,
    panelState: { labels = {} },
  } = useContext(PanelProvider);
  const { filters, loading } = useFilters();
  const initialValues = useInitialFilterValues();

  return (
    <FormFinal
      onSubmit={() => {}}
      initialValues={initialValues}
      render={({ form, handleSubmit }): ReactElement => {
        // @ts-ignore
        return (
          <Spin spinning={loading}>
            <form
              onSubmit={handleSubmit}
              className="app-theme-dark"
              onChange={() => contextActions.setLabels(form.getState().values)}
            >
              <Filters contextActions={contextActions} form={form} labels={labels} filters={filters} />
            </form>
          </Spin>
        );
      }}
    />
  );
};

export default FiltersContainer;
