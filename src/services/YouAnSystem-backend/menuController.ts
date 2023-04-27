// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addMenu POST /api/menu/add */
export async function addMenuUsingPOST(body: API.MenuAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponselong>('/api/menu/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteMenu POST /api/menu/delete */
export async function deleteMenuUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/menu/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMenuByPage POST /api/menu/list/page */
export async function listMenuByPageUsingPOST(
  body: API.MenuQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMenu>('/api/menu/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateMenu POST /api/menu/update */
export async function updateMenuUsingPOST(
  body: API.MenuUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/menu/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
