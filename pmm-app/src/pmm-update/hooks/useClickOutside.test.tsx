import React, { createRef, FC } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { useClickOutside } from './useClickOutside';

const HookWrapper: FC<{ hook: () => any }> = ({ hook }) => {
  const dataHook = hook ? hook() : undefined;

  return <div data-hook={dataHook} />;
};

describe('useClickOutside', () => {
  it('should call the passed handler when clicked outside the passed ref or if Esc is pressed', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    const mockedHandler = jest.fn();

    const parent = document.createElement('div');

    document.body.appendChild(parent);

    const ref = createRef<HTMLDivElement>();

    mount(<div data-testid="referred" ref={ref} />, { attachTo: parent });

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useClickOutside(ref, mockedHandler)} />);
    });
    wrapper?.update();

    const referredElement = parent.querySelector('[data-testid="referred"]');

    const mouseClick = new MouseEvent('click', { bubbles: true });

    referredElement?.dispatchEvent(mouseClick);
    expect(mockedHandler).not.toBeCalled();

    parent.dispatchEvent(mouseClick);
    expect(mockedHandler).toBeCalledTimes(1);

    const keyboardEventEsc = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });

    referredElement?.dispatchEvent(keyboardEventEsc);
    expect(mockedHandler).toBeCalledTimes(2);

    referredElement?.dispatchEvent(keyboardEventEsc);
    expect(mockedHandler).toBeCalledTimes(3);

    const keyboardEventA = new KeyboardEvent('keydown', { key: 'A', bubbles: true });

    parent.dispatchEvent(keyboardEventA);
    expect(mockedHandler).toBeCalledTimes(3);

    referredElement?.dispatchEvent(keyboardEventA);
    expect(mockedHandler).toBeCalledTimes(3);

    wrapper?.unmount();
  });
});
