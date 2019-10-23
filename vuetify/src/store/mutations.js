// https://vuex.vuejs.org/en/mutations.html


export default {
	editDevice(state, item){
		let selectedItem = Object.assign({}, item)
		Object.assign(state.devicesArray[item.index], {
			name: item.name,
	        country: item.country,
	        city: item.city,
	        salary: item.salary,
		} )
	},
	addDevice(state, item){
		state.devicesArray.push({});
		Object.assign(state.devicesArray[state.devicesArray.length - 1], item)
	},
	deleteDevice(state, item){
		const index = state.devicesArray.indexOf(item)
		state.devicesArray.splice(index, 1)
	},
	getDevices(state, devicesArray){
		state.devicesArray = devicesArray
	},
	test(state, payload){
		state.test = state.test + payload
	},
	login(state, userProfile){
		state.user.id = localStorage.id
		state.user.email = localStorage.email
		state.user.password = localStorage.password
		state.user.isAdmin = localStorage.isAdmin
		state.user.roleId = localStorage.roleId
		state.user.departmentId = localStorage.departmentId
        state.user.isDepartmentManager = localStorage.isDepartmentManager
        Object.assign(state.userProfile, userProfile)
	},
	logout(state){

		localStorage.clear()
		state.user.id = localStorage.id
		state.user.email = localStorage.email
		state.user.password = localStorage.password
		state.user.isAdmin = localStorage.isAdmin
		state.user.roleId = localStorage.roleId
		state.user.departmentId = localStorage.departmentId
        state.user.isDepartmentManager = localStorage.isDepartmentManager
	},


    /////////////////////////////////////////////////////////////////////////////////////////////
    //ROLES
    ///////////////////////////////////////////////////////////////////////////////////////////
    getRolesDB(state, listRoles){
    	state.Roles = listRoles
    },
    addNewRoleDB(state, newRole){
    	state.Roles.push({})
    	Object.assign(state.Roles[state.Roles.length - 1], newRole)

    },
    editRoleDB(state, item){
    	let editedItem = Object.assign({}, item)
    	Object.assign(state.Roles[editedItem.index], editedItem.editedRole)
    },
    deleteRoleDB(state, item){
    	const index = state.Roles.indexOf(item)
    	state.Roles.splice(index, 1)
    },


    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //ASSETTYPES
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    getAssetTypesDB(state, listAssetTypes){
    	state.AssetTypes = listAssetTypes
    },
    addNewAssetTypeDB(state, newAssetType){
    	state.AssetTypes.push({})
    	Object.assign(state.AssetTypes[state.AssetTypes.length - 1], newAssetType)

    },
    editAssetTypeDB(state, item){
    	let editedItem = Object.assign({}, item)
    	Object.assign(state.AssetTypes[editedItem.index], editedItem.editedAssetType)

    },
    deleteAssetTypeDB(state, item){
    	const index = state.AssetTypes.indexOf(item)
    	state.AssetTypes.splice(index, 1)
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //PURPOSES
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    getPurposesDB(state, listPurposes){
    	state.Purposes = listPurposes
    },
    addNewPurposeDB(state, newPurpose){
    	state.Purposes.push({})
    	Object.assign(state.Purposes[state.Purposes.length - 1], newPurpose)

    },
    editPurposeDB(state, item){
    	let editedItem = Object.assign({}, item)
    	Object.assign(state.Purposes[editedItem.index], editedItem.editedPurpose)

    },
    deletePurposeDB(state, item){
    	const index = state.Purposes.indexOf(item)
    	state.Purposes.splice(index, 1)
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //DEPARTMENTS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    getDepartmentsDB(state, listDepartments){
    	state.Departments = listDepartments
    },
    addNewDepartmentDB(state, newDepartment){
    	state.Departments.push({})
    	Object.assign(state.Departments[state.Departments.length - 1], newDepartment)

    },
    getEmployeesDepartmentDB(state, detailedEmployeesDepartment){
        state.detailedEmployeesDepartment = detailedEmployeesDepartment
    },
    changeDetailedDepartmentId(state, idDepartment){
        state.detailedDepartmentId = idDepartment
    },
    getDetailedDepartmentDB(state, detailedDepartment){
        state.detailedDepartment = detailedDepartment
    },
    getEmployeeCandidates(state, listCandidates){
        state.employeeCandidates = listCandidates
    },
    updateEmployeeDB(state, updatedItem){
        let updatedEmployee = updatedItem.editedEmployee
        let index = updatedItem.index
        Object.assign(state.Employees[index], updatedEmployee)
    },
    deleteEmployeeDB(state, item){
        let index = state.Employees.indexOf(item)
        state.Employees.splice(index, 1)
    },



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //EMPLOYEES
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    getEmployeesDB(state, listEmployees){
        state.Employees = listEmployees
    },
    addNewEmployeeDB(state, newEmployee){
        state.Employees.push({})
        Object.assign(state.Employees[state.Employees.length - 1], newEmployee)

    },
    getDetailedAssetEmployee(state, employee){
        state.detailedAssetsEmployee = employee
    },
    getDetailedUser(state, userDetailed){
        Object.assign(state.userProfile, userDetailed)
    },



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //ASSETS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getAssetsDB(state, listAssets){
        state.Assets = listAssets
    },
    addNewAssetDB(state, newAsset){
         state.Assets.push({})
        Object.assign(state.Assets[state.Assets.length - 1], newAsset)

    },
    changeDetailedAsset(state, item){
        Object.assign(state.detailedAsset, item)
    },
    editAssetDB(state, item){
        let updatedAsset = item.editedAsset
        let index = item.index
        Object.assign(state.Assets[index], updatedAsset)
    },
    deleteAssetDB(state, item){
        let index = state.Assets.indexOf(item)
        state.Assets.splice(index, 1)
    }



}
