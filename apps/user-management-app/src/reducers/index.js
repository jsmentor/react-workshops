import { combineReducers } from 'redux';
import groups from './groups';
import users from './users';
import runtime from './runtime';
import ping from './ping';

export default combineReducers({
  runtime,
  groups,
  users,
  ping,
});
