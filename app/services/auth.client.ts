import { verifyLogin, createUser } from '~/models/user.server';

const AUTH_TOKEN_KEY = 'VN_auth_token';
const USER_ID_KEY = 'VN_user_id';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(USER_ID_KEY);
}

export function setAuthData(token: string, userId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_ID_KEY, userId);
}

export function removeAuthData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  const userId = getUserId();
  return token !== null && userId !== null;
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    console.log('Attempting login for:', email);
    const user = await verifyLogin(email, password);
    if (user && user.id) {
      console.log('Login successful for user:', user.id);
      // Create a simple token (in production, use proper JWT)
      const token = btoa(`${user.id}:${Date.now()}`);
      setAuthData(token, user.id);
      return true;
    }
    console.log('Login failed: invalid credentials');
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}

export async function register(email: string, password: string): Promise<boolean> {
  try {
    console.log('Attempting registration for:', email);
    const user = await createUser(email, password);
    if (user && user.id) {
      console.log('Registration successful for user:', user.id);
      // Auto-login after successful registration
      return await login(email, password);
    }
    console.log('Registration failed');
    return false;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
}

export function logout(): void {
  removeAuthData();
  window.location.href = '/login';
}

export function requireAuth(): string {
  const userId = getUserId();
  if (!isAuthenticated() || !userId) {
    window.location.href = '/login';
    throw new Error('Authentication required');
  }
  return userId;
}