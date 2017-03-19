var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var helmet = require('helmet');

var mongoose = require('mongoose');
var passport = require('passport');

var index = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');

var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, './../client'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// connect to MongoDB database
// fix for deprecated mongoose promise
mongoose.Promise = global.Promise;
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log('Could not connect to MongoDB');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// sets appropriate HTTP headers to prevent well-known web vulnerabilities
app.use(helmet());

app.use(require('express-session')({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}));

// initialize passport and set passport to use jwt
app.use(passport.initialize());
require('./middleware/auth')();

// set root path to /client
app.use(express.static(path.join(__dirname, '../client')));

// used for routing purposes
app.use('/dashboard', dashboard);
app.use('/users', users);
app.use('/', index);



app.use('/assets', express.static(__dirname + '../client/assets'));
app.use('/build',  express.static(__dirname + '../client/build'));

// redirects to frontend react 
router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './../../client', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // console.log("req", req);
  // console.log("res", res);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("error object", err);
  console.log("error", err.message);


  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
