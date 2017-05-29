import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as UsersAPI from '../utils/apis/users';
import {getUsersListRequest, getUsersListSuccess, getUsersListFailure} from '../actions/users';

// worker Saga: will be fired on USERS_FETCH_REQUESTED actions
function * fetchUsers(action) {
  try {
    const list = yield call(UsersAPI.getUsers);
    yield put(getUsersListSuccess(list));
  } catch (error) {
    yield put(getUsersListFailure(error));
  }
}

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */
// function* usersSaga() {
//   yield takeEvery('USERS_FETCH_REQUESTED', fetchUsers);
// }

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
function* usersSaga() {
  yield takeLatest('GET_USERS_LIST_REQUEST', fetchUsers);
}

export default usersSaga;