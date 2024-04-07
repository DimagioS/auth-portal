import { ERROR_MESSAGES } from '@/constants';
import { validateLoginInput, validateRegistrationInput } from '@/utils/validation';

describe('validation.js', () => {
  describe('validateLoginInput', () => {
    it('returns USERNAME_AND_PASSWORD_REQUIRED error if both username and password are empty', () => {
      const result = validateLoginInput('', '');
      expect(result.error).toBe(ERROR_MESSAGES.USERNAME_AND_PASSWORD_REQUIRED);
      expect(result.isValid).toBe(false);
    });

    it('returns USERNAME_REQUIRED error if username is empty', () => {
      const result = validateLoginInput('', 'password');
      expect(result.error).toBe(ERROR_MESSAGES.USERNAME_REQUIRED);
      expect(result.isValid).toBe(false);
    });

    it('returns PASSWORD_REQUIRED error if password is empty', () => {
      const result = validateLoginInput('username', '');
      expect(result.error).toBe(ERROR_MESSAGES.PASSWORD_REQUIRED);
      expect(result.isValid).toBe(false);
    });

    it('returns no error if both username and password are provided', () => {
      const result = validateLoginInput('username', 'password');
      expect(result.error).toBe(null);
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateRegistrationInput', () => {
    it('returns USERNAME_REQUIRED error when username is empty', () => {
      const result = validateRegistrationInput('', 'password', 'password');
      expect(result.error).toBe(ERROR_MESSAGES.USERNAME_REQUIRED);
      expect(result.isValid).toBe(false);
    });
  
    it('returns PASSWORD_REQUIRED error when password is empty', () => {
      const result = validateRegistrationInput('username', '', 'password');
      expect(result.error).toBe(ERROR_MESSAGES.PASSWORD_REQUIRED);
      expect(result.isValid).toBe(false);
    });
  
    it('returns PASSWORDS_DO_NOT_MATCH error when passwords do not match', () => {
      const result = validateRegistrationInput('username', 'password', 'differentPassword');
      expect(result.error).toBe(ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH);
      expect(result.isValid).toBe(false);
    });
  
    it('returns no error when all inputs are valid', () => {
      const result = validateRegistrationInput('username', 'password', 'password');
      expect(result.error).toBe(null);
      expect(result.isValid).toBe(true);
    });
  });
});
