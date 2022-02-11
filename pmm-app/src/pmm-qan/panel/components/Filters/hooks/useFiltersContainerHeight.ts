import { RefObject, useEffect, useState } from 'react';
import useWindowSize from '../../../../../shared/components/hooks/WindowSize.hooks';
import { FILTERS_BODY_HEIGHT, FILTERS_HEADER_SIZE, FILTERS_MARGIN_BOTTOM } from '../Filters.constants';

export const useFiltersContainerHeight = (initialValue: number, ref: RefObject<HTMLDivElement>) => {
  const [, winHeight] = useWindowSize();
  const [height, setHeight] = useState(initialValue);

  useEffect(() => {
    const filtersWrapperElement = ref.current?.getBoundingClientRect();
    const filtersHeight = filtersWrapperElement
      ? winHeight - filtersWrapperElement.y - FILTERS_HEADER_SIZE - FILTERS_MARGIN_BOTTOM
      : FILTERS_BODY_HEIGHT;

    setHeight(Math.max(filtersHeight, FILTERS_BODY_HEIGHT));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winHeight]);

  return height;
};
