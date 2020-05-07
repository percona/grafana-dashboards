// Just a stub test
import Example from './Example';
import React from 'react';
import renderer from 'react-test-renderer';
import { DatabasesType } from '../Details.types';

jest.mock('react-highlight.js', () => {
  return ({ children }) => {
    return <div className="sql">{children}</div>;
  };
});
jest.mock('react-json-view', () => {
  return ({ src = {} }) => <div className="json" srcAttribute={JSON.stringify(src)}></div>;
});

describe('Example tab page render test', () => {
  it('Component shows error text when there is no examples', () => {
    const props = {
      databaseType: 'mongodb' as DatabasesType,
      examples: [],
      fingerprint: 'test fingerprint',
    };
    const component = renderer.create(<Example {...props} />);
    const componentInstance = component.root;
    expect(componentInstance.findByType('pre').children).toEqual(['Sorry, no examples found for this query']);
  });

  it('Component renders with fingerprint for postgresql', () => {
    const props = {
      databaseType: 'postgresql' as DatabasesType,
      examples: [],
      fingerprint: 'test fingerprint',
    };
    const component = renderer.create(<Example {...props} />);
    const componentInstance = component.root;
    expect(componentInstance.findByProps({ className: 'sql' }).children).toEqual(['test fingerprint']);
  });

  it('Component renders json example for mongodb', () => {
    const props = {
      databaseType: 'mongodb' as DatabasesType,
      examples: [
        {
          example:
          // eslint-disable-next-line max-len
            '{"ns":"admin.system.version","op":"command","command":{"collStats":"system.version","scale":{"$numberInt":"1"},"lsid":{"id":{"$binary":{"base64":"7bcIiWGnQ7eH3G+AfVMdEA==","subType":"04"}}},"$clusterTime":{"clusterTime":{"$timestamp":{"t":1588860655,"i":1}},"signature":{"hash":{"$binary":{"base64":"AAAAAAAAAAAAAAAAAAAAAAAAAAA=","subType":"00"}},"keyId":{"$numberLong":"0"}}},"$db":"admin","$readPreference":{"mode":"primaryPreferred"}}}',
          example_format: 'EXAMPLE',
          example_type: 'RANDOM',
          service_id: '/service_id/a0bf892b-931e-4fdd-aee1-566a3682a774',
          service_type: 'mongodb',
          tables: ['system.version'],
        },
      ],
      fingerprint: 'test fingerprint',
    };
    const component = renderer.create(<Example {...props} />);
    const componentInstance = component.root;
    expect(componentInstance.findByProps({ className: 'json' }).props.srcAttribute).toBe(
      props.examples[0].example
    );
  });

  it('Component renders classic example for mysql', () => {
    const props = {
      databaseType: 'mysql' as DatabasesType,
      examples: [
        {
          example: 'SELECT SUM(K) FROM sbtest1 WHERE id BETWEEN 91131 AND 91230',
          example_format: 'EXAMPLE',
          example_type: 'RANDOM',
          service_id: '/service_id/98f52fef-043b-47dc-9086-82c96581ff4d',
          service_type: 'mysql',
          schema: 'innodb',
        },
      ],
      fingerprint: 'test fingerprint',
    };
    const component = renderer.create(<Example {...props} />);
    const componentInstance = component.root;
    expect(componentInstance.findByProps({ className: 'sql' }).children[0]).toEqual(
      props.examples[0].example
    );
  });
});
