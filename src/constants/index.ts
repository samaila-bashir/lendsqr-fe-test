export const AUTH_STORAGE_KEY = 'lendsqr_auth';

export const USERS_LOAD_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  DONE: 'done',
  ERROR: 'error',
} as const;

export type UsersLoadStatus =
  (typeof USERS_LOAD_STATUS)[keyof typeof USERS_LOAD_STATUS];

export const USER_STATUS_VALUES: UserTypes.UserStatus[] = [
  'active',
  'inactive',
  'pending',
  'blacklisted',
];

export const USERS_BATCH_SIZE = 50;
export const USERS_TOTAL_COUNT = 500;
export const USERS_BATCH_DELAY_MS = 400;
