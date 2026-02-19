import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  USERS_LOAD_STATUS,
  USERS_TOTAL_COUNT,
  type UsersLoadStatus,
} from '@/constants';

interface UsersState {
  list: UserTypes.User[];
  loadProgress: number;
  loadStatus: UsersLoadStatus;
  error: string | null;
  searchQuery: string;
}

const initialState: UsersState = {
  list: [],
  loadProgress: 0,
  loadStatus: USERS_LOAD_STATUS.IDLE,
  error: null,
  searchQuery: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadUsersRequest(state) {
      if (state.loadStatus === USERS_LOAD_STATUS.IDLE) {
        state.loadStatus = USERS_LOAD_STATUS.LOADING;
        state.loadProgress = 0;
        state.error = null;
      }
    },
    addUsersBatch(state, action: PayloadAction<UserTypes.User[]>) {
      const remaining = USERS_TOTAL_COUNT - state.list.length;
      if (remaining <= 0) return;
      const toAdd = action.payload.slice(0, remaining);
      state.list.push(...toAdd);
    },
    setUsersLoadProgress(state, action: PayloadAction<number>) {
      state.loadProgress = action.payload;
    },
    setUsersLoadStatus(state, action: PayloadAction<UsersLoadStatus>) {
      state.loadStatus = action.payload;
    },
    setUsersLoadError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loadStatus = USERS_LOAD_STATUS.ERROR;
    },
    updateUserStatus(
      state,
      action: PayloadAction<{ id: string; status: UserTypes.UserStatus }>
    ) {
      const user = state.list.find((u) => u.id === action.payload.id);
      if (user) user.status = action.payload.status;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    clearUsers(state) {
      state.list = [];
      state.loadProgress = 0;
      state.loadStatus = USERS_LOAD_STATUS.IDLE;
      state.error = null;
      state.searchQuery = '';
    },
  },
});

export const {
  loadUsersRequest,
  addUsersBatch,
  clearUsers,
  setUsersLoadProgress,
  setUsersLoadStatus,
  setUsersLoadError,
  updateUserStatus,
  setSearchQuery,
} = usersSlice.actions;

export default usersSlice.reducer;

export const selectUsersList = (state: { users: UsersState }) => state.users.list;
export const selectUserById =
  (id: string) =>
  (state: { users: UsersState }): UserTypes.User | undefined =>
    state.users.list.find((u) => u.id === id);
export const selectUsersLoadProgress = (state: { users: UsersState }) =>
  state.users.loadProgress;
export const selectUsersLoadStatus = (state: { users: UsersState }) =>
  state.users.loadStatus;
export const selectUsersLoadError = (state: { users: UsersState }) =>
  state.users.error;
export const selectSearchQuery = (state: { users: UsersState }) =>
  state.users.searchQuery;
