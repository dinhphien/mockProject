var express = require('express');
var router = express.Router();
var models  = require('../models');


//////////////////////////////////////////////////////////////////////////////////
router.get('/read', async (req, res, next) => {
	try {
		let listEmployees = await models.Employee.findAll({include : 
			[{model: models.Employee,as: 'Owner', attributes: ['name']}, {model: models.Role, attributes: ['name']}, 
			{model: models.Department, attributes:['name']}]})
		res.status(200).json(listEmployees)
	} catch(err){
		console.log(err)
		next(err)
	}
});
router.get('/getCandidatesEmpoyee', async (req, res, next) => {
	try {
		let listCandidates = await models.Employee.findAll({where : {departmentId : null, isAdmin: false},include : [{model: models.Asset, as: "Managed", include: [{model: models.Employee, as: 'Owner', attributes: ['name']},
			{model: models.Employee, as: 'Manager', attributes: ['name']}, {model: models.AssetType, attributes: ['name']},
			{model: models.Purpose, attributes: ['name']}]}]})
		console.log(listCandidates)
		res.status(200).json(listCandidates)
	} catch(err){
		console.log(err)
		next(err)
	}

});
router.post('/getManagedAssetsEmployee', async (req, res, next) => {
	let idEmployee = req.body.id
	if(!idEmployee){
		throw new Error("ID Employee is not defined!")
	}
	try {
		let listAssets = await models.Employee.findOne({where : {id : idEmployee},include : [{model: models.Asset, as: "Managed", include: [{model: models.Employee, as: 'Owner', attributes: ['name']},
			{model: models.Employee, as: 'Manager', attributes: ['name']}, {model: models.AssetType, attributes: ['name']},
			{model: models.Purpose, attributes: ['name']}]}]})
		res.status(200).json(listAssets)
	} catch(err){
		console.log(err)
		next(err)
	}
});

////////////////////////////////////////////////////////////////////////////////////////
var checkUserProfileAbility = async (req, res, next) => {
	let user = req.user
	let idEmployee = req.body.id
	
	try {
		if(!idEmployee){
			throw new Error("ID Employee does not defined!")
		}
		let employee = await models.Employee.findByPk(idEmployee, {include: [{model: models.Department}]})
		if(user.isAdmin){
			next()
		} else if(user.isDepartmentManager && employee.Department.managerId == user.id){
			next()
		} else if(user.id == employee.id){
			next()
		} else{
			throw new Error("Access denied")
		}

	} catch(err){
		console.log(err)
		next(err)
	}


}



//////////////////////////////////////////////////////////////////////////////////////////
router.post('/updateProfile', checkUserProfileAbility,async (req, res, next)=> {
	let updatedProfile = req.body
	
	try {
		await models.Employee.update({
			name: updatedProfile.name,
			address: updatedProfile.address,
			idCard: updatedProfile.idCard,
			phoneNumber: updatedProfile.phoneNumber,
			email: updatedProfile.email,
			password: updatedProfile.password,

		}, {where: { id: updatedProfile.id}});
		let userDetail = await models.Employee.findByPk(updatedProfile.id, {include : 
			[{model: models.Employee,as: 'Owner', attributes: ['name']}, {model: models.Role, attributes: ['name']}, 
			{model: models.Department, attributes:['name']}]} )
		res.status(200).json(userDetail)
	}catch(err){
		console.log(err)
		next(err)
	}
});

