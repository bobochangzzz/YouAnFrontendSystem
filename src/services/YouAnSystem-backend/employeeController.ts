// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addEmployee POST /api/employee/add */
export async function addEmployeeUsingPOST(
  body: API.EmployeeAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/employee/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteEmployee POST /api/employee/delete */
export async function deleteEmployeeUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/employee/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** exportEmployeeData GET /api/employee/export */
export async function exportEmployeeDataUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/employee/export', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getCurrentEmployee GET /api/employee/get */
export async function getCurrentEmployeeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentEmployeeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCurrentEmployeeVo>('/api/employee/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** importEmployeeData POST /api/employee/import */
export async function importEmployeeDataUsingPOST(body: string, options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/employee/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listEmployeeByPage POST /api/employee/list/page */
export async function listEmployeeByPageUsingPOST(
  body: API.EmployeeQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageEmployee>('/api/employee/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateRole POST /api/employee/update */
export async function updateEmployeeUsingPOST(
  body: API.EmployeeUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/employee/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
