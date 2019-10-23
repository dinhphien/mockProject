var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var cors = require('cors')

var indexRouter = require('./routes/index');
var employeesRouter = require('./routes/employees');
var rolesRouter = require('./routes/roles');
var assetTypesRouter = require('./routes/assetTypes');
var purposesRouter = require('./routes/purposes');
var departmentsRouter = require('./routes/departments');
var assetsRouter = require('./routes/assets');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors())
app.options('*', cors())

require('./middlewares/passport.js')

app.use('/', indexRouter);
app.use('/employees',passport.authenticate('jwt', { session : false }), employeesRouter);
app.use('/roles', passport.authenticate('jwt', { session : false }), rolesRouter);
app.use('/assetTypes', passport.authenticate('jwt', { session : false }), assetTypesRouter);
app.use('/purposes', passport.authenticate('jwt', { session : false }), purposesRouter);
app.use('/departments', passport.authenticate('jwt', { session : false }), departmentsRouter);
app.use('/assets', passport.authenticate('jwt', { session : false }), assetsRouter);




// require('./routes/index')(app, passport)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //console.log("in err1")
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // console.log("in err2")
  // console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
  	error: err.message
  });
  console.log(err)
  //res.render('error');
});

module.exports = app;
