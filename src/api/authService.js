import { apiClient, authApiClient } from './axiosService';
import { TOKEN_KEY } from '@/constants';

export function authenticateUser(username, password) {
  return apiClient.post('/login', { username, password });
}

export function registerUser(username, password) {
  return apiClient.post('/register', { username, password });
}

export const getUserInfo = () => {
  return authApiClient.get('/about');
};

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
