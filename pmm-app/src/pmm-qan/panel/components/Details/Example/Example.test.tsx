// Just a stub test
import React from 'react';
import sqlFormatter from 'sql-formatter';
import { render, screen } from '@testing-library/react';
import Example from './Example';
import { DatabasesType } from '../Details.types';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('react-json-view', () => ({ src = {} }) => <div className="json" data-src={JSON.stringify(src)} />);

describe('Example tab page render test', () => {
  xit('Component shows error text when there is no examples', () => {
    const props = {
      databaseType: 'mongodb' as DatabasesType,
      examples: [],
    };
    const { container } = render(<Example {...props} />);

    expect(container.querySelector('pre')?.textContent).toContain('Sorry, no examples found for this query');
  });

  xit('Component renders classic example for postgresql', () => {
    const props = {
      databaseType: 'postgresql' as DatabasesType,
      examples: [
        {
          example: 'SELECT SUM(K) FROM sbtest1 WHERE id BETWEEN 91131 AND 91230',
          example_format: 'EXAMPLE',
          example_type: 'RANDOM',
          service_id: '/service_id/98f52fef-043b-47dc-9086-82c96581ff4d',
          service_type: 'postgresql' as DatabasesType,
        },
      ],
    };

    render(<Example databaseType={props.databaseType} examples={props.examples} />);

    expect(screen.getByTestId('highlight-code').textContent).toEqual(sqlFormatter.format(props.examples[0].example));
  });

  xit('Component renders json example for mongodb', () => {
    const props = {
      databaseType: 'mongodb' as DatabasesType,
      examples: [
        {
          example:
            '{"ns":"admin.system.version","op":"command","command":{"collStats":"system.version","scale":{"$numberInt":"1"},"lsid":{"id":{"$binary":{"base64":"7bcIiWGnQ7eH3G+AfVMdEA==","subType":"04"}}},"$clusterTime":{"clusterTime":{"$timestamp":{"t":1588860655,"i":1}},"signature":{"hash":{"$binary":{"base64":"AAAAAAAAAAAAAAAAAAAAAAAAAAA=","subType":"00"}},"keyId":{"$numberLong":"0"}}},"$db":"admin","$readPreference":{"mode":"primaryPreferred"}}}',
          example_format: 'EXAMPLE',
          example_type: 'RANDOM',
          service_id: '/service_id/a0bf892b-931e-4fdd-aee1-566a3682a774',
          service_type: 'mongodb' as DatabasesType,
          tables: ['system.version'],
        },
      ],
    };
    const innerExample = '{"ns":"admin.system.version","op":"command","command":{"collStats":"system.version","scale":{"$numberInt":"1"},"lsid":{"id":{"$binary":{"base64":"7bcIiWGnQ7eH3G+AfVMdEA==","subType":"04"}}},"$clusterTime":{"clusterTime":{"$timestamp":{"t":1588860655,"i":1}},"signature":{"hash":{"$binary":{"base64":"AAAAAAAAAAAAAAAAAAAAAAAAAAA=","subType":"00"}},"keyId":{"$numberLong":"0"}}},"$db":"admin","$readPreference":{"mode":"primaryPreferred"}}}';
    const { container } = render(<Example {...props} />);

    expect(container.querySelector('.json')?.getAttribute('data-src')).toContain(innerExample);
  });

  xit('Component renders when invalid json example is provided for mongodb', () => {
    const props = {
      databaseType: 'mongodb' as DatabasesType,
      examples: [
        {
          example:
            '{"ns":"admin.system.version","op":"command","command":{"collStats":"system.version"',
          example_format: 'EXAMPLE',
          example_type: 'RANDOM',
          service_id: '/service_id/a0bf892b-931e-4fdd-aee1-566a3682a774',
          service_type: 'mongodb' as DatabasesType,
          tables: ['system.version'],
        },
      ],
    };

    render(<Example {...props} />);

    expect(screen.getByTestId('example-query-invalid')).toBeDefined();
  });

  xit('Component renders classic example for mysql', () => {
    const props = {
      databaseType: 'mysql' as DatabasesType,
      examples: [
        {
          example: 'SELECT SUM(K) FROM sbtest1 WHERE id BETWEEN 91131 AND 91230',
          example_format: 'EXAMPLE',
          example_type: 'RANDOM',
          fingerprint: 'SELECT SUM(K) FROM sbtest1 WHERE id BETWEEN :1 AND :2',
          placeholder_count: 2,
          service_id: '/service_id/98f52fef-043b-47dc-9086-82c96581ff4d',
          service_type: 'mysql' as DatabasesType,
          schema: 'innodb',
        },
      ],
    };

    render(<Example databaseType={props.databaseType} examples={props.examples} />);

    expect(screen.getByTestId('highlight-code').textContent).toEqual(sqlFormatter.format(props.examples[0].example));
  });
});
