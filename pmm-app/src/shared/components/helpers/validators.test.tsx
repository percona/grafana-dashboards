import validators from './validators';

describe('validatePort test', () => {
  it('return error string when value is 0', () => {
    expect(validators.validatePort(0)).toEqual(
      'Port should be a number and between the range of 0 and 65535',
    );
  });

  it('return empty string when value in the middle of range', () => {
    expect(validators.validatePort(30000)).toEqual(undefined);
  });

  it('return correct error message when value is not in range', () => {
    const errorMessage = 'Port should be a number and between the range of 0 and 65535';

    expect(validators.validatePort(65536)).toEqual(errorMessage);
  });

  it('return correct error message when value is invalid', () => {
    const errorMessage = 'Port should be a number and between the range of 0 and 65535';

    expect(validators.validatePort('portnumber')).toEqual(errorMessage);
  });
});

describe('validateKeyValue test', () => {
  it('return empty string when key:value is separated by whitespace', () => {
    const testString = 'key:value key2:value2';

    expect(validators.validateKeyValue(testString)).toEqual(undefined);
  });

  it('return empty string when key:value is separated by new line symbol', () => {
    const testString = 'key:value\nkey2:value2';

    expect(validators.validateKeyValue(testString)).toEqual(undefined);
  });

  it('return correct error message when value is invalid', () => {
    const errorMessage = 'Values have to be in key:value format, and separated with new line or space';
    const testString = 'key:value-key2:value2';

    expect(validators.validateKeyValue(testString)).toEqual(errorMessage);
  });
});

describe('Validate range test', () => {
  it('return undefined when value on lower border', () => {
    const rangeValidator = validators.range(0, 100);

    expect(rangeValidator(0)).toEqual(undefined);
  });

  it('return undefined when value on upper border', () => {
    const rangeValidator = validators.range(0, 100);

    expect(rangeValidator(100)).toEqual(undefined);
  });

  it('return undefined when value in the middle of range', () => {
    const rangeValidator = validators.range(0, 100);

    expect(rangeValidator(50)).toEqual(undefined);
  });

  it('return error message when value not in range', () => {
    const from = 0;
    const to = 100;
    const errorMessage = `Value should be in range from ${from} to ${to}`;
    const rangeValidator = validators.range(from, to);

    expect(rangeValidator(110)).toEqual(errorMessage);
  });
});

describe('validators compose', () => {
  it('return correct validation error when value is undefined', () => {
    const rangeValidator = validators.range(0, 100);
    const validate = validators.compose(rangeValidator, validators.required);

    expect(validate(undefined)).toEqual('Required field');
  });

  it('return correct validation error when value is in the middle of range', () => {
    const from = 0;
    const to = 100;
    const errorMessage = `Value should be in range from ${from} to ${to}`;
    const rangeValidator = validators.range(from, to);
    const validate = validators.compose(rangeValidator, validators.required);

    expect(validate(120)).toEqual(errorMessage);
  });
});
