import { shallow } from 'enzyme';
import { Details } from './Details';
import { DATA_SOURCE } from '../../CheckPanel.constants';

describe('Details::', () => {
  it('should render a list with two list items', () => {
    const root = shallow(Details(DATA_SOURCE[0].details));

    expect(root.find('ul').find('li').length).toEqual(2);
  });
});
