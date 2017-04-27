import { combineReducers } from 'redux';
import groups from './groups';
import users from './users';
import runtime from './runtime';

export default combineReducers({
  runtime,
  groups,
  users,
});
