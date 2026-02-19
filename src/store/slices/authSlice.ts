import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AUTH_STORAGE_KEY } from '@/constants';
import { loadAuthFromSessionStorage } from '@/utils/authStorage';

const initialState: AuthTypes.AuthState = loadAuthFromSessionStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthTypes.AuthUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      try {
        sessionStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify(action.payload)
        );
      } catch {
        // ignore
      }
    },
    clearAuth(state) {
      state.user = null;
      state.isAuthenticated = false;
      try {
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
      } catch {
        // ignore
      }
    },
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
