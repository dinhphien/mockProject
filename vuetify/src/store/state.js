// https://vuex.vuejs.org/en/state.html

export default {
  user: {
  	id: localStorage.id,
    email: localStorage.email,
    password: localStorage.password,
    isAdmin: localStorage.isAdmin,
    departmentId: localStorage.departmentId,
    roleId: localStorage.roleId,
    isDepartmentManager: localStorage.isDepartmentManager
  },
  userProfile: {},
  Roles: [],
  AssetTypes: [],
  Purposes: [],
  Departments: [],
  Employees: [],
  AssetTypes: [],
  Assets: [],

  detailedAsset: {},

  detailedDepartmentId: null,
  detailedDepartment: {},

  detailedEmployeesDepartment: {

  },
  detailedAssetsEmployee:{},
  employeeCandidates: [],

      
  
}
