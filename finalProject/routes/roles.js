var express = require('express');
var router = express.Router();
var models  = require('../models');




////////////////////////////////////////////////////////////////////////////////////

router.get('/read', async (req, res, next) => {
	try {
		let listRoles = await models.Role.findAll({ include : [{model: models.Employee, attributes: ['name']}]})
		console.log(listRoles)
		res.status(200).json(listRoles)
	} catch(err){
		console.log(err)
		next(err)
	}
});
router.get('/readDetail', async (req, res, next) => {
	let idRole = req.param('id')
	console.log(idRole)
	try{
		const roleDetail = await models.Role.findOne({where: { id: idRole}, include : [{model: models.Employee, attributes: ['name']}]})
		console.log(roleDetail)
		res.status(200).json(role)
	} catch(err){
		console.log(err)
		next(err)
	}
});

/////////////////////////////////////////////////////////////////////////////////////////

router.use((req, res, next) => {
	let user = req.user
	if(user.isAdmin){
		next()
	}else{
		throw new Error("Access denied!")
	}	
})

/////////////////////////////////////////////////////////////////////////////////////////

router.post('/create', async (req, res, next) => {
	try {
		if(!req.body.name || req.body.name === " "){
			throw new Error('Name property is empty')
		}
		let newRole = {...req.body, ownerId: req.user.id};
		let role = await models.Role.create(newRole);
		let roleDetail = await models.Role.findByPk(role.id, {include : [{model: models.Employee, attributes: ['name']}]})
		res.status(200).json(roleDetail)
	}
	catch (err){
		console.log(err)
		next(err)
	}
    
});

router.post('/update', async(req, res, next) => {
	let updatedRole = req.body
	try {
		if(!req.body.name || req.body.name === " "){
			throw new Error('Name or id property is empty')
		}
		await models.Role.update({
			name: updatedRole.name
		},{
			where: {id: updatedRole.id},
			returning: true, 
			plain: true
		});
		let roleDetail = await models.Role.findByPk(updatedRole.id, {include : [{model: models.Employee, attributes: ['name']}]})
		res.status(200).json(roleDetail)
	} catch (err){
		console.log(err)
		next(err)
	}
});
router.post('/delete', async(req, res, next ) => {
	let idRole = req.body.id
	try {
		await models.Employee.update({
			employeeRoleId: null,
			departmentId: null,
		}, {
			where: { employeeRoleId: idRole}
		})
		let result = await models.Role.destroy({where: {id: idRole}})
		res.status(200).json(result)
	} catch (err){
		console.log(err)
		next(err)
	}
});

module.exports = router;
