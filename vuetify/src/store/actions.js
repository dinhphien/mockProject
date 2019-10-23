// https://vuex.vuejs.org/en/actions.html

import * as localS from "../utils/localStorage"
const axios = require('axios').default
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.common['Authorization'] = 'bearer' + ' ' + localS.getItem('token')
export default {
	async loginAccountDB(context, account){
		let loginAccount = {...account}
		try {
			let response = await axios.post('/login', {...loginAccount})
			localStorage.clear()
			
			
			localS.setProfileUser(response)
			axios.defaults.headers.common['Authorization'] = 'bearer' + ' ' + localS.getItem('token')
			context.commit("login", response.data.user)
		} catch (err){
			console.log(err.status)
			console.log(err.response)
			console.log(err)
			alert('Invalid email or password!')
		}		
	},
	async signupAccountDB(context, newaccount){
		let signupAccount = {...newaccount}
		try {
			let response = await axios.post('http://localhost:3000/signup', {...signupAccount})
			alert('Signup successful!')
		} catch (err){
			console.error(err)
			alert('email must be unique!!!')
			console.log("email must be unique!")
		}
		
	},

	////////////////////////////////////////////////////////////////////////////////////////
	// ROLES
	/////////////////////////////////////////////////////////////////////////////////////////
	async addNewRoletoDB(context, newRole){
		let role = {...newRole}
		try {
			//console.log(role)
			let response = await axios.post('roles/create', role)
			//console.log(response.data)
			context.commit('addNewRoleDB', response.data)
			//console.log("Added the new role successfully")
		}
		catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async getRolesDB(context){
		try {
			let response = await axios.get('roles/read')
			//console.log(response.data)
			context.commit('getRolesDB', response.data)
			//console.log("Read roles successfully!")
		}catch (err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async editRoleDB(context, item){
		try {
			//console.log("In editRoledDB actions")
			// console.log(item)
			let editedItem = Object.assign({}, item)
			//let index = item.index
			//console.log(editedRole.name)
			//console.log(editedRole.id)

			let response = await axios.post('/roles/update', { id: editedItem.editedRole.id, name: editedItem.editedRole.name})
			context.commit('editRoleDB', {editedRole: response.data, index: editedItem.index})
			//console.log(response.data)
		} catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async deleteRoleDB(context, item){
		try {
			//console.log("In actions")
			//console.log(item)
			let response = await axios.post('/roles/delete', {id: item.id})
			//console.log(response)
			context.commit('deleteRoleDB', item)

		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//ASSETTYPES
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	async addNewAssetTypetoDB(context, newAssetType){
		let assetType = {...newAssetType}
		try {
			//console.log(role)
			let response = await axios.post('assetTypes/create', assetType)
			console.log(response.data)
			context.commit('addNewAssetTypeDB', response.data)
			//console.log("Added the new role successfully")
		}
		catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async getAssetTypesDB(context){
		try {
			let response = await axios.get('assetTypes/read')
			console.log(response.data)
			context.commit('getAssetTypesDB', response.data)
			//console.log("Read roles successfully!")
		}catch (err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async editAssetTypeDB(context, item){
		try {
			console.log("In editAssetTypeDB actions")
			let editedItem = Object.assign({}, item)

			let response = await axios.post('/assetTypes/update', { id: editedItem.editedAssetType.id, name: editedItem.editedAssetType.name})
			context.commit('editAssetTypeDB', {editedAssetType: response.data, index: editedItem.index})
		} catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async deleteAssetTypeDB(context, item){
		try {
			let response = await axios.post('/assetTypes/delete', {id: item.id})
			context.commit('deleteAssetTypeDB', item)

		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//PURPOSES
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	async addNewPurposetoDB(context, newPurpose){
		let purpose = {...newPurpose}
		try {
			let response = await axios.post('purposes/create', purpose)
			context.commit('addNewPurposeDB', response.data)
		}
		catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async getPurposesDB(context){
		try {
			let response = await axios.get('purposes/read')
			console.log(response.data)
			context.commit('getPurposesDB', response.data)
		}catch (err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async editPurposeDB(context, item){
		try {
			console.log("In editPurposeDB actions")
			let editedItem = Object.assign({}, item)

			let response = await axios.post('/purposes/update', { id: editedItem.editedPurpose.id, name: editedItem.editedPurpose.name})
			context.commit('editPurposeDB', {editedPurpose: response.data, index: editedItem.index})
		} catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async deletePurposeDB(context, item){
		try {
			let response = await axios.post('/purposes/delete', {id: item.id})
			context.commit('deletePurposeDB', item)

		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//DEPARTMENTS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	async addNewDepartmenttoDB(context, newDepartment){
		let Department = {...newDepartment}
		try {
			let response = await axios.post('departments/create', Department)
			context.commit('addNewDepartmentDB', response.data)
		}
		catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async getDepartmentsDB(context){
		try {
			let response = await axios.get('departments/read')
			context.commit('getDepartmentsDB', response.data)
		}catch (err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async getEmployeesDepartmentDB(context, selectedDepartmentId){
		try{
			let response = await axios.get('departments/readDetailEmployee', { params: { departmentId: selectedDepartmentId}})
			context.commit("getEmployeesDepartmentDB", response.data)

		} catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async getDetailedDepartmentDB(context, selectedDepartmentId){
		try{
			let response = await axios.get('departments/readDetailEmployee', { params: { departmentId: selectedDepartmentId}})
			context.commit("getDetailedDepartmentDB", response.data)

		} catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
		
	},
	async updateBasicInforDepartment(context, updatedInfor){
		let item = {...updatedInfor}
		try {
			let response = await axios.post('departments/updateBasicInfor', item)
			context.commit("getDetailedDepartmentDB", response.data)
		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async removeDepartmentDB(context, idDepartment){
		let item = {idRoom: idDepartment}
		try {
			let response = await axios.post('departments/destroy', item)
			
		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}

	},



	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///EMPLOYEES
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	async addNewEmployeetoDB(context, newEmployee){
		let Employee = {...newEmployee}
		try {
			let response = await axios.post('employees/create', Employee)
			context.commit('addNewEmployeeDB', response.data)
		}
		catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async editEmployeeDB(context, updatedEmployee){
		let updatedItem = Object.assign({},{...updatedEmployee})
		try {
			let response = await axios.post('employees/updateEmployee', {item: updatedItem.editedEmployee})
			context.commit('updateEmployeeDB', { editedEmployee: response.data, index: updatedItem.index})
			
		}
		catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}

	},
	async deleteEmployeeDB(context, item ){
		let selectedItem = item
		try{
			let response = await axios.post('/employees/destroy', {id: selectedItem.id})
			context.commit('deleteEmployeeDB', item)
		}catch (err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}

	},
	async getEmployeesDB(context){
		try {
			let response = await axios.get('employees/read')
			context.commit('getEmployeesDB', response.data)
		}catch (err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}

	},
	async updateUserProfile(context, updatedProfile){
		let updatedItem = {...updatedProfile}
		try {
			let response = await axios.post('/employees/updateProfile', updatedItem)
		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async readUserProfile(context, idUser){
		let userId = {id: idUser}
		try{
			let response = await axios.post('/employees/readDetailedUser', userId)
			context.commit("getDetailedUser", response.data)
		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async getEmployeeCandidates(context){
		try {
			let response = await axios.get('/employees/getCandidatesEmpoyee')
			context.commit("getEmployeeCandidates", response.data)
		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async addEmployeetoDepartment(context, addItem){
		let addEmployeeItem = {...addItem}
		try {
			let response = await axios.post('/employees/addEmployeetoRoom', addEmployeeItem)
			context.commit("getDetailedDepartmentDB", response.data)
			context.dispatch('getEmployeeCandidates')
		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async removeEmployeeDepartment(context, removeItem){
		let removeEmployeeItem = {...removeItem}
		try {
			let response = await axios.post('/employees/removeEmployeeRoom', removeEmployeeItem)
			context.commit("getDetailedDepartmentDB", response.data)
			context.dispatch('getEmployeeCandidates')
		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}

	},



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//ASSETS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	async addNewAssettoDB(context, newAsset){
		let asset = {...newAsset}
		try {
			let response = await axios.post('assets/create', asset)
			context.commit('addNewAssetDB', response.data)
		}
		catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async getAssetsDB(context){
		try {
			let response = await axios.get('assets/read')
			context.commit('getAssetsDB', response.data)
		}catch (err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}

	},
	async handingOver(context, handOverItem){
		try {
			let item = {...handOverItem}
			let response = await axios.post('assets/handingOverSendEmail', item)
			context.commit('changeDetailedAsset', response.data)
			alert("Handing over successfully!")
		}catch (err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async getManagedAssetsEmployee(context, idManager){
		let idEmployee = idManager
		try {
			let response = await axios.post('employees/getManagedAssetsEmployee', {id: idEmployee})
			context.commit("getDetailedAssetEmployee", response.data)

		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async editAssetDB(context, updatedItem){
		try {
			console.log("In editPurposeDB actions")
			let editedItem = Object.assign({}, updatedItem)

			let response = await axios.post('/assets/update', { item: editedItem.editedAsset})
			context.commit('editAssetDB', {editedAsset: response.data, index: editedItem.index})
		} catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	},
	async deleteAssetDB(context, item){
		let itemAsset = item
		try{
			let response = await axios.post('/assets/delete', {id: itemAsset.id})
			context.commit('deleteAssetDB', itemAsset)

		}catch(err){
			console.log(err)
			console.error(err.response.data.error)
			alert(err.response.data.error)
		}
	}

}
