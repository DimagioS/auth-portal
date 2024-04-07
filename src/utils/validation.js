import { ERROR_MESSAGES } from "@/constants";

export function validateLoginInput(username, password) {
  let error = null;

  if (!username.trim() && !password) {
    error = ERROR_MESSAGES.USERNAME_AND_PASSWORD_REQUIRED;
  } else if (!username.trim()) {
    error = ERROR_MESSAGES.USERNAME_REQUIRED;
  } else if (!password) {
    error = ERROR_MESSAGES.PASSWORD_REQUIRED;
  }

  return {
    error,
    isValid: error === null
  };
}

export function validateRegistrationInput(username, password, confirmPassword) {
  let error = null;

  if (!username.trim()) {
    error = ERROR_MESSAGES.USERNAME_REQUIRED;
  } else if (!password) {
    error = ERROR_MESSAGES.PASSWORD_REQUIRED;
  } else if (password !== confirmPassword) {
    error = ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH;
  }
  return {
    error,
    isValid: error === null
  };
}
