import React from 'react';
import { shallow } from 'enzyme';
import { activeCheckStub } from 'pmm-check/__mocks__/stubs';
import { SilenceAlertButton } from 'pmm-check/components';
import { TableDataAlertDetails } from 'pmm-check/components/Table';
import { SEVERITY } from 'pmm-check/CheckPanel.constants';

jest.mock('shared/components/helpers/notification-manager');

describe('TableDataAlertDetails::', () => {
  it('should correctly render the severity level', () => {
    const detailsItem = activeCheckStub[0].details[0];

    const root = shallow(<TableDataAlertDetails detailsItem={detailsItem} />);

    expect(root.find('td').at(0).text()).toEqual(SEVERITY[detailsItem.labels.severity]);
  });

  it('should correctly render the description', () => {
    const detailsItem = activeCheckStub[0].details[0];

    const root = shallow(<TableDataAlertDetails detailsItem={detailsItem} />);

    expect(root.find('td').at(1).text()).toEqual(detailsItem.description);
  });

  it('should show a silence alert button', () => {
    const detailsItem = activeCheckStub[0].details[0];

    const root = shallow(<TableDataAlertDetails detailsItem={detailsItem} />);

    expect(root.find('td').at(2).find(SilenceAlertButton).length).toEqual(1);
  });
});
