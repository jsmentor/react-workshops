import { createReducer } from '../utils';
import {PING, PONG} from '../constants';

const initialState = {
  isPinging: false
};

export default createReducer(initialState, {
  [PING]: state => ({
    ...state,
    isPinging: true,
  }),
  [PONG]: state => ({
    ...state,
    isPinging: false,
  })
});