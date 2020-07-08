import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { COLUMNS } from 'pmm-check/CheckPanel.constants';
import { activeCheckStub } from 'pmm-check/__mocks__/stubs';
import { Table } from './Table';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

describe('Table::', () => {
  it('should render the link to Settings when STT is disabled', () => {
    const root = shallow(<Table columns={COLUMNS} isSttEnabled={false} data={[]} />);

    expect(root.find('[data-qa="db-check-panel-settings-link"]').length).toEqual(1);
    const text = 'Security Threat Tool is disabled. You can enable it in PMM Settings.';

    expect(root.find('[data-qa="db-check-panel-settings-link"]').text()).toEqual(text);

    // See if the link is rendered
    expect(root.find(Link).length).toEqual(1);
  });

  it('should display a custom message if STT is enabled and data is empty', () => {
    const root = shallow(<Table columns={COLUMNS} isSttEnabled data={[]} />);

    const emptyDiv = root.find('[data-qa="db-check-panel-table-empty"]');

    expect(emptyDiv.length).toEqual(1);
    expect(emptyDiv.text()).toEqual('No failed checks. Checks run every 24 hours.');
  });

  it('should render the table with a header and a body if STT is enabled and data is not empty', () => {
    const root = shallow(<Table columns={COLUMNS} isSttEnabled data={activeCheckStub} />);

    const table = root.find('[data-qa="db-check-panel-table"]');

    expect(table.length).toEqual(1);
    expect(table.find(TableHeader).length).toEqual(1);
    expect(table.find(TableBody).length).toEqual(1);
  });

  it('should render the table with a message when the user only has reader access', () => {
    const root = shallow(<Table columns={COLUMNS} isSttEnabled hasNoAccess />);

    const empty = root.find('[data-qa="db-check-panel-no-access"]');

    expect(empty.text()).toEqual('Insufficient access rights.');
  });
});
