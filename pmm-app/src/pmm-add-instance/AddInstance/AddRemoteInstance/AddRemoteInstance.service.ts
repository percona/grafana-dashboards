class AddRemoteInstanceService {
  static async addMysql() {
    const data = {};

    const response = await fetch('/v1/management/MySQL/Add', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response.json();
  }

  static async addPostgresql() {
    const data = {};

    const response = await fetch('/v1/management/PostgreSQL/Add', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response.json();
  }

  static async addProxysql() {
    const data = {};

    const response = await fetch('/v1/management/ProxySQL/Add', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response.json();
  }

  static async addMongodb() {
    const data = {};

    const response = await fetch('/v1/management/MongoDB/Add', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response.json();
  }
}

export default AddRemoteInstanceService;
