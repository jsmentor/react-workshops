import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as UsersAPI from '../utils/apis/users';
import { getUsersListSuccess, getUsersListFailure} from '../actions/users';

function* fetchUsers() {
  try {
    // debugger;
    let APICall = call(UsersAPI.getUsers);
    console.log('APICall: ', APICall);
    let list = yield APICall;
    yield put(getUsersListSuccess(list));
  } catch (error) {
    yield put(getUsersListFailure(error));
  }
}

export default function* usersSaga () {
  yield takeLatest('GET_USERS_LIST_REQUEST', fetchUsers);
}