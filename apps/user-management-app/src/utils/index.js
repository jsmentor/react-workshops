import React from 'react';
import _ from 'lodash';
import {getUsers} from '../utils/apis/users';
import {getUserGroups, loadGroupUsers} from '../utils/apis/groups';
import {getUsersListSuccess} from '../actions/users';
import {getUserGroupsSuccess, getGroupUsersSuccess} from '../actions/groups';

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error
  }
}

export function parseJSON(response) {
  return response.json()
}

export async function loadUsersList(store) {
  let list = store.getState().users.list;
  if(!_.isArray(list) || !list.length) {
    list = await getUsers();
    store.dispatch(getUsersListSuccess(list));
  }
}

export async function loadUserGroupsList(store) {
  let list = store.getState().groups.list;
  if(!_.isArray(list) || !list.length) {
    list = await getUserGroups();
    store.dispatch(getUserGroupsSuccess(list));
  }
}

export async function loadGroupUsersList(store, name) {
  let list = _.get(store.getState(), 'groups.groupUsers[name].list');
  if(!_.isArray(list) || !list.length) {
    list = await loadGroupUsers(name);
    store.dispatch(getGroupUsersSuccess(name, list));
  }
}