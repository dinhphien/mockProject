/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    view: 'UserProfile',
    name: 'home'
    // components: {
    //   default: 'Dashboard',
    //   authen: 'Login'
    // }
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/assets',
    name: 'Assets',
    view: 'Assets'
  },
  {
    path: '/roles',
    name: 'Roles',
    view: 'Roles'
  },
  {
    path: '/departments',
    name: 'Departments',
    view: 'Departments'
  },
  {
    path: '/assetTypes',
    name: 'AssetTypes',
    view: 'AssetTypes'
  },
  {
    path: '/purposes',
    name: 'Purposes',
    view: 'Purposes'
  },
  {
    path: '/employees',
    name: 'Employees',
    view: 'Employees'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  },
  {
    path: '/detailed-assets',
    name: 'detailed-assets',
    view: 'DetailedAssets'
  },
  {
    path: '/detailed-departments',
    name: 'detailed-departments',
    view: 'DetailedDepartments'
  }
]
