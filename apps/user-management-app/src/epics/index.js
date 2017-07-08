import { combineEpics } from 'redux-observable';
import pingEpic from './ping';

export default combineEpics(
  pingEpic,
);