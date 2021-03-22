import React from 'react';
import { mount } from 'enzyme';
import { Search } from './Search';

describe('Search::', () => {
  it('renders correctly', () => {
    const root = mount(<Search handleSearch={() => {}} />);

    expect(root.find('form').children().length).toBe(2);
  });
  it('renders correctly with initial value', () => {
    const root = mount(<Search handleSearch={() => {}} initialValue="Test value" />);

    expect(root.find('input').prop('value')).toEqual('Test value');
  });
  it('submits correctly', () => {
    const handleSearch = jest.fn();
    const root = mount(<Search handleSearch={handleSearch} />);

    root.find('form').simulate('submit');

    expect(handleSearch).toHaveBeenCalled();
  });
});
