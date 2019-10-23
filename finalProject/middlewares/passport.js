const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const model = require('../models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


passport.use('login', new localStrategy({
	usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
	try{
		const user = await model.Employee.findOne({ where: { email: email }, include: [{model: model.Role}, {model: model.Department}]})
		if(!user){
			return done(null, false, { message : 'User not found'});
		}
		const validate = user.isValidPassword(password);
		if(!validate){
			return done(null, false, { message : 'Wrong Password'});
		}
		return done(null, user, { message : 'Logged in Successfully'});

	} catch (err){
		done(err)
	}

}))
var optionJWTStrategy = {};
optionJWTStrategy.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
optionJWTStrategy.secretOrKey = "key_secret";

passport.use(new JwtStrategy(optionJWTStrategy, async (jwt_payload, done) => {
	try {
		let idUser = jwt_payload.user.id
		let user = await model.Employee.findByPk(idUser)
		if(!user){
			return done(err)
		}
		return done(null, jwt_payload.user)
	} catch (err){
		console.log(err)
		return done(err)
	}

	

}))


