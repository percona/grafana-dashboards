const {I} = inject();
module.exports = {
  // methods for preparing state of application before test
  async apiEnableSTT() {
    const body = {
      enable_stt: true,
      enable_telemetry: true
    };
    const headers = {Authorization: `Basic ${await I.getAuth()}`};
    await I.sendPostRequest("v1/Settings/Change", body, headers);
  },

  async apiDisableSTT() {
    const body = {
      disable_stt: true,
      enable_telemetry: true
    };
    const headers = {Authorization: `Basic ${await I.getAuth()}`};
    await I.sendPostRequest("v1/Settings/Change", body, headers);
  },
};
