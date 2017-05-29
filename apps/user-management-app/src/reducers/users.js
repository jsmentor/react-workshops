import {createReducer} from '../utils';
import {
  GET_USERS_LIST_REQUEST, GET_USERS_LIST_SUCCESS, GET_USERS_LIST_FAILURE,
  CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
  REMOVE_USERS_REQUEST, REMOVE_USERS_SUCCESS, REMOVE_USERS_FAILURE,
  ASSIGN_USERS_REQUEST, ASSIGN_USERS_SUCCESS, ASSIGN_USERS_FAILURE,
  UNASSIGN_USERS_REQUEST, UNASSIGN_USERS_SUCCESS, UNASSIGN_USERS_FAILURE,
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
  removeError: null,
  assigning: false,
  assigned: false,
  assignError: null,
  unassigning: false,
  unassigned: false,
  unassignError: null,
  groupName: '',
  selectedUsers: []
};

export default createReducer(initialState, {
  [GET_USERS_LIST_REQUEST]: (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  },
  [GET_USERS_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      list: payload.list
    };
  },
  [GET_USERS_LIST_FAILURE]: (state, payload) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      list: [],
      loadError: payload.error
    };
  },
  [CREATE_USER_REQUEST]: (state, payload) => {
    return {
      ...state,
      isCreating: true,
      created: false,
      newGroup: payload.newGroup
    };
  },
  [CREATE_USER_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isCreating: false,
      created: true,
      newGroup: payload.newGroup
    };
  },
  [CREATE_USER_FAILURE]: (state, payload) => {
    return {
      ...state,
      isRemoving: false,
      removed: false,
      createError: payload.error
    };
  },
  [REMOVE_USERS_REQUEST]: (state, payload) => {
    return {
      ...state,
      isRemoving: true,
      removed: false,
      selectedUsers: payload.selectedUsers
    };
  },
  [REMOVE_USERS_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isRemoving: false,
      removed: true
    };
  },
  [REMOVE_USERS_FAILURE]: (state, payload) => {
    return {
      ...state,
      isRemoving: false,
      removed: false,
      removeError: payload.error
    };
  },
  [ASSIGN_USERS_REQUEST]: (state, {groupName, selectedUsers}) => {
    return {
      ...state,
      assigning: true,
      assigned: false,
      assignError: null,
      groupName,
      selectedUsers
    };
  },
  [ASSIGN_USERS_SUCCESS]: (state, {groupName, selectedUsers}) => {
    return {
      ...state,
      assigning: false,
      assigned: true,
      assignError: null,
      groupName,
      selectedUsers
    };
  },
  [ASSIGN_USERS_FAILURE]: (state, {groupName, error}) => {
    return {
      ...state,
      assigning: false,
      assigned: true,
      assignError: error,
      groupName
    };
  },
  [UNASSIGN_USERS_REQUEST]: (state, {groupName, selectedUsers}) => {
    return {
      ...state,
      unassigning: true,
      unassigned: false,
      unassignError: null,
      groupName,
      selectedUsers
    };
  },
  [UNASSIGN_USERS_SUCCESS]: (state, {groupName, selectedUsers}) => {
    return {
      ...state,
      unassigning: false,
      unassigned: true,
      unassignError: null,
      groupName,
      selectedUsers
    };
  },
  [UNASSIGN_USERS_FAILURE]: (state, {groupName, error}) => {
    return {
      ...state,
      unassigning: false,
      unassigned: true,
      unassignError: error,
      groupName
    };
  }
});