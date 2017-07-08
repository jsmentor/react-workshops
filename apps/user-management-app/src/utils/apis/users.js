import fetch from '../../core/fetch';
import {
  getConfig, postConfig, putConfig, removeConfig,
  USERS_API_PATH
} from './conf';

export async function removeUser(user) {
  const resp = await fetch(`${USERS_API_PATH}/${user._id}`, removeConfig);
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function getUsers() {
  const resp = await fetch(USERS_API_PATH, getConfig);
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function createUser(newUser) {
  const resp = await fetch(USERS_API_PATH, postConfig(newUser));
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function updateUser(newUser) {
  const resp = await fetch(`${USERS_API_PATH}/${newUser._id}`, putConfig(newUser));
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export function removeUsers(selectedUsers) {
  return Promise.all(selectedUsers.map(removeUser));
}