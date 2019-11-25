class Validators {
  static validatePort(value) {
    if (!/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(value)) {
      return 'Port should be a number and between the range of 0 and 65535';
    }
    return '';
  }
  static validateKeyValue(value) {
    if (
      value &&
      !value
        .split(/[\n\s]/)
        .filter(Boolean)
        .every(element => /.*:.*/.test(element))
    ) {
      return 'values have to be in key:value format, and separated with new line or space';
    }
    return '';
  }
}

export default Validators;
