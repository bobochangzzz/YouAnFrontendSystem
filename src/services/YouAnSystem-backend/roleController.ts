// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addRole POST /api/role/add */
export async function addRoleUsingPOST(body: API.RoleAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponselong>('/api/role/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** assignMenu POST /api/role/assign/menu */
export async function assignMenuUsingPOST(
  body: API.AssignMenuRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/role/assign/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** assignRole POST /api/role/assign/role */
export async function assignRoleUsingPOST(
  body: API.AssignRoleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/role/assign/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteRole POST /api/role/delete */
export async function deleteRoleUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/role/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCurrentRole GET /api/role/get */
export async function getCurrentRoleUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentRoleUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCurrentRoleVO>('/api/role/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getCurrentRoleMenu GET /api/role/get/menuPermission */
export async function getCurrentRoleMenuUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentRoleMenuUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCurrentRoleMenuVO>('/api/role/get/menuPermission', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listRoleByPage POST /api/role/list/page */
export async function listRoleByPageUsingPOST(
  body: API.RoleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRole>('/api/role/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateRole POST /api/role/update */
export async function updateRoleUsingPOST1(
  body: API.RoleUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/role/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
