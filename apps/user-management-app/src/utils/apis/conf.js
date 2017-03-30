import {host, protocol} from '../../config';

export const GROUPS_API_PATH = `${protocol}://${host}/apis/groups`;
export const USERS_API_PATH = `${protocol}://${host}/apis/users`;

export const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const getConfig = {
  method: 'get',
  headers,
};
export const removeConfig = {
  method: 'delete',
  headers,
};
export const postConfig = (body) => ({
  method: 'post',
  headers,
  ...(body ? {
      body: JSON.stringify(body),
    } : null)
});

export const putConfig = (body) => ({
  method: 'put',
  headers,
  ...(body ? {
      body: JSON.stringify(body),
    } : null)
});
