import { verifyLogin } from '~/models/user.server';

const AUTH_TOKEN_KEY = 'VN_auth_token';

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function removeAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  return token !== null;
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    // This would need to be adapted to work with your API
    const user = await verifyLogin(email, password);
    if (user) {
      // In a real app, you'd get a token from your API
      const token = `fake-token-${user.id}`;
      setAuthToken(token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}

export function logout(): void {
  removeAuthToken();
  window.location.href = '/login';
}

export function requireAuth(): void {
  if (!isAuthenticated()) {
    window.location.href = '/login';
  }
}