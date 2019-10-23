var express = require('express');
var router = express.Router();
var passport = require('passport')
var jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");
var createAbilities = require('../middlewares/abilities')
const employeeModel = require('../models').Employee
const roleModel = require('../models').Role
const departmentModel = require('../models').Department
const models = require('../models')
/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    res.status(200).json({
      message: "OK"
    })

  } catch(err){
    next(err)
  }
});
router.get('/handOverResolve', async function (req, res, next){
  try{
    let idToken = req.query.id
    let token = req.query.token
    tokenjwt = await models.Token.findByPk(idToken)
    if(!tokenjwt || tokenjwt.token!==token){
      throw new Error("Token is expired")
    }
    await models.Token.destroy({where: {id: idToken}})
    let decoded = await jwt.verify(token, "key_secret")
    let itemHandOver = decoded.item
    await models.Asset.update({
      employeeManagedId: itemHandOver.managedEmployeeId,
      status: "In use",
      confirm: "OK"
    }, {
      where: {id: itemHandOver.assetId}
    })
    res.end("<h1>Successful</h1>")

  }catch (err){
     res.end("<h1>Token is expired</h1>")
  }

})
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {  
  	try {
      if(err || !user){
        const error = new Error(info.message)
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        let body = {email: user.email, id: user.id, isAdmin: user.isAdmin, roleId: null, departmentId: null, isDepartmentManager: null}
        if(user.Role){
          body.roleId = user.Role.id
          body.departmentId = user.Department.id
          if(user.id === user.Department.managerId ){
            body.isDepartmentManager = true
          }else{
            body.isDepartmentManager = false
          }
        }
    	  const token = jwt.sign({user: body}, "key_secret")

  		return res.json({
  			user,
  			token
  		})
      });    
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
router.post('/test', function(req, res, next) {
  console.log(req.body)
  console.log("In test api")
  console.log(req.user)
  res.json({
    message: 'test ok'
  })
});

module.exports = router;
