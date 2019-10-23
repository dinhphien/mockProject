
function setProfileUser(response){
	localStorage.token = response.data.token
	localStorage.id= response.data.user.id
	localStorage.email= response.data.user.email
	localStorage.password= response.data.user.password
	
	localStorage.isAdmin = response.data.user.isAdmin
	if(!response.data.user.Role){
		localStorage.departmentId = null
		localStorage.roleId= null
		localStorage.isDepartmentManager = null
	}else{
		localStorage.departmentId = response.data.user.Department.id
		localStorage.roleId= response.data.user.Role.id
		if(response.data.user.id === response.data.user.Department.managerId){
			localStorage.isDepartmentManager = true
		}
	}

};
function getItem(item){
	return localStorage.getItem(item)
}


export {
	setProfileUser,
	getItem

}
 