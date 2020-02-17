class Validators {
  static validatePort(value) {
    const portNumber = Number.parseInt(value, 10);
    if (portNumber > 0 && portNumber < 65535) {
      return '';
    }
    return 'Port should be a number and between the range of 0 and 65535';
  }

  static validateRange(value, from, to) {
    if (!value) {
      return '';
    }

    return value > from && value < to ? '' : `Value should be in range from ${from} to ${to}`;
  }

  static validateKeyValue(value) {
    if (
      value &&
      !value
        .split(/[\n\s]/)
        .filter(Boolean)
        .every(element => /^[a-z0-9]+:[a-z0-9]+$/.test(element))
    ) {
      return 'Values have to be in key:value format, and separated with new line or space';
    }
    return '';
  }
}

export default Validators;
