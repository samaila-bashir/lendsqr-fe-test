export const AUTH_STORAGE_KEY = 'lendsqr_auth';

export const USERS_LOAD_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  DONE: 'done',
  ERROR: 'error',
} as const;

export type UsersLoadStatus =
  (typeof USERS_LOAD_STATUS)[keyof typeof USERS_LOAD_STATUS];

/** User status values for Faker/display. */
export const USER_STATUS_VALUES: UserTypes.UserStatus[] = [
  'active',
  'inactive',
  'pending',
  'blacklisted',
];

/** Users batch loading config. */
export const USERS_BATCH_SIZE = 50;
export const USERS_TOTAL_COUNT = 500;
/** Delay between each batch (ms) to simulate network. */
export const USERS_BATCH_DELAY_MS = 400;
