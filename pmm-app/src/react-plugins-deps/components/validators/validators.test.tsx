// Just a stub test
import Validators from './validators';

describe('validatePort test', () => {
  it('return empty string when value is 0', () => {
    expect(Validators.validatePort(0)).toEqual('');
  });

  it('return empty string when value in the middle of range', () => {
    expect(Validators.validatePort(30000)).toEqual('');
  });

  it('return correct error message when value is not in range', () => {
    const errorMessage = 'Port should be a number and between the range of 0 and 65535';
    expect(Validators.validatePort(65536)).toEqual(errorMessage);
  });

  it('return correct error message when value is invalid', () => {
    const errorMessage = 'Port should be a number and between the range of 0 and 65535';
    expect(Validators.validatePort('portnumber')).toEqual(errorMessage);
  });
});

describe('validateKeyValue test', () => {
  it('return empty string when key:value is separated by whitespace', () => {
    const testString = 'key:value key2:value2';
    expect(Validators.validateKeyValue(testString)).toEqual('');
  });

  it('return empty string when key:value is separated by new line symbol', () => {
    const testString = 'key:value\nkey2:value2';
    expect(Validators.validateKeyValue(testString)).toEqual('');
  });

  it('return correct error message when value is invalid', () => {
    const errorMessage = 'Values have to be in key:value format, and separated with new line or space';
    const testString = 'key:value-key2:value2';
    expect(Validators.validateKeyValue(testString)).toEqual(errorMessage);
  });
});
