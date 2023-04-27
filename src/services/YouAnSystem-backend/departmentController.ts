// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addDepartment POST /api/department/add */
export async function addDepartmentUsingPOST(
  body: API.DepartmentAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/department/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteDepartment POST /api/department/delete */
export async function deleteDepartmentUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/department/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listDepartmentByPage POST /api/department/list/page */
export async function listDepartmentByPageUsingPOST(
  body: API.DepartmentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDepartment>('/api/department/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateDepartment POST /api/department/update */
export async function updateDepartmentUsingPOST(
  body: API.DepartmentUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/department/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
