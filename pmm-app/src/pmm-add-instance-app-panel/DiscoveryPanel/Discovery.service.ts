class DiscoveryService {
  static async discoveryRDS({ aws_secret_key, aws_access_key }) {
    const data = {
      aws_secret_key: aws_secret_key,
      aws_access_key: aws_access_key,
    };

    const response = await fetch('/v1/management/RDS/Discover', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();

    // return {
    //   rds_instances: [
    //     {
    //       region: 'us-west1',
    //       instance_id: 'sdadadqdmj238e12en',
    //       az: 'some az',
    //       node_model: 'node model',
    //       address: 'mysql.example.com',
    //       port: '3306',
    //       engine: 'DISCOVER_RDS_MYSQL',
    //       engine_version: '5.6.11',
    //     },
    //     {
    //       region: 'us-west1',
    //       instance_id: 'sdadadqdmj238e12en',
    //       az: 'some az',
    //       node_model: 'node model',
    //       address: 'mysql.example.com',
    //       port: '3306',
    //       engine: 'DISCOVER_RDS_MYSQL',
    //       engine_version: '5.6.11',
    //     },
    //     {
    //       region: 'us-west1',
    //       instance_id: 'sdadadqdmj238e12en',
    //       az: 'some az',
    //       node_model: 'node model',
    //       address: 'mysql.example.com',
    //       port: '3306',
    //       engine: 'DISCOVER_RDS_MYSQL',
    //       engine_version: '5.6.11',
    //     },
    //     {
    //       region: 'us-west1',
    //       instance_id: 'sdadadqdmj238e12en',
    //       az: 'some az',
    //       node_model: 'node model',
    //       address: 'mysql.example.com',
    //       port: '3306',
    //       engine: 'DISCOVER_RDS_MYSQL',
    //       engine_version: '5.6.11',
    //     },
    //   ],
    // };
  }
}

export default DiscoveryService;
