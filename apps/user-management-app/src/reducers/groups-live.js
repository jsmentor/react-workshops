import { createReducer } from '../utils';

const initialState = {
  loading: false,
  data: null,
  error: null
};

function apiReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_GROUPS_REQUEST':
      return {
        ...initialState,
        loading: true
      };
    case 'LOAD_GROUPS_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case 'LOAD_GROUPS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state
  }
}

createReducer(initialState, {
  'LOAD_GROUPS_REQUEST': (state) =>{
    return {
      ...initialState,
      loading: true
    };
  },
  'LOAD_GROUPS_SUCCESS': (state, data) => {
    return {
      ...state,
      loading: false,
      data
    };
  },
  'LOAD_GROUPS_FAILURE': (state, error) => {
    return {
      ...state,
      loading: false,
      error
    };
  }
});