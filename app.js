var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('config');
var sessionStore = require('lib/sessionStore');
var errors = require('errors');

var index = require('routes/index');
var login = require('routes/login');
var logout = require('routes/logout');
var signup = require('routes/signup');
var profile = require('routes/profile');
var article = require('routes/article');

var app = express();

// view engine setup
app.engine('ejs', require("ejs-locals"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  cookie: config.get('session').cookie,
  name: config.get('session').name,
  secret: config.get('session').secret,
  resave: config.get('session').resave,
  saveUninitialized: config.get('session').saveUninitialized,
  store: sessionStore
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));

app.use('/', index );
app.use('/index', index );
app.use('/login', login );
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/profile', profile);
app.use('/article', article);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      if (err instanceof errors.HttpError) {
          res.sendHttpError(err);
      } else {
          res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: err
          });
      }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
      error: null
  });
});


module.exports = app;
