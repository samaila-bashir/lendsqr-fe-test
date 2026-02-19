import type authReducer from './slices/authSlice';
import type usersReducer from './slices/usersSlice';

export type RootState = {
  auth: ReturnType<typeof authReducer>;
  users: ReturnType<typeof usersReducer>;
  _persist?: { version: number; rehydrated: boolean };
};
