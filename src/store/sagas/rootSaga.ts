import { all, fork } from 'redux-saga/effects';
import { watchUsersSaga } from './usersSaga';

export function* rootSaga(): Generator {
  yield all([fork(watchUsersSaga)]);
}
