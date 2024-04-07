export const BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:8081';
export const TOKEN_KEY = 'auth_token';
export const HTTP_OK = 200;

export const ERROR_MESSAGES = {
  SERVER_ERROR: 'Неизвестная ошибка сервера.',
  NETWORK_ERROR: 'Проблема сетевого соединения.',
  LOGIN_ERROR: 'Не удалось войти в систему. Проверьте свои учетные данные и попробуйте снова.',
  REGISTRATION_ERROR: 'Не удалось зарегистрироваться. Пожалуйста, попробуйте позже.',
  TOKEN_ERROR: 'Не удалось получить токен.',

  USERNAME_REQUIRED: 'Имя пользователя обязательно',
  PASSWORD_REQUIRED: 'Пароль обязателен',
  PASSWORDS_DO_NOT_MATCH: 'Пароли не совпадают',
  USERNAME_AND_PASSWORD_REQUIRED: 'Имя пользователя и пароль обязательны'
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Вы успешно вошли в систему.',
  REGISTRATION_SUCCESS: 'Регистрация выполнена успешно.',
  LOGOUT_SUCCESS: 'Вы успешно вышли из системы.'
};
