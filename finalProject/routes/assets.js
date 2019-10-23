var express = require('express');
var router = express.Router();
var models  = require('../models');
var jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");


///////////////////////////////////////////////////////////////////////////////////////////
var checkHandingOverAbilities = async (req, res, next) => {
	try {
		let user = req.user
		let idAsset = req.body.assetId
		let asset = await models.Asset.findByPk(idAsset, { include : [{model: models.Employee, as: 'Manager', include: [{ model: models.Department}]}]})
		console.log(asset)
		if(!asset){
			throw new Error("Asset doesnot exist")
		}
		if(user.isAdmin){
			next()
		}
		if(user.isDepartmentManager || user.departmentId == asset.Manager.Department.id){
			next()
		}else{
			throw new Error("Access denied")
		}

	}catch(err){

	}
	
}
router.get('/read', async (req, res, next) => {
	try {
		let listAssets = await models.Asset.findAll({include : [{model: models.Employee, as: 'Owner', attributes: ['name']},
			{model: models.Employee, as: 'Manager', attributes: ['name']}, {model: models.AssetType, attributes: ['name']},
			{model: models.Purpose, attributes: ['name']}]})
		console.log(listAssets)
		res.status(200).json(listAssets)
	} catch(err){
		console.log(err)
		next(err)
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/handingOverSendEmail', checkHandingOverAbilities, async (req, res, next) => {
	try {
		let itemHandOver = req.body
		if(!itemHandOver.assetId || !itemHandOver.managedEmployeeId){
			throw new Error("assetId or managedEmployeeId is not defined!")
		}
		let managedEmployee = await models.Employee.findByPk(itemHandOver.managedEmployeeId)
		if(!managedEmployee){
			throw new Error(" Managed Employee does not exist!")
		}
		let asset = await models.Asset.findByPk(itemHandOver.assetId)
		if(!asset || asset.status ==="Waiting process"){
			throw new Error("Asset doesnot exist! or is in another handing over process")
		}
	    var smtpTransport = nodemailer.createTransport({
	        service: "Gmail",
	        auth: {
	            user: "dinhquyphien1997@gmail.com",
	            pass: "phien02061997"
	        }
	    });
	    let tokenjwt = jwt.sign({item: itemHandOver}, "key_secret")
	    let newToken = await models.Token.create({
	    	token: tokenjwt
	    })
	    var link = 'http://localhost:3000/handOverResolve?id='+ newToken.id+ "&token=" + newToken.token
	    var  mailOptions = {
	      from: 'dinhquyphien1997@gmail.com', // sender address
	      to: '',
	      subject: 'The verified email for handing assets over', // Subject line
	      html : "Hello,<br> Please Click on the link below to confirm that you're handed the assets over.<br><a href="+link+">Click here to verify</a>"
	    };
	    mailOptions.to = managedEmployee.email

	    await smtpTransport.sendMail(mailOptions)
	    await models.Asset.update({
	    	status: "Waiting process",
	    	note: itemHandOver.comment,
	    }, {
	    	where: {id: asset.id}
	    })
	    let updatAsset = await models.Asset.findByPk(itemHandOver.assetId, {include : [{model: models.Employee, as: 'Owner', attributes: ['name']},
			{model: models.Employee, as: 'Manager', attributes: ['name']}, {model: models.AssetType, attributes: ['name']},
			{model: models.Purpose, attributes: ['name']}]})
	    console.log(updatAsset)
		res.status(200).json(updatAsset)
	}
	catch (err){
		console.log(err)
		next(err)
	}
    
});
///////////////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {
	let user = req.user
	if(user.isAdmin){
		next()
	}else{
		throw new Error("Access denied!")
	}	
})
///////////////////////////////////////////////////////////////////////////////////////////
router.post('/create', async (req, res, next) => {
	try {
		if(req.body.assetCode === " "){
			throw new Error('assetCode is not defined!')
		}
		let newAsset = {...req.body, employeeOwnerId: req.user.id, employeeManagedId: req.user.id };
		let asset = await models.Asset.create(newAsset);
		let assetDetail = await models.Asset.findByPk(asset.id, {include : [{model: models.Employee, as: 'Owner', attributes: ['name']},
			{model: models.Employee, as: 'Manager', attributes: ['name']}, {model: models.AssetType, attributes: ['name']},
			{model: models.Purpose, attributes: ['name']}]})
		res.status(200).json(assetDetail)
	}
	catch (err){
		console.log(err)
		next(err)
	}
    
});
router.post('/update', async(req, res, next) => {
	let updatedAsset = req.body.item;
	try {
		await models.Asset.update({
			assetCode: updatedAsset.assetCode,
            assetTypeId:updatedAsset.assetTypeId,
            assetInfor: updatedAsset.assetInfor,
            assetPurposeId: updatedAsset.assetPurposeId,
            status: updatedAsset.status,
		}, {
			where: {id: updatedAsset.id},
			returning: true, 
			plain: true
		});
		let assetDetail = await models.Asset.findByPk(updatedAsset.id, {include : [{model: models.Employee, as: 'Owner', attributes: ['name']},
			{model: models.Employee, as: 'Manager', attributes: ['name']}, {model: models.AssetType, attributes: ['name']},
			{model: models.Purpose, attributes: ['name']}]})
		res.status(200).json(assetDetail)
	} catch (err){
		console.log(err)
		next(err)
	}
});
router.post('/delete', async(req, res, next ) => {
	let idAsset = req.body.id
	try {
		let result = await models.Asset.destroy({where: {id: idAsset}})
		res.status(200).json({
			message: "OK"
		})
	} catch (err){
		console.log(err)
		next(err)
	}
});


module.exports = router;
