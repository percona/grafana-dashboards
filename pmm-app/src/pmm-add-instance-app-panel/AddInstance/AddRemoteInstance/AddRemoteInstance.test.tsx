import { getInstanceData } from './AddRemoteInstance';

jest.mock('shared/components/helpers/notification-manager');

describe('Add remote instance', () => {
  it('get instance data should return correct one when isRDS is false', () => {
    const instanceType = 'postgresql';
    const credentials = {
      isRDS: false,
      address: 'test address',
      instance_id: 'test instance id',
      port: '5432',
      region: 'us-west1',
      aws_access_key: 'aws-secret-key-example',
      aws_secret_key: 'aws-secret-key-example',
      az: 'test az',
    };
    const testInstance = {
      instanceType: 'PostgreSQL',
      remoteInstanceCredentials: {
        isRDS: false,
        address: 'test address',
        instance_id: 'test instance id',
        service_name: 'test address',
        port: '5432',
        region: 'us-west1',
        aws_access_key: 'aws-secret-key-example',
        aws_secret_key: 'aws-secret-key-example',
        az: 'test az',
      },
    };

    expect(getInstanceData(instanceType, credentials)).toEqual(testInstance);
  });

  it('get instance data should return correct one when isRDS is true', () => {
    const instanceType = 'postgresql';
    const credentials = {
      isRDS: true,
      address: 'test address',
      instance_id: 'test instance id',
      port: '5432',
      region: 'us-west1',
      aws_access_key: 'aws-secret-key-example',
      aws_secret_key: 'aws-secret-key-example',
      az: 'test az',
    };
    const testInstance = {
      instanceType: 'PostgreSQL',
      remoteInstanceCredentials: {
        isRDS: true,
        address: 'test address',
        instance_id: 'test instance id',
        service_name: 'test instance id',
        port: '5432',
        region: 'us-west1',
        aws_access_key: 'aws-secret-key-example',
        aws_secret_key: 'aws-secret-key-example',
        az: 'test az',
      },
    };

    expect(getInstanceData(instanceType, credentials)).toEqual(testInstance);
  });
});
