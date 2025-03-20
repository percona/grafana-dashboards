import React from 'react';
import { render } from "@testing-library/react";
import { OptionContent } from './OptionContent';

const title = 'Shared Blocks Written';
const description = 'Total number of shared blocks written by the statement';
const tags = ['mysql', 'postgresql'];

describe('OptionContent::', () => {
  it('should render with title, description and tags', () => {
    const {container} = render(<OptionContent title={title} description={description} tags={tags} />);
    const spans = container.querySelectorAll('div > div > span');

    expect(spans[0].textContent).toEqual(title);
    expect(spans[1].textContent).toEqual(description);
    expect(spans[2].textContent).toEqual(tags[0]);
    expect(spans[3].textContent).toEqual(tags[1]);
  });

  it('should render with title, description and one tag', () => {
    const {container} = render(<OptionContent title={title} description={description} tags={[tags[0]]} />);
    const spans = container.querySelectorAll('div > div > span');

    expect(spans[0].textContent).toEqual(title);
    expect(spans[1].textContent).toEqual(description);
    expect(spans[2].textContent).toEqual(tags[0]);
  });

  it('should render with title, description and empty tags', () => {
    const {container} = render(<OptionContent title={title} description={description} tags={[]} />);
    const spans = container.querySelectorAll('div > div > span');

    expect(spans[0].textContent).toEqual(title);
    expect(spans[1].textContent).toEqual(description);
    expect(spans.length).toEqual(2);
  });
});
