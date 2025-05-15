import { stripPrefix } from './utils';

describe('stripPrefix', () => {
  it('should remove prefix if text starts with it', () => {
    const result = stripPrefix('prefix/main-text', 'prefix/');

    expect(result).toBe('main-text');
  });

  it('should return original text if it does not start with prefix', () => {
    const result = stripPrefix('prefix/main-text', 'other-prefix/');

    expect(result).toBe('prefix/main-text');
  });

  it('should return original text if prefix is empty', () => {
    const result = stripPrefix('prefix/main-text', '');

    expect(result).toBe('prefix/main-text');
  });
  
  it('should return empty string if both text and prefix are empty', () => {
    const result = stripPrefix('', '');

    expect(result).toBe('');
  });
});
