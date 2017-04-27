import fetch from '../../core/fetch';
import _ from 'lodash';
import {
  getConfig, putConfig, postConfig, removeConfig,
  GROUPS_API_PATH
} from './conf';

async function removeUserGroup(userGroup) {
  const resp = await fetch(`${GROUPS_API_PATH}/${userGroup._id}`, removeConfig);
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function getUserGroups() {
  const resp = await fetch(GROUPS_API_PATH, getConfig);
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function loadGroupUsers(groupName) {
  const resp = await fetch(`${GROUPS_API_PATH}/${groupName}/users`, getConfig);
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function assignGroupUsers(groupName, selectedUsers) {
  const resp = await fetch(`${GROUPS_API_PATH}/${groupName}/users`, postConfig(_.map(selectedUsers, '_id')));
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function unassignGroupUsers(groupName, selectedUsers) {
  const resp = await fetch(`${GROUPS_API_PATH}/${groupName}/users`, putConfig(_.map(selectedUsers, '_id')));
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function createUserGroup(name) {
  const resp = await fetch(GROUPS_API_PATH, postConfig({name}));
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export function removeUserGroups(selectedUserGroups) {
  return Promise.all(selectedUserGroups.map(removeUserGroup));
}