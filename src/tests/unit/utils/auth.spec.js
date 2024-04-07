import { isAuthenticated } from '@/utils/auth';
import { getToken } from '@/api/authService';

jest.mock('@/api/authService', () => ({
  getToken: jest.fn()
}));

describe('isAuthenticated', () => {
  it('returns true when token is present', () => {
    getToken.mockImplementation(() => 'some-token');
    
    expect(isAuthenticated()).toBe(true);
  });

  it('returns false when token is not present', () => {
    getToken.mockImplementation(() => undefined);
    
    expect(isAuthenticated()).toBe(false);
  });
});
