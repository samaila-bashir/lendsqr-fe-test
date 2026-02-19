import { AUTH_STORAGE_KEY } from '@/constants';

export function loadAuthFromSessionStorage(): AuthTypes.AuthState {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { user: null, isAuthenticated: false };
    const parsed = JSON.parse(raw) as AuthTypes.AuthUser;
    if (parsed?.name && parsed?.email && parsed?.avatarUrl) {
      return { user: parsed, isAuthenticated: true };
    }
  } catch {
    // ignore
  }
  return { user: null, isAuthenticated: false };
}
