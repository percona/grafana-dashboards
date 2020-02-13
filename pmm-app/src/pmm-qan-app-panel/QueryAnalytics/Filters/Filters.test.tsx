// Just a stub test
import { Filters } from './Filters';
import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('antd/es/input/Search', () => () => {
  return <></>;
});

jest.mock('../../../react-plugins-deps/components/helpers/notification-manager', () => () => ({}));

describe('Filters test', () => {
  it('Renders correct with right props', () => {
    console.log(<Filters groups={[]} filters={{}} labels={{}} dispatch={() => {}} form={{}} />);
    const component = renderer.create(
      <div>
        <Filters groups={[]} filters={{}} labels={{}} dispatch={() => {}} form={{}} />
      </div>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
