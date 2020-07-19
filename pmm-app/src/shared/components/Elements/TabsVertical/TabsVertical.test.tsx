import React from 'react';
import { shallow } from 'enzyme';
import { TabsVertical } from './TabsVertical';


describe('TabsVertical::', () => {
  it('Renders children correctly', () => {
    // eslint-disable-next-line react/jsx-one-expression-per-line
    const root = shallow(<TabsVertical><div>1</div><div>2</div></TabsVertical>);

    expect(root.find('[data-qa="tabs-vertical-list"]').children().length).toEqual(2);
  });
});
