import { Validator, VResult } from './validator.types';

export const validators = {
  validatePort: (value) => {
    const portNumber = Number.parseInt(value, 10);
    const MIN_PORT_NUMBER = 0;
    const MAX_PORT_NUMBER = 65535;

    if (portNumber > MIN_PORT_NUMBER && portNumber < MAX_PORT_NUMBER) {
      return undefined;
    }

    return 'Port should be a number and between 0 and 65535';
  },

  matches: (field, message) => (value, values) => {
    if (value === values[field]) {
      return undefined;
    }

    return message;
  },

  range: (from, to) => (value) => {
    if (!value) {
      return undefined;
    }

    return value >= from && value <= to ? undefined : `Value should be in the range from ${from} to ${to}`;
  },

  min: (from) => (value) => {
    if (!value && value !== 0) {
      return undefined;
    }

    return value >= from ? undefined : `Value should be greater or equal to ${from}`;
  },

  validateEmail: (value: string) => {
    const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return emailRe.test(value) ? undefined : 'Invalid email address';
  },

  validateKeyValue: (value) => {
    if (
      value
      && !value
        .split(/[\n\s]/)
        .filter(Boolean)
        .every((element) => /^[a-z0-9]+:[a-z0-9]+$/.test(element))
    ) {
      return 'Values have to be in key:value format, and separated with new line or space';
    }

    return undefined;
  },

  containBothCases: (value) => {
    const casesRegexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])');

    if (casesRegexp.test(value)) {
      return undefined;
    }

    return 'Must include upper and lower cases';
  },

  containNumbers: (value) => {
    const numbersRegexp = new RegExp('^(?=.*[0-9])');

    if (numbersRegexp.test(value)) {
      return undefined;
    }

    return 'Must include numbers';
  },

  minLength: (numberOfCharacters: number) => (value) => {
    if (value.length >= numberOfCharacters) {
      return undefined;
    }

    return `Must contain at least ${numberOfCharacters} characters`;
  },

  required: (value) => (value ? undefined : 'Required field'),

  requiredTrue: (value: boolean) => (value === true ? undefined : 'Required field'),

  compose: (...validators: Validator[]) => (value: any, values?: Record<string, any>): VResult => {
    let result: string | undefined;

    // eslint-disable-next-line no-restricted-syntax
    for (const validator of validators) {
      result = validator(value, values);
      if (result !== undefined) {
        break;
      }
    }

    return result;
  },
};

export default validators;
