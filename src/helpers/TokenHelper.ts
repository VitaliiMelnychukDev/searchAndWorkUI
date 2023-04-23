import { localStorageKey } from '../constants/token';

export class TokenHelper {
  static getAccessToken(): string | null {
    return localStorage.getItem(localStorageKey.accessToken);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(localStorageKey.refreshToken);
  }

  static saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(localStorageKey.accessToken, accessToken);
    localStorage.setItem(localStorageKey.refreshToken, refreshToken);
  }

  static clearTokens(): void {
    localStorage.removeItem(localStorageKey.accessToken);
    localStorage.removeItem(localStorageKey.refreshToken);
  }

  static getAuthorizationHeader(): string {
    const token = TokenHelper.getAccessToken();

    return token ? `Bearer ${token}` : '';
  }
}