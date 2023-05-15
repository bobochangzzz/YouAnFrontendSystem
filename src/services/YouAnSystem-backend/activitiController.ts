// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addDeploymentByString POST /api/activiti/addDeploymentByString */
export async function addDeploymentByStringUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addDeploymentByStringUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/activiti/addDeploymentByString', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** delDefinition GET /api/activiti/delDefinition */
export async function delDefinitionUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delDefinitionUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/activiti/delDefinition', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getDefinitions GET /api/activiti/getDefinitions */
export async function getDefinitionsUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/api/activiti/getDefinitions', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getProcessDefineXML GET /api/activiti/getDefinitionXML */
export async function getProcessDefineXMLUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProcessDefineXMLUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/activiti/getDefinitionXML', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getDeployments GET /api/activiti/getDeployments */
export async function getDeploymentsUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/api/activiti/getDeployments', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getInstances GET /api/activiti/getInstances */
export async function getInstancesUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/api/activiti/getInstances', {
    method: 'GET',
    ...(options || {}),
  });
}

/** startProcess GET /api/activiti/startProcess */
export async function startProcessUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.startProcessUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/activiti/startProcess', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** uploadStreamAndDeployment POST /api/activiti/uploadStreamAndDeployment */
export async function uploadStreamAndDeploymentUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadStreamAndDeploymentUsingPOSTParams,
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/activiti/uploadStreamAndDeployment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
