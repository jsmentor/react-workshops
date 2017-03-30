import {createReducer} from '../utils';
import {
  GET_USER_GROUPS_REQUEST, GET_USER_GROUPS_SUCCESS, GET_USER_GROUPS_FAILURE,
  GET_GROUP_USERS_REQUEST, GET_GROUP_USERS_SUCCESS, GET_GROUP_USERS_FAILURE,
  CREATE_USER_GROUP_REQUEST, CREATE_USER_GROUP_SUCCESS, CREATE_USER_GROUP_FAILURE,
  REMOVE_USER_GROUPS_REQUEST, REMOVE_USER_GROUPS_SUCCESS, REMOVE_USER_GROUPS_FAILURE,
} from '../constants';

const initialState = {
  list:[],
  loading: false,
  loaded: false,
  loadError: false,
  isCreating: false,
  created: false,
  createError: false,
  isRemoving: false,
  removed: false,
  removeError: false,
  selectedUserGroups: [],
  groupUsers: {}
};

export default createReducer(initialState, {
  [GET_USER_GROUPS_REQUEST]: (state, payload) => {
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  },
  [GET_USER_GROUPS_SUCCESS]: (state, payload) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      list: payload.list
    };
  },
  [GET_GROUP_USERS_REQUEST]: (state, {name}) => {
    return {
      ...state,
      groupUsers: {
        [name]: {
          loading: true,
          loaded: false
        }
      }
    };
  },
  [GET_GROUP_USERS_SUCCESS]: (state, {name, list}) => {
    return {
      ...state,
      groupUsers: {
        [name]: {
          loading: false,
          loaded: true,
          list
        }
      }
    };
  },
  [GET_GROUP_USERS_FAILURE]: (state, {name, error}) => {
    return {
      ...state,
      groupUsers: {
        [name]:  {
          loading: false,
          loaded: false,
          list: [],
          error
        }
      }
    };
  },
  [GET_USER_GROUPS_FAILURE]: (state, payload) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      list: [],
      loadError: payload.error
    };
  },
  [CREATE_USER_GROUP_REQUEST]: (state, payload) => {
    return {
      ...state,
      isCreating: true,
      created: false,
      newGroup: payload.newGroup
    };
  },
  [CREATE_USER_GROUP_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isCreating: false,
      created: true,
      newGroup: payload.newGroup
    };
  },
  [CREATE_USER_GROUP_FAILURE]: (state, payload) => {
    return {
      ...state,
      isRemoving: false,
      removed: false,
      createError: payload.error
    };
  },
  [REMOVE_USER_GROUPS_REQUEST]: (state, payload) => {
    return {
      ...state,
      isRemoving: true,
      removed: false,
      selectedUserGroups: payload.selectedUserGroups
    };
  },
  [REMOVE_USER_GROUPS_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isRemoving: false,
      removed: true
    };
  },
  [REMOVE_USER_GROUPS_FAILURE]: (state, payload) => {
    return {
      ...state,
      isRemoving: false,
      removed: false,
      removeError: payload.error
    };
  }
});