router.post('/readDetailedUser', checkUserProfileAbility,async (req, res, next) => {
	let idUser = req.body.id
	try {
		let userDetail = await models.Employee.findByPk(idUser, {include : 
			[{model: models.Employee,as: 'Owner', attributes: ['name']}, {model: models.Role, attributes: ['name']}, 
			{model: models.Department, attributes:['name']}]} )
		res.status(200).json(userDetail)
	} catch(err){
		console.log(err)
		next(err)
	}
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.use(async (req, res, next) => {
	let user = req.user
	try{
		let room = await models.Department.findByPk(req.body.idRoom)
		if(!room){
			throw new Error("Room doesnot exist!")
		}
		if(user.isAdmin){
			next()
		}else if(user.isDepartmentManager && user.departmentId == room.id){
			next()
		}else{
			throw new Error("Access denied")
		}

	}catch(err){
		console.log(err)
		next(err)
	}


})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/addEmployeetoRoom', async (req, res, next)=> {
	let addItem = req.body
	try {
		if(!addItem.idEmployee || !addItem.idRole){
			throw new Error("ID Employee or ID Role doesnot exist")
		}
		let employee = await models.Employee.findByPk(addItem.idEmployee)
		if(!employee){
			throw new Error("Notfound Employee")
		}
		if(employee.departmentId!==null){
			throw new Error("Employee is in another Department")
		}
		let role = await models.Role.findByPk(addItem.idRole)
		if(!role){
			throw new Error("Role doesnot exist")
		}
		await models.Employee.update({
			departmentId: addItem.idRoom,
			employeeRoleId: addItem.idRole,
		}, {
			where: {id: addItem.idEmployee}
		})
		const departmentDetail = await models.Department.findOne({where: { id: addItem.idRoom}, 
			include : [{model: models.Employee, as: 'Owner', attributes: ['id','name']}, {model: models.Employee, as: 'Manager', attributes: ['id','name']}, 
			{model: models.Employee, as: 'Employee', include: [{model: models.Employee,as: 'Owner', attributes: ['id','name']},
			 {model: models.Role, attributes: ['name']}]}]})
		console.log(departmentDetail)
		res.status(200).json(departmentDetail)


	}catch(err){
		console.log(err)
		next(err)
	}

});
router.post('/removeEmployeeRoom', async (req, res, next)=> {
	try {
		let removeItem = req.body
		if(!removeItem.idEmployee){
			throw new Error("ID Employee doesnot exist")
		}

		let employee = await models.Employee.findByPk(removeItem.idEmployee)
		if(!employee){
			throw new Error("Notfound Employee")
		}

		if(employee.departmentId!== removeItem.idRoom){
			throw new Error("Employee is not in the Department")
		}
        let room = await models.Department.findByPk(removeItem.idRoom)
		await models.Employee.update({
			departmentId: null,
			employeeRoleId: null,
		}, {
			where: {id: removeItem.idEmployee}
		})
		if(room.managerId === employee.id){
			await models.Department.update({
				managerId: null,
			},{
				where: {id: removeItem.idRoom}
			})	
		}
		const departmentDetail = await models.Department.findOne({where: { id: removeItem.idRoom}, 
			include : [{model: models.Employee, as: 'Owner', attributes: ['id','name']}, {model: models.Employee, as: 'Manager', attributes: ['id','name']}, 
			{model: models.Employee, as: 'Employee', include: [{model: models.Employee,as: 'Owner', attributes: ['id','name']},
			 {model: models.Role, attributes: ['name']}]}]})
		console.log(departmentDetail)
		res.status(200).json(departmentDetail)


	}catch(err){
		console.log(err)
		next(err)
	}

});
///////////////////////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {
	let user = req.user
	if(user.isAdmin){
		next()
	}else{
		throw new Error("Access denied!")
	}	
})
///////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/create', async (req, res, next) => {
	try {
		if(req.body.name ==" " || req.body.email == " " || req.body.password == " "){
			throw new Error('Missed name, email or password')
		}
		if(req.body.isAmin === null){
			throw new Error('isAmin is not defined')
		}
		if(req.body.isAdmin === false && (!req.body.employeeRoleId || !req.body.departmentId)){
			throw new Error("Role or Department is not defined")
		}
		let department = await models.Department.findByPk(req.body.departmentId)
		let role = await models.Role.findByPk(req.body.employeeRoleId)
		if(!role|| !department){
			throw new Error("Role or Department does not exist")
		}
		let newEmployee = {...req.body, ownerId: req.user.id};
		let employee = await models.Employee.create(newEmployee);
		let  employeeDetail = await models.Employee.findByPk(employee.id, {include : 
			[{model: models.Employee,as: 'Owner', attributes: ['name']}, {model: models.Role, attributes: ['name']}, 
			{model: models.Department, attributes:['name']}]})
		res.status(200).json(employeeDetail)
	}
	catch (err){
		console.log(err)
		next(err)
	}
    
});

router.post('/updateEmployee', async (req, res, next)=> {
	let updatedEmployee = req.body.item
	console.log(updatedEmployee)
	if(!req.body.item.id){
		throw new Error("ID does not defined!")
	}
	try {
		await models.Employee.update({
			name: updatedEmployee.name,
			address: updatedEmployee.address,
			idCard: updatedEmployee.idCard,
			phoneNumber: updatedEmployee.phoneNumber,
			email: updatedEmployee.email,
			password: updatedEmployee.password,
			isAdmin: updatedEmployee.isAdmin,
			employeeRoleId: updatedEmployee.employeeRoleId,
			departmentId: updatedEmployee.departmentId,
			ownerId: req.user.id
		}, {where: { id: updatedEmployee.id}});
		let userDetail = await models.Employee.findByPk(updatedEmployee.id, {include : 
			[{model: models.Employee,as: 'Owner', attributes: ['name']}, {model: models.Role, attributes: ['name']}, 
			{model: models.Department, attributes:['name']}]} )
		//console.log(userDetail)
		res.status(200).json(userDetail)
	}catch(err){
		console.log(err)
		next(err)
	}
});
router.post('/destroy', async (req, res, next) => {
	let idEmployee = req.body.id
	if(!idEmployee){
		throw new Error("ID is not defined!")
	}
	await models.Employee.destroy({where: {id: idEmployee}})
	res.status(200).json({
		message: "OK"
	})

})

module.exports = router;
