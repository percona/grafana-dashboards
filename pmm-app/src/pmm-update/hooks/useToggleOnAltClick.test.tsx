import React, { FC } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { useToggleOnAltClick } from './useToggleOnAltClick';

const HookWrapper: FC<{ hook: () => any }> = ({ hook }) => {
  const dataHook = hook ? hook() : undefined;

  return <div data-hook={dataHook} />;
};

describe('useToggleOnAltClick', () => {
  it('should toggle a boolean value on alt+click on a compunent using the returned handler', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useToggleOnAltClick()} />);
    });
    wrapper?.update();

    let [toggleValue, handler] = wrapper?.find('div').prop<any>('data-hook');

    expect(toggleValue).toEqual(false);

    const testComponent = mount(<div onClick={handler} />);

    testComponent.simulate('click', { altKey: true });

    wrapper?.update();

    [toggleValue, handler] = wrapper?.find('div').prop<any>('data-hook');

    expect(toggleValue).toEqual(true);

    wrapper?.unmount();
  });

  it('should do nothing if alt is not pressed while clicking', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useToggleOnAltClick()} />);
    });
    wrapper?.update();

    let [toggleValue, handler] = wrapper?.find('div').prop<any>('data-hook');

    expect(toggleValue).toEqual(false);

    const testComponent = mount(<div onClick={handler} />);

    testComponent.simulate('click', { altKey: false });

    wrapper?.update();

    [toggleValue, handler] = wrapper?.find('div').prop<any>('data-hook');

    expect(toggleValue).toEqual(false);

    wrapper?.unmount();
  });
});
