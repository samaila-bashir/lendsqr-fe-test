export const AUTH_STORAGE_KEY = 'lendsqr_auth';

export const USERS_LOAD_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  DONE: 'done',
  ERROR: 'error',
} as const;

export type UsersLoadStatus =
  (typeof USERS_LOAD_STATUS)[keyof typeof USERS_LOAD_STATUS];
