import { call, delay, put, select, takeLeading } from 'redux-saga/effects';
import { faker } from '@faker-js/faker';
import type { RootState } from '../types';
import { USERS_LOAD_STATUS } from '@/constants';
import {
  addUsersBatch,
  loadUsersRequest,
  setUsersLoadError,
  setUsersLoadProgress,
  setUsersLoadStatus,
} from '../slices/usersSlice';

const STATUSES: UserTypes.UserStatus[] = [
  'active',
  'inactive',
  'pending',
  'blacklisted',
];

const BATCH_SIZE = 50;
const TOTAL_COUNT = 500;
/** Delay between each batch (after pushing to store) to simulate real network fetching. */
const BATCH_DELAY_MS = 400;

function formatDateJoined(date: Date): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const h = date.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hour}:${min} ${ampm}`;
}

function generateUserBatch(offset: number, count: number): UserTypes.User[] {
  const batch: UserTypes.User[] = [];
  const startDate = new Date(2019, 0, 1);
  const endDate = new Date(2024, 11, 31);

  for (let i = 0; i < count; i++) {
    const index = offset + i + 1;
    const date = faker.date.between({ from: startDate, to: endDate });
    batch.push({
      id: `user-${index}`,
      organization: faker.company.name(),
      username:
        index % 3 === 0
          ? faker.person.fullName()
          : faker.internet.userName().toLowerCase().replace(/\s/g, ''),
      email: faker.internet.email(),
      phoneNumber: '0' + faker.string.numeric(10),
      dateJoined: formatDateJoined(date),
      status: faker.helpers.arrayElement(STATUSES),
      hasLoan: faker.datatype.boolean({ probability: 0.6 }),
      hasSavings: faker.datatype.boolean({ probability: 0.5 }),
    });
  }

  return batch;
}

const selectUsersLoadStatus = (state: RootState) => state.users.loadStatus;
const selectUsersListLength = (state: RootState) => state.users.list.length;

function* loadUsersWorker(): Generator {
  const loadStatus = yield select(selectUsersLoadStatus);
  const listLength = yield select(selectUsersListLength);
  if (loadStatus === USERS_LOAD_STATUS.DONE || listLength >= TOTAL_COUNT) {
    return;
  }

  try {
    yield put(setUsersLoadStatus(USERS_LOAD_STATUS.LOADING));
    yield put(setUsersLoadProgress(0));

    const totalBatches = Math.ceil(TOTAL_COUNT / BATCH_SIZE);
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const offset = batchIndex * BATCH_SIZE;
      const count = Math.min(BATCH_SIZE, TOTAL_COUNT - offset);
      const batch = yield call(generateUserBatch, offset, count);
      yield put(addUsersBatch(batch));
      const progress = Math.round(((batchIndex + 1) / totalBatches) * 100);
      yield put(setUsersLoadProgress(progress));
      yield delay(BATCH_DELAY_MS);
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
