// Just a stub test
import React from 'react';
import sqlFormatter from 'sql-formatter';
import { mount } from 'enzyme';
import Example from './Example';
import { DatabasesType } from '../Details.types';

jest.mock('react-highlight.js', () => ({ children }) => <div className="sql">{children}</div>);
jest.mock('react-json-view', () => ({ src = {} }) => <div className="json" data-src={JSON.stringify(src)} />);

describe('Example tab page render test', () => {
  it('Component shows error text when there is no examples', () => {
    const props = {
      databaseType: 'mongodb' as DatabasesType,
      examples: [],
      fingerprint: 'test fingerprint',
    };
    const component = mount(<Example {...props} />);

    expect(component.find('pre').text()).toContain('Sorry, no examples found for this query');
  });

  it('Component renders with fingerprint for postgresql', () => {
    const props = {
      databaseType: 'postgresql' as DatabasesType,
      examples: [],
      fingerprint: 'test fingerprint',
    };
    const component = mount(<Example {...props} />);

    expect(component.find('.sql').text()).toContain('test fingerprint');
  });

  it('Component renders json example for mongodb', () => {
    const props = {
      databaseType: 'mongodb' as DatabasesType,
      examples: [
        {
          example:
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
    const innerExample = '{&quot;ns&quot;:&quot;admin.system.version&quot;,&quot;op&quot;:&quot;command&quot;,&quot;command&quot;:{&quot;collStats&quot;:&quot;system.version&quot;,&quot;scale&quot;:{&quot;$numberInt&quot;:&quot;1&quot;},&quot;lsid&quot;:{&quot;id&quot;:{&quot;$binary&quot;:{&quot;base64&quot;:&quot;7bcIiWGnQ7eH3G+AfVMdEA==&quot;,&quot;subType&quot;:&quot;04&quot;}}},&quot;$clusterTime&quot;:{&quot;clusterTime&quot;:{&quot;$timestamp&quot;:{&quot;t&quot;:1588860655,&quot;i&quot;:1}},&quot;signature&quot;:{&quot;hash&quot;:{&quot;$binary&quot;:{&quot;base64&quot;:&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;,&quot;subType&quot;:&quot;00&quot;}},&quot;keyId&quot;:{&quot;$numberLong&quot;:&quot;0&quot;}}},&quot;$db&quot;:&quot;admin&quot;,&quot;$readPreference&quot;:{&quot;mode&quot;:&quot;primaryPreferred&quot;}}}';
    const component = mount(<Example {...props} />);

    expect(component.find('.json').html()).toContain(innerExample);
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
    const component = mount(
      <Example databaseType={props.databaseType} examples={props.examples} fingerprint={props.fingerprint} />
    );

    expect(component.find('.sql').text()).toEqual(sqlFormatter.format(props.examples[0].example));
  });
});
