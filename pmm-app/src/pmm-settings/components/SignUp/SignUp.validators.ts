import { Messages } from './SignUp.messages';

export const required = (value: string | boolean | undefined) => (
  value ? undefined : Messages.errors.requiredField
);

export const validEmail = (value: string) => {
  const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRe.test(value) ? undefined : Messages.errors.invalidEmail;
};

export const composeValidators = (
  ...validators: Array<(value: any) => any>
) => (value: any) => validators.reduce(
  (error, validator) => error || validator(value), undefined
);
