import { getToken } from "@/api/authService";
import { TOKEN_KEY } from "@/constants";

export function isAuthenticated() {
  return !!getToken(TOKEN_KEY);
}
