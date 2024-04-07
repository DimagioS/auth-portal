import axios from 'axios';
import { BASE_URL, TOKEN_KEY } from '@/constants';
import { getToken } from './authService';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const authApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

authApiClient.interceptors.request.use(config => {
  const token = getToken(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export { apiClient, authApiClient };
