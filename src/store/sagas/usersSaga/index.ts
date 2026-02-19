import { call, delay, put, select, takeLeading } from 'redux-saga/effects';
import type { RootState } from '../../types';
import {
  USERS_BATCH_DELAY_MS,
  USERS_BATCH_SIZE,
  USERS_LOAD_STATUS,
  USERS_TOTAL_COUNT,
} from '@/constants';
import { generateUserBatch } from '@/utils/userData';
import {
  addUsersBatch,
  loadUsersRequest,
  setUsersLoadError,
  setUsersLoadProgress,
  setUsersLoadStatus,
} from '../../slices/usersSlice';

const selectUsersLoadStatus = (state: RootState) => state.users.loadStatus;
const selectUsersListLength = (state: RootState) => state.users.list.length;

export function* loadUsersWorker(): Generator {
  const loadStatus = yield select(selectUsersLoadStatus);
  const listLength = yield select(selectUsersListLength);
  if (
    loadStatus === USERS_LOAD_STATUS.DONE ||
    listLength >= USERS_TOTAL_COUNT
  ) {
    return;
  }

  try {
    yield put(setUsersLoadStatus(USERS_LOAD_STATUS.LOADING));
    yield put(setUsersLoadProgress(0));

    const totalBatches = Math.ceil(USERS_TOTAL_COUNT / USERS_BATCH_SIZE);
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const offset = batchIndex * USERS_BATCH_SIZE;
      const count = Math.min(USERS_BATCH_SIZE, USERS_TOTAL_COUNT - offset);
      const batch = yield call(generateUserBatch, offset, count);
      yield put(addUsersBatch(batch));
      const progress = Math.round(((batchIndex + 1) / totalBatches) * 100);
      yield put(setUsersLoadProgress(progress));
      yield delay(USERS_BATCH_DELAY_MS);
    }

    yield put(setUsersLoadProgress(100));
    yield put(setUsersLoadStatus(USERS_LOAD_STATUS.DONE));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load users';
    yield put(setUsersLoadError(message));
  }
}

export function* watchUsersSaga(): Generator {
  yield takeLeading(loadUsersRequest.type, loadUsersWorker);
}
