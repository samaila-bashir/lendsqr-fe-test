import { describe, it, expect, beforeEach } from 'vitest';
import { AUTH_STORAGE_KEY } from '@/constants';
import { loadAuthFromSessionStorage } from './index';

describe('loadAuthFromSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('returns unauthenticated state when key is missing', () => {
    expect(loadAuthFromSessionStorage()).toEqual({
      user: null,
      isAuthenticated: false,
    });
  });

  it('returns unauthenticated state when key is empty string', () => {
    sessionStorage.setItem(AUTH_STORAGE_KEY, '');
    expect(loadAuthFromSessionStorage()).toEqual({
      user: null,
      isAuthenticated: false,
    });
  });

  it('returns authenticated state with user when valid user is stored', () => {
    const user = {
      name: 'Test User',
      email: 'test@example.com',
      avatarUrl: 'https://example.com/avatar.png',
    };
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

    expect(loadAuthFromSessionStorage()).toEqual({
      user,
      isAuthenticated: true,
    });
  });

  it('returns unauthenticated state when stored object is missing name', () => {
    sessionStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        email: 'a@b.com',
        avatarUrl: 'https://x.com/y.png',
      })
    );

    expect(loadAuthFromSessionStorage()).toEqual({
      user: null,
      isAuthenticated: false,
    });
  });

  it('returns unauthenticated state when stored object is missing email', () => {
    sessionStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        name: 'User',
        avatarUrl: 'https://x.com/y.png',
      })
    );

    expect(loadAuthFromSessionStorage()).toEqual({
      user: null,
      isAuthenticated: false,
    });
  });

  it('returns unauthenticated state when stored object is missing avatarUrl', () => {
    sessionStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ name: 'User', email: 'a@b.com' })
    );

    expect(loadAuthFromSessionStorage()).toEqual({
      user: null,
      isAuthenticated: false,
    });
  });

  it('returns unauthenticated state when stored value is invalid JSON', () => {
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'not json {');

    expect(loadAuthFromSessionStorage()).toEqual({
      user: null,
      isAuthenticated: false,
    });
  });

  it('returns unauthenticated state when stored value is null (stringified)', () => {
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'null');

    expect(loadAuthFromSessionStorage()).toEqual({
      user: null,
      isAuthenticated: false,
    });
  });
});
