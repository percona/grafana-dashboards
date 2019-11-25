class SettingsService {
  static async getSettings() {
    const response = await fetch('/v1/Settings/Get', {
      method: 'POST',
    });

    return response.json();
  }

  static async setSettings(formData) {
    const response = await fetch('/v1/Settings/Change', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    return response.json();
  }
}

export default SettingsService;
