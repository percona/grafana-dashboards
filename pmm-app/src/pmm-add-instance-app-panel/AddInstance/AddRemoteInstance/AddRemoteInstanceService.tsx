class AddRemoteInstanceService {
  static async addMysql(data) {
    const response = await fetch('/v1/management/MySQL/Add', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

  static async addPostgresql(data) {
    const response = await fetch('/v1/management/PostgreSQL/Add', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

  static async addProxysql(data) {
    const response = await fetch('/v1/management/ProxySQL/Add', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

  static async addMongodb(data) {
    const response = await fetch('/v1/management/MongoDB/Add', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

  static createInstance(type, data) {
    switch (type) {
      case 'MongoDB':
        return AddRemoteInstanceService.addMongodb(data);
      case 'MySQL':
        return AddRemoteInstanceService.addMysql(data);
      case 'ProxySQL':
        return AddRemoteInstanceService.addProxysql(data);
      case 'PostgreSQL':
        return AddRemoteInstanceService.addPostgresql(data);
      default:
        return AddRemoteInstanceService.addPostgresql(data);
    }
  }
}

export default AddRemoteInstanceService;
