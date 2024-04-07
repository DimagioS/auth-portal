import { handleError } from '@/utils/handleError';
import { ERROR_MESSAGES } from '@/constants';

describe('handleError', () => {
  const mockShowToast = jest.fn();

  afterEach(() => {
    mockShowToast.mockClear();
  });

  it('should show SERVER_ERROR when there is no response and no request', () => {
    const error = {};
    
    handleError(error, mockShowToast);
    expect(mockShowToast).toHaveBeenCalledWith('error', 'Ошибка', ERROR_MESSAGES.SERVER_ERROR);
  });

  it('should show NETWORK_ERROR when there is a request but no response', () => {
    const error = { request: {} };
    
    handleError(error, mockShowToast);
    expect(mockShowToast).toHaveBeenCalledWith('error', 'Ошибка', ERROR_MESSAGES.NETWORK_ERROR);
  });

  it('should show server provided error message when there is a response with data.error', () => {
    const error = { response: { data: { error: 'Custom error message' } } };
    
    handleError(error, mockShowToast);
    expect(mockShowToast).toHaveBeenCalledWith('error', 'Ошибка', 'Custom error message');
  });

  it('should show server provided message when there is a response with data.message and no data.error', () => {
    const error = { response: { data: { message: 'Custom message' } } };
    
    handleError(error, mockShowToast);
    expect(mockShowToast).toHaveBeenCalledWith('error', 'Ошибка', 'Custom message');
  });

  it('should show SERVER_ERROR when there is a response with no error or message', () => {
    const error = { response: { data: {} } };
    
    handleError(error, mockShowToast);
    expect(mockShowToast).toHaveBeenCalledWith('error', 'Ошибка', ERROR_MESSAGES.SERVER_ERROR);
  });
});
