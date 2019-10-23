var express = require('express');
var router = express.Router();
var models  = require('../models');


//////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/read', async (req, res, next) => {
	try {
		let listPurposes = await models.Purpose.findAll({ include : [{model: models.Employee, attributes: ['name']}]})
		res.status(200).json(listPurposes)
	} catch(err){
		console.log(err)
		next(err)
	}
});
router.get('/readDetail', async (req, res, next) => {
	let idPurpose = req.param('id')
	console.log(idPurpose)
	try{
		const purposeDetail = await models.Purpose.findOne({where: { id: idPurpose}, include : [{model: models.Employee, attributes: ['name']}]})
		console.log(purposeDetail)
		res.status(200).json(purposeDetail)
	} catch(err){
		console.log(err)
		next(err)
	}
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

router.use((req, res, next) => {
	let user = req.user
	if(user.isAdmin){
		next()
	}else{
		throw new Error("Access denied!")
	}	
})

////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/create', async (req, res, next) => {
	try {
		if(!req.body.name || req.body.name === " "){
			throw new Error('Name property is empty')
		}
		let newPurpose = {...req.body, ownerId: req.user.id};
		let purpose = await models.Purpose.create(newPurpose);
		let purposeDetail = await models.Purpose.findByPk(purpose.id, {include : [{model: models.Employee, attributes: ['name']}]})
		res.status(200).json(purposeDetail)
	}
	catch (err){
		console.log(err)
		next(err)
	}
    
});

router.post('/update', async(req, res, next) => {
	let updatedPurpose = req.body;
	try {
		if(!req.body.name || req.body.name === " "){
			throw new Error('Name property is empty')
		}
		await models.Purpose.update({
			name: updatedPurpose.name
		}, {
			where: {id: updatedPurpose.id},
			returning: true, 
			plain: true
		});
		let purposeDetail = await models.Purpose.findByPk(updatedPurpose.id, {include : [{model: models.Employee, attributes: ['name']}]})
		res.status(200).json(purposeDetail)
	} catch (err){
		console.log(err)
		next(err)
	}
});
router.post('/delete', async(req, res, next ) => {
	let idPurpose = req.body.id
	try {
		let result = await models.Purpose.destroy({where: {id: idPurpose}})
		res.status(200).json(result)
	} catch (err){
		console.log(err)
		next(err)
	}
})

module.exports = router;