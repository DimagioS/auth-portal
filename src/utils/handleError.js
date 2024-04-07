import { ERROR_MESSAGES } from "@/constants";

export function handleError(error, showToast) {
  let message = ERROR_MESSAGES.SERVER_ERROR;

  if (error.response) {
    message = error.response.data.error || error.response.data.message || message;
  } else if (error.request) {
    message = ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  showToast('error', 'Ошибка', message);
}
