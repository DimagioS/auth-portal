import { authenticateUser, registerUser, getUserInfo } from '@/api/authService';
import { apiClient, authApiClient } from '@/api/axiosService';

// Мокаем axios
jest.mock('@/api/axiosService', () => ({
  apiClient: { post: jest.fn() },
  authApiClient: { get: jest.fn() }
}));

describe('AuthService', () => {
  describe('authenticateUser', () => {
    it('sends a post request to the correct endpoint', async () => {
      const username = 'user';
      const password = 'pass';

      apiClient.post.mockResolvedValue({ data: { token: 'fake-token' } });

      const response = await authenticateUser(username, password);
      
      expect(apiClient.post).toHaveBeenCalledWith('/login', { username, password });
      expect(response).toHaveProperty('data');
      expect(response.data).toHaveProperty('token', 'fake-token');
    });
  });

  describe('registerUser', () => {
    it('sends a post request to the correct endpoint', async () => {
      const username = 'user';
      const password = 'pass';

      apiClient.post.mockResolvedValue({ data: { message: 'Пользователь успешно зарегистрирован' } });

      const response = await registerUser(username, password);
      
      expect(apiClient.post).toHaveBeenCalledWith('/register', { username, password });
      expect(response).toHaveProperty('data');
      expect(response.data).toHaveProperty('message', 'Пользователь успешно зарегистрирован');
    });
  });

  describe('getUserInfo', () => {
    it('sends a get request to the correct endpoint', async () => {
      const info = {
        username: "test2",
        password: "234",
        about: "Я тестовый пользователь."
      }
      authApiClient.get.mockResolvedValue({ data: info });
  
      const response = await getUserInfo();
      
      expect(authApiClient.get).toHaveBeenCalledWith('/about');
      expect(response).toHaveProperty('data', info);
    });
  });
});
