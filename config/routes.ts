export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'https://bobocahng-1309945187.cos.ap-guangzhou.myqcloud.com/20230513/马卡龙.png',
    component: './Welcome',
  },
  {
    path: '/userInfo',
    name: '用户管理',
    icon: 'https://bobocahng-1309945187.cos.ap-guangzhou.myqcloud.com/20230512/饼干.png',
    component: './UserInfo',
  },
  {
    path: '/departmentInfo',
    name: '部门管理',
    icon: 'https://bobocahng-1309945187.cos.ap-guangzhou.myqcloud.com/20230512/热狗.png',
    component: './DepartmentInfo',
  },
  {
    path: '/roleInfo',
    name: '角色管理',
    icon: 'https://bobocahng-1309945187.cos.ap-guangzhou.myqcloud.com/20230512/甜甜圈.png',
    component: './RoleInfo',
  },
  {
    path: '/menuInfo',
    name: '菜单管理',
    icon: 'https://bobocahng-1309945187.cos.ap-guangzhou.myqcloud.com/20230512/甜甜圈.png',
    component: './MenuInfo',
  },
  {
    path: '/employeeInfo',
    name: '员工管理',
    icon: 'https://bobocahng-1309945187.cos.ap-guangzhou.myqcloud.com/20230512/甜甜圈.png',
    component: './EmployeeInfo',
  },
  /*{
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },*/
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
