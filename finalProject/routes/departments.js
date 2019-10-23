var express = require('express');
var router = express.Router();
var models  = require('../models');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var checkAdmin = (req, res, next) => {
	let user = req.user
	if(user.isAdmin){
		next()
	}else{
		throw new Error("Access denied!")
	}	
};

router.get('/read', async (req, res, next) => {
	try {
		let listDepartments = await models.Department.findAll({ include : [{model: models.Employee, as: 'Owner', attributes: ['name']},
			{model: models.Employee, as: 'Manager', attributes: ['name']}]})
		console.log(listDepartments)
		res.status(200).json(listDepartments)
	} catch(err){
		console.log(err)
		next(err)
	}
});

router.use(async (req, res, next) => {
	let idRoom = req.param('departmentId') || req.body.id
	let user = req.user
	if(!idRoom){
		throw new Error("Department ID doesnot exist!")
	}
	room = await models.Department.findByPk(idRoom)
	if(!room){
		throw new Error("Department doesnot exist!")
	}
	
	if(user.isAdmin || room.id == user.departmentId){
		req.room = room
		next()
	}else{
		throw new Error("Access denied!")
	}

})

router.get('/readDetailEmployee', async (req, res, next) => {
	let departmentId = req.param('departmentId');
	try{
		let departmentDetail = await models.Department.findOne({where: { id: departmentId}, 
			include : [{model: models.Employee, as: 'Owner', attributes: ['id','name']}, {model: models.Employee, as: 'Manager', attributes: ['id','name']}, 
			{model: models.Employee, as: 'Employee', include: [{model: models.Employee,as: 'Owner', attributes: ['id','name']},
			 {model: models.Role, attributes: ['name']}]}]})
		res.status(200).json(departmentDetail)
	} catch(err){
		console.log(err)
		next(err)
	}
});

router.use((req, res, next) => {
	let user = req.user
	let room = req.room
	if(user.isAdmin){
		next()
	}else if(user.id == room.managerId){
		next()
	}else{
		throw new Error("Access denied!")
	}
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/updateBasicInfor', async(req, res, next) => {
	let updatedRoom = req.body;
	try {
		if(!updatedRoom.id){
			throw new Error('Department ID is empty')
		}
		let manager = await models.Employee.findByPk(updatedRoom.managerId)
		if(manager.departmentId !== updatedRoom.id){
			throw new Error("Employee is out of Department")
		}
		await models.Department.update({
			name: updatedRoom.name,
			managerId: updatedRoom.managerId
		}, {
			where: {id: updatedRoom.id},
			returning: true, 
			plain: true
		});
		 let departmentDetail = await models.Department.findByPk(updatedRoom.id, {
		 	include : [{model: models.Employee, as: 'Owner', attributes: ['id','name']}, {model: models.Employee, as: 'Manager', attributes: ['id','name']}, 
			{model: models.Employee, as: 'Employee', include: [{model: models.Employee,as: 'Owner', attributes: ['id','name']},
			 {model: models.Role, attributes: ['name']}]}]})
		res.status(200).json(departmentDetail)
	} catch (err){
		console.log(err)
		next(err)
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/create',checkAdmin, async (req, res, next) => {
	try {
		if(!req.body.name || req.body.name === " "){
			throw new Error('Name property is empty')
		}
		let newDepartment = {...req.body, ownerId: req.user.id};
		let department = await models.Department.create(newDepartment);
		let departmentDetail = await models.Department.findByPk(department.id, {include : [{model: models.Employee, as: 'Owner', attributes: ['name']},
			{model: models.Employee, as: 'Manager', attributes: ['name']}]})
		res.status(200).json(departmentDetail)
	}
	catch (err){
		console.log(err)
		next(err)
	}
    
});
router.post('/destroy', checkAdmin, async (req, res, next) => {
	let IdRoom = req.body.idRoom
	try{
		if(!IdRoom){
			throw new Error("Department ID doesnot exist!")
		}
		let room = await models.Department.findByPk(IdRoom)
		if(!room){
			throw new Error("Department doesnot exist!")
		}
		await models.Employee.update({
			employeeRoleId: null,
			departmentId: null,
		},{
			where: { departmentId: IdRoom }
		})
		await models.Department.destroy({where: {id: IdRoom}})
		res.status(200).json({
			message: "OK"
		})
	} catch(err){
		console.log(err)
		next(err)
	}
});

module.exports = router;
