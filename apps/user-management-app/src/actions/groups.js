import * as GroupsAPI from '../utils/apis/groups';
import {
  GET_USER_GROUPS_REQUEST, GET_USER_GROUPS_SUCCESS, GET_USER_GROUPS_FAILURE,
  GET_GROUP_USERS_REQUEST, GET_GROUP_USERS_SUCCESS, GET_GROUP_USERS_FAILURE,
  CREATE_USER_GROUP_REQUEST, CREATE_USER_GROUP_SUCCESS, CREATE_USER_GROUP_FAILURE,
  REMOVE_USER_GROUPS_REQUEST, REMOVE_USER_GROUPS_SUCCESS, REMOVE_USER_GROUPS_FAILURE,
} from '../constants';

export function getUserGroupsRequest() {
  return {
    type: GET_USER_GROUPS_REQUEST,
  };
}

export function getUserGroupsSuccess(list) {
  return {
    type: GET_USER_GROUPS_SUCCESS,
    payload: {
      list
    }
  };
}

export function getGroupUsersRequest(name) {
  return {
    type: GET_GROUP_USERS_REQUEST,
    payload: {
      name
    }
  };
}

export function getGroupUsersSuccess(name, list) {
  return {
    type: GET_GROUP_USERS_SUCCESS,
    payload: {
      name,
      list
    }
  };
}

export function getGroupUsersFailure(name, error) {
  return {
    type: GET_GROUP_USERS_FAILURE,
    payload: {
      name,
      error
    }
  };
}

export function getUserGroupsFailure(error) {
  return {
    type: GET_USER_GROUPS_FAILURE,
    payload: {
      error
    }
  }
}

export function createUserGroupRequest(newGroup) {
  return {
    type: CREATE_USER_GROUP_REQUEST,
    payload:{
      newGroup
    }
  };
}

export function createUserGroupSuccess(newGroup) {
  return {
    type: CREATE_USER_GROUP_SUCCESS,
    payload: {
      newGroup
    }
  };
}

export function createUserGroupFailure(error) {
  return {
    type: CREATE_USER_GROUP_FAILURE,
    payload: {
      error
    }
  }
}

export function removeUserGroupsRequest(selectedUserGroups) {
  return {
    type: REMOVE_USER_GROUPS_REQUEST,
    payload:{
      selectedUserGroups
    }
  };
}

export function removeUserGroupsSuccess() {
  return {
    type: REMOVE_USER_GROUPS_SUCCESS,
  };
}

export function removeUserGroupsFailure(error) {
  return {
    type: REMOVE_USER_GROUPS_FAILURE,
    payload: {
      error
    }
  }
}

export function loadUserGroups() {
  return async function (dispatch) {
    dispatch(getUserGroupsRequest());
    try {
      let list = await GroupsAPI.getUserGroups();
      dispatch(getUserGroupsSuccess(list));
    } catch (error) {
      dispatch(getUserGroupsFailure(error));
    }
  };
}

export function createUserGroup(name) {
  return async function (dispatch) {
    dispatch(createUserGroupRequest({name}));
    try {
      let newGroup = await GroupsAPI.createUserGroup(name);
      dispatch(createUserGroupSuccess(newGroup));
    } catch (error) {
      dispatch(createUserGroupFailure(error));
    }
  };
}

export function removeSelectedUserGroups(selectedUserGroups) {
  return async function (dispatch) {
    dispatch(removeUserGroupsRequest(selectedUserGroups));
    try {
      await GroupsAPI.removeUserGroups(selectedUserGroups);
      dispatch(removeUserGroupsSuccess());
    } catch (error) {
      dispatch(removeUserGroupsFailure(error));
    }
  };
}