import fetch from '../core/fetch';
import * as GroupsAPI from '../utils/apis/groups';

export function loadGroupsRequest() {
  return {
    type: 'LOAD_GROUPS_REQUEST'
  };
}

export function loadGroupsSuccess(data) {
  return {
    type: 'LOAD_GROUPS_SUCCESS',
    payload: data
  };
}

export function loadGroupsFailure(error) {
  return {
    type: 'LOAD_GROUPS_FAILURE',
    payload: error
  };
}

export function loadUserGroups(store){
  store.dispatch(loadGroupsRequest());
  return GroupsAPI.getUserGroups()
    .then((data) => {
      store.dispatch(loadGroupsSuccess(data));
      return data;
    })
    .catch((error) => {
      store.dispatch(loadGroupsFailure(error));
    });
}

export async function asyncLoadUserGroups(store){
  store.dispatch(loadGroupsRequest());
  try{
    let data = await GroupsAPI.getUserGroups();
    store.dispatch(loadGroupsSuccess(data));
    return data;
  } catch (error){
    store.dispatch(loadGroupsFailure(error));
  }
}

export function thunkLoadUserGroups() {
  return (dispatch) => {
    dispatch(loadGroupsRequest());
    return GroupsAPI.getUserGroups()
      .then((data) => {
        dispatch(loadGroupsSuccess(data));
        return data;
      })
      .catch((error) => {
        dispatch(loadGroupsFailure(error));
      });
  };
}