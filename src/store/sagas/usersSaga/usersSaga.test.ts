import { describe, it, expect, vi, beforeEach } from 'vitest';
import { call, put, takeLeading } from 'redux-saga/effects';
import {
  USERS_BATCH_SIZE,
  USERS_LOAD_STATUS,
  USERS_TOTAL_COUNT,
} from '@/constants';
import { generateUserBatch } from '@/utils/userData';
import {
  loadUsersRequest,
  setUsersLoadError,
} from '../../slices/usersSlice';
import { loadUsersWorker, watchUsersSaga } from './index';

describe('watchUsersSaga', () => {
  it('yields takeLeading with loadUsersRequest type and worker', () => {
    const gen = watchUsersSaga();
    const effect = gen.next().value;
    expect(effect).toEqual(takeLeading(loadUsersRequest.type, loadUsersWorker));
    expect(gen.next().done).toBe(true);
  });
});

describe('loadUsersWorker', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns early when loadStatus is DONE', () => {
    const gen = loadUsersWorker();
    gen.next();
    gen.next(USERS_LOAD_STATUS.DONE);
    const afterSecondSelect = gen.next(0);
    expect(afterSecondSelect.done).toBe(true);
  });

  it('returns early when list length is already at USERS_TOTAL_COUNT', () => {
    const gen = loadUsersWorker();
    gen.next();
    gen.next(USERS_LOAD_STATUS.IDLE);
    const afterSecondSelect = gen.next(USERS_TOTAL_COUNT);
    expect(afterSecondSelect.done).toBe(true);
  });

  it('dispatches LOADING and progress 0 then calls generateUserBatch for first batch', () => {
    const gen = loadUsersWorker();
    gen.next();
    gen.next(USERS_LOAD_STATUS.IDLE);
    gen.next(0);

    const effects: unknown[] = [];
    for (let i = 0; i < 5; i++) effects.push(gen.next().value);
    const callEffect = effects.find(
      (e) =>
        (e as { type?: string })?.type === 'CALL' &&
        (e as { payload?: { fn?: unknown } })?.payload?.fn === generateUserBatch
    );
    expect(callEffect).toBeDefined();
    expect(callEffect).toEqual(call(generateUserBatch, 0, USERS_BATCH_SIZE));
  });

  it('dispatches setUsersLoadError when generateUserBatch throws', () => {
    const gen = loadUsersWorker();
    gen.next();
    gen.next(USERS_LOAD_STATUS.IDLE);
    gen.next(0);
    gen.next();
    gen.next();
    gen.next();
    const putError = gen.throw(new Error('Network error')).value;
    expect(putError).toEqual(put(setUsersLoadError('Network error')));
  });
});
