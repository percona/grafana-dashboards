import React from 'react';
import { render } from '@testing-library/react';
import { OverflowTooltip } from './OverflowTooptip';

xdescribe('OverflowTooltip test', () => {
  it('OverflowTooltip renders correctly with children', () => {
    const { asFragment } = render(<OverflowTooltip>Test label</OverflowTooltip>);

    const firstRender = asFragment();

    expect(firstRender).toMatchSnapshot();
  });
});
