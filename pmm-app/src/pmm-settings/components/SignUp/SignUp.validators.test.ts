import { required, validEmail } from './SignUp.validators';
import { Messages } from './SignUp.messages';

describe('SignUp.validators', () => {
  test('email validator should return undefined if the passed email is valid', () => {
    expect(validEmail('test@example.org')).toBeUndefined();
  });

  test('email validator should return an error string if the passed email is invalid', () => {
    expect(validEmail('test')).toEqual(Messages.errors.invalidEmail);
  });

  test('required validator should return an error string if the passed value in falsy', () => {
    expect(required(undefined)).toEqual(Messages.errors.requiredField);
    expect(required(false)).toEqual(Messages.errors.requiredField);
    expect(required('')).toEqual(Messages.errors.requiredField);
  });

  test('required validator should return undefined if the passed value in truthy', () => {
    expect(required('test')).toBeUndefined();
  });
});
