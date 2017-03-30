import * as UsersAPI from '../utils/apis/users';
import * as GroupsAPI from '../utils/apis/groups';
import {getGroupUsersRequest, getGroupUsersSuccess, getGroupUsersFailure} from './groups';
import {
  GET_USERS_LIST_REQUEST, GET_USERS_LIST_SUCCESS, GET_USERS_LIST_FAILURE,
  CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
  REMOVE_USERS_REQUEST, REMOVE_USERS_SUCCESS, REMOVE_USERS_FAILURE,
  ASSIGN_USERS_REQUEST, ASSIGN_USERS_SUCCESS, ASSIGN_USERS_FAILURE,
  UNASSIGN_USERS_REQUEST, UNASSIGN_USERS_SUCCESS, UNASSIGN_USERS_FAILURE,
} from '../constants';

export function getUsersListRequest() {
  return {
    type: GET_USERS_LIST_REQUEST,
  };
}

export function getUsersListSuccess(list) {
  return {
    type: GET_USERS_LIST_SUCCESS,
    payload: {
      list
    }
  };
}

export function getUsersListFailure(error) {
  return {
    type: GET_USERS_LIST_FAILURE,
    payload: {
      error
    }
  }
}

export function createUserRequest(newUser) {
  return {
    type: CREATE_USER_REQUEST,
    payload:{
      newUser
    }
  };
}

export function createUserSuccess(newUser) {
  return {
    type: CREATE_USER_SUCCESS,
    payload: {
      newUser
    }
  };
}

export function createUserFailure(error) {
  return {
    type: CREATE_USER_FAILURE,
    payload: {
      error
    }
  }
}

export function removeUsersRequest(selectedUsers) {
  return {
    type: REMOVE_USERS_REQUEST,
    payload:{
      selectedUsers
    }
  };
}

export function removeUsersSuccess() {
  return {
    type: REMOVE_USERS_SUCCESS,
  };
}

export function removeUsersFailure(error) {
  return {
    type: REMOVE_USERS_FAILURE,
    payload: {
      error
    }
  }
}

export function assignUsersRequest(payload) {
  return {
    type: ASSIGN_USERS_REQUEST,
    payload
  }
}
export function assignUsersSuccess(payload) {
  return {
    type: ASSIGN_USERS_SUCCESS,
    payload
  }
}
export function assignUsersFailure(payload) {
  return {
    type: ASSIGN_USERS_FAILURE,
    payload
  }
}

export function unassignUsersRequest(payload) {
  return {
    type: UNASSIGN_USERS_REQUEST,
    payload
  }
}
export function unassignUsersSuccess(payload) {
  return {
    type: UNASSIGN_USERS_SUCCESS,
    payload
  }
}
export function unassignUsersFailure(payload) {
  return {
    type: UNASSIGN_USERS_FAILURE,
    payload
  }
}

export function loadUsers() {
  return async function (dispatch) {
    dispatch(getUsersListRequest());
    try {
      let list = await UsersAPI.getUsers();
      dispatch(getUsersListSuccess(list));
    } catch (error) {
      dispatch(getUsersListFailure(error));
    }
  };
}

export function loadGroupUsers(name) {
  return async function (dispatch) {
    dispatch(getGroupUsersRequest(name));
    try {
      let list = await GroupsAPI.loadGroupUsers(name);
      dispatch(getGroupUsersSuccess(name, list));
    } catch (error) {
      dispatch(getGroupUsersFailure(name, error));
    }
  }
}

export function createUser(newUser) {
  return async function (dispatch) {
    dispatch(createUserRequest(newUser));
    try {
      let newGroup = await UsersAPI.createUser(newUser);
      dispatch(createUserSuccess(newUser));
    } catch (error) {
      dispatch(createUserFailure(error));
    }
  };
}

export function assignSelectedUsers(groupName, selectedUsers) {
  return async function (dispatch) {
    dispatch(assignUsersRequest({groupName, selectedUsers}));
    try {
      await GroupsAPI.assignGroupUsers(groupName, selectedUsers);
      dispatch(assignUsersSuccess({groupName, selectedUsers}));
    } catch (error) {
      dispatch(assignUsersFailure({groupName, error}));
    }
  };
}

export function unassignSelectedUsers(groupName, selectedUsers) {
  return async function (dispatch) {
    dispatch(unassignUsersRequest({groupName, selectedUsers}));
    try {
      await GroupsAPI.unassignGroupUsers(groupName, selectedUsers);
      dispatch(unassignUsersSuccess({groupName, selectedUsers}));
    } catch (error) {
      dispatch(unassignUsersFailure({groupName, error}));
    }
  };
}

export function removeSelectedUsers(selectedUsers) {
  return async function (dispatch) {
    dispatch(removeUsersRequest(selectedUsers));
    try {
      await UsersAPI.removeUsers(selectedUsers);
      dispatch(removeUsersSuccess());
    } catch (error) {
      dispatch(removeUsersFailure(error));
    }
  };
}