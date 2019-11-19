class DiscoveryService {
  static async discoveryRDS({ aws_secret_key, aws_access_key }) {
    const data = {
      aws_secret_key: aws_secret_key,
      aws_access_key: aws_access_key,
    };

    const response = await fetch('/v1/management/Discovery/RDS', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response.json();
  }
}

export default DiscoveryService;
