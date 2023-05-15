declare namespace API {
  type addDeploymentByStringUsingPOSTParams = {
    /** stringBPMN */
    stringBPMN: string;
    /** processName */
    processName: string;
  };

  type AssignMenuRequest = {
    menuIds?: number[];
    roleId?: number;
  };

  type AssignRoleRequest = {
    userId?: number;
    userRoleEnumText?: string;
  };

  type BaseResponse = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCurrentEmployeeVo = {
    code?: number;
    data?: CurrentEmployeeVo;
    message?: string;
  };

  type BaseResponseCurrentRoleMenuVO = {
    code?: number;
    data?: CurrentRoleMenuVO;
    message?: string;
  };

  type BaseResponseCurrentRoleVO = {
    code?: number;
    data?: CurrentRoleVO;
    message?: string;
  };

  type BaseResponseCurrentUserVO = {
    code?: number;
    data?: CurrentUserVO;
    message?: string;
  };

  type BaseResponseListMenuVo = {
    code?: number;
    data?: MenuVo[];
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageDepartment = {
    code?: number;
    data?: PageDepartment;
    message?: string;
  };

  type BaseResponsePageDepartmentVO = {
    code?: number;
    data?: PageDepartmentVO;
    message?: string;
  };

  type BaseResponsePageEmployee = {
    code?: number;
    data?: PageEmployee;
    message?: string;
  };

  type BaseResponsePageMenu = {
    code?: number;
    data?: PageMenu;
    message?: string;
  };

  type BaseResponsePageRole = {
    code?: number;
    data?: PageRole;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponsestring = {
    code?: number;
    data?: string;
    message?: string;
  };

  type CurrentEmployeeVo = {
    address?: string;
    bankCard?: string;
    card?: string;
    cardTime?: string;
    career?: string;
    certificate?: string;
    departmentId?: number;
    email?: string;
    entryTime?: string;
    major?: string;
    name?: string;
    nativePlace?: string;
    phone?: string;
    position?: string;
    remark?: string;
    resignTime?: string;
    school?: string;
    sex?: string;
    status?: number;
  };

  type CurrentRoleMenuVO = {
    menuNameStr?: StringBuffer;
    roleIdentification?: string;
    roleName?: string;
  };

  type CurrentRoleVO = {
    remark?: string;
    roleIdentification?: string;
    roleName?: string;
    status?: number;
  };

  type CurrentUserVO = {
    departmentName?: string;
    email?: string;
    phone?: string;
    userName?: string;
  };

  type delDefinitionUsingGETParams = {
    /** depID */
    depID: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type Department = {
    createTime?: string;
    departmentHeadId?: number;
    departmentName?: string;
    email?: string;
    id?: number;
    isDelete?: number;
    parentId?: number;
    phone?: string;
    status?: number;
    updateTime?: string;
  };

  type DepartmentAddRequest = {
    departmentHeadId?: number;
    departmentName?: string;
    email?: string;
    parentId?: number;
    phone?: string;
    status?: number;
  };

  type DepartmentQueryRequest = {
    current?: number;
    departmentHeadId?: number;
    departmentName?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type DepartmentUpdateRequest = {
    departmentHeadId?: string;
    departmentName?: string;
    email?: string;
    id?: number;
    parentId?: number;
    phone?: string;
    status?: number;
  };

  type DepartmentVO = {
    departmentHeadName?: string;
    departmentName?: string;
    id?: number;
    parDepartmentName?: string;
    phone?: string;
    email?: string;
  };

  type Employee = {
    address?: string;
    bankCard?: string;
    card?: string;
    cardTime?: string;
    career?: string;
    certificate?: string;
    createTime?: string;
    departmentId?: number;
    email?: string;
    entryTime?: string;
    id?: number;
    isDelete?: number;
    major?: string;
    name?: string;
    nativePlace?: string;
    phone?: string;
    position?: string;
    remark?: string;
    resignTime?: string;
    school?: string;
    sex?: string;
    status?: number;
    updateTime?: string;
  };

  type EmployeeAddRequest = {
    address?: string;
    bankCard?: string;
    card?: string;
    cardTime?: string;
    career?: string;
    certificate?: string;
    departmentId?: number;
    email?: string;
    entryTime?: string;
    id?: number;
    major?: string;
    name?: string;
    nativePlace?: string;
    phone?: string;
    position?: string;
    remark?: string;
    resignTime?: string;
    school?: string;
    sex?: number;
    status?: number;
  };

  type EmployeeQueryRequest = {
    address?: string;
    bankCard?: string;
    card?: string;
    cardTime?: string;
    career?: string;
    certificate?: string;
    current?: number;
    departmentId?: number;
    email?: string;
    entryTime?: string;
    id?: number;
    major?: string;
    name?: string;
    nativePlace?: string;
    pageSize?: number;
    phone?: string;
    position?: string;
    remark?: string;
    resignTime?: string;
    school?: string;
    sex?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type EmployeeUpdateRequest = {
    address?: string;
    bankCard?: string;
    card?: string;
    cardTime?: string;
    career?: string;
    certificate?: string;
    departmentId?: number;
    email?: string;
    entryTime?: string;
    id?: number;
    major?: string;
    name?: string;
    nativePlace?: string;
    phone?: string;
    position?: string;
    remark?: string;
    resignTime?: string;
    school?: string;
    sex?: number;
    status?: number;
  };

  type getCurrentEmployeeUsingGETParams = {
    /** employeeId */
    employeeId?: number;
  };

  type getCurrentRoleMenuUsingGETParams = {
    /** roleId */
    roleId?: number;
  };

  type getCurrentRoleUsingGETParams = {
    /** roleId */
    roleId?: number;
  };

  type getProcessDefineXMLUsingGETParams = {
    /** deploymentId */
    deploymentId: string;
    /** resourceName */
    resourceName: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type Menu = {
    component?: string;
    createTime?: string;
    icon?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    path?: string;
    permissionValue?: string;
    pid?: number;
    status?: number;
    type?: number;
    updateTime?: string;
  };

  type MenuAddRequest = {
    icon?: string;
    name?: string;
    path?: string;
    pid?: number;
    status?: number;
    type?: number;
  };

  type MenuQueryRequest = {
    component?: string;
    current?: number;
    icon?: string;
    id?: number;
    name?: string;
    pageSize?: number;
    path?: string;
    permissionValue?: string;
    pid?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    type?: number;
  };

  type MenuUpdateRequest = {
    component?: string;
    icon?: string;
    id?: number;
    name?: string;
    path?: string;
    permissionValue?: string;
    pid?: number;
    status?: number;
    type?: number;
  };

  type MenuVo = {
    component?: string;
    createTime?: string;
    icon?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    path?: string;
    permissionValue?: string;
    pid?: number;
    status?: number;
    subMenuList?: MenuVo[];
    type?: number;
    updateTime?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageDepartment = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Department[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageDepartmentVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: DepartmentVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageEmployee = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Employee[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMenu = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Menu[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageRole = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Role[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Role = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    remark?: string;
    roleName?: string;
    status?: number;
    updateTime?: string;
  };

  type RoleAddRequest = {
    remark?: string;
    roleName?: string;
    status?: number;
  };

  type RoleQueryRequest = {
    current?: number;
    pageSize?: number;
    remark?: string;
    roleName?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type RoleUpdateRequest = {
    id?: number;
    remark?: string;
    roleName?: string;
    status?: number;
  };

  type startProcessUsingGETParams = {
    /** processDefinitionKey */
    processDefinitionKey: string;
    /** instanceName */
    instanceName: string;
  };

  type StringBuffer = true;

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type uploadStreamAndDeploymentUsingPOSTParams = {
    /** processName */
    processName: string;
  };

  type User = {
    createTime?: string;
    departmentId?: number;
    id?: number;
    isDelete?: number;
    phone?: string;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
    userRoleName?: string;
  };

  type UserAddRequest = {
    departmentId?: number;
    phone?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
    userRoleName?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    departmentId?: number;
    id?: number;
    pageSize?: number;
    phone?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userAccount?: string;
    userName?: string;
    userRoleName?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdatePasswordRequest = {
    userId?: number;
    userPassword?: string;
  };

  type UserUpdateRequest = {
    departmentId?: number;
    id?: number;
    phone?: string;
    status?: number;
    userName?: string;
    userPassword?: string;
    userRoleName?: string;
  };

  type UserVO = {
    createTime?: string;
    departmentName?: string;
    id?: number;
    phone?: string;
    status?: number;
    userAccount?: string;
    userName?: string;
    userRoleName?: string;
  };
}
