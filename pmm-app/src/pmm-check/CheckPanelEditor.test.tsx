import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
  LoadingState, PanelEditorProps, TimeRange, dateTime,
} from '@grafana/data';

import { CheckPanelOptions } from './types';
import { CheckPanelEditor } from './CheckPanelEditor';

describe('CheckPanelEditor::', () => {
  const props = {
    options: {
      title: 'Test title',
    },
    onOptionsChange: jest.fn(),
    data: {
      state: 'Done' as LoadingState,
      series: [],
      timeRange: {
        from: dateTime(new Date()),
        to: dateTime(new Date()),
        raw: {
          from: '',
          to: '',
        },
      } as TimeRange,
    },
  };
  let wrapper: ShallowWrapper<PanelEditorProps<CheckPanelOptions>, Readonly<{}>>;

  beforeEach(() => {
    wrapper = shallow(<CheckPanelEditor {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should have the title passed as a prop as default value', () => {
    const InputField = wrapper.find('[data-qa="check-panel-editor-title-input"]');

    expect(InputField.length).toEqual(1);
    expect(InputField.props()).toHaveProperty('value', props.options.title);
  });

  it('should have an empty string as default value if title is not specified', () => {
    const panelEditorProps = {
      ...props,
      options: {
      },
    };

    const wrapper = shallow(<CheckPanelEditor {...panelEditorProps} />);

    const InputField = wrapper.find('[data-qa="check-panel-editor-title-input"]');

    expect(InputField.props()).toHaveProperty('value', '');
  });

  it('should render the title passed as a prop', () => {
    const InputField = wrapper.find('[data-qa="check-panel-editor-title-input"]');

    InputField.simulate('change', { target: { value: 'Test' } });

    expect(props.onOptionsChange).toHaveBeenCalledTimes(1);
    expect(props.onOptionsChange).toHaveBeenCalledWith({ title: 'Test' });
  });
});
