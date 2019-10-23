var express = require('express');
var router = express.Router();
var models  = require('../models');

////////////////////////////////////////////////////////////////////////////////////////////
router.get('/read', async (req, res, next) => {
	try {
		let listAssetTypes = await models.AssetType.findAll({ include : [{model: models.Employee, attributes: ['name']}]})
		console.log(listAssetTypes)
		res.status(200).json(listAssetTypes)
	} catch(err){
		console.log(err)
		next(err)
	}
});
router.get('/readDetail', async (req, res, next) => {
	let idAssetType = req.param('id')
	console.log(idAssetType)
	try{
		const assetTypeDetail = await models.AssetType.findOne({where: { id: idAssetType}, include : [{model: models.Employee, attributes: ['name']}]})
		console.log(assetTypeDetail)
		res.status(200).json(assetTypeDetail)
	} catch(err){
		console.log(err)
		next(err)
	}
});
////////////////////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {
	let user = req.user
	if(user.isAdmin){
		next()
	}else{
		throw new Error("Access denied!")
	}	
})
///////////////////////////////////////////////////////////////////////////////////////////////

router.post('/create', async (req, res, next) => {
	try {
		if(!req.body.name || req.body.name === " "){
			throw new Error('Name property is empty')
		}
		let newAssetType = {...req.body, ownerId: req.user.id};
		let assetType = await models.AssetType.create(newAssetType);
		let assetTypeDetail = await models.AssetType.findByPk(assetType.id, {include : [{model: models.Employee, attributes: ['name']}]})
		res.status(200).json(assetTypeDetail)
	}
	catch (err){
		console.log(err)
		next(err)
	}
    
});

router.post('/update', async(req, res, next) => {
	let updatedAssetType = req.body;
	try {
		if(!req.body.name || req.body.name === " "){
			throw new Error('Name property is empty')
		}
		await models.AssetType.update({
			name: updatedAssetType.name
		}, {
			where: {id: updatedAssetType.id},
			returning: true, 
			plain: true
		});
		let assetTypeDetail = await models.AssetType.findByPk(updatedAssetType.id, {include : [{model: models.Employee, attributes: ['name']}]})
		res.status(200).json(assetTypeDetail)
	} catch (err){
		console.log(err)
		next(err)
	}
});
router.post('/delete', async(req, res, next ) => {
	let idAssetType = req.body.id
	try {
		let result = await models.AssetType.destroy({where: {id: idAssetType}})
		res.status(200).json(result)
	} catch (err){
		console.log(err)
		next(err)
	}
})


module.exports = router;