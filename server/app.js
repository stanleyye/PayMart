var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');

var mongoose = require('mongoose');
var passport = require('passport');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './../client'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}));

// initialize passport and set passport to use jwt
app.use(passport.initialize());
require('./middleware/auth')();

console.log(path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));

// used for routing purposes
app.use('/', index);
app.use('/users', users);

app.use('/assets', express.static(__dirname + '../client/assets'));
app.use('/build',  express.static(__dirname + '../client/build'));
app.use('/components',  express.static(__dirname + '../client/components'));

// connect to MongoDB database
// fix for deprecated mongoose?
mongoose.Promise = global.Promise;
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log('Could not connect to MongoDB');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
