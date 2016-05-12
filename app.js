'use strict';
var React = require('react');
var router = require('react-router');
var ReactDOMServer = require('react-dom/server');
var match = router.match;
var RouterContext = router.RouterContext;
var routes = require('frontend/routes');
var historyMemory  = require('history').createMemoryHistory();
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');
var flexApp = require('frontend/app');
var loadData = require('frontend/actions/loadDataActions').loadData;
var serialize = require('serialize-javascript');
var LoginService = require('frontend/services/login');
var LoadUserService = require('frontend/services/loadUser');
var LoadFeedArticles = require('frontend/services/loadFeedArticles');
var fetchrPlugin = flexApp.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(LoginService);
fetchrPlugin.registerService(LoadUserService);
fetchrPlugin.registerService(LoadFeedArticles);

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
var _ = require('underscore');

/*var index = require('routes/index');
var profile = require('routes/profile');
var comment = require('routes/comment');*/
var login = require('routes/authentication');
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

app.use('', express.static(path.join(__dirname, 'public')));
app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));

/*app.use('/', index );
app.use('/index', index );
app.use('/authentication', login );
app.use('/profile', profile);
app.use('/comment', comment);*/
app.use('/api/authentication', login );
app.use('/api/article', article);


app.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

app.use(function(req, res, next){
    var location = historyMemory.createLocation(req.path);
    match({ routes: routes, location: location },
        function(error, redirectLocation, renderProps) {
            if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }
            else if (renderProps) {
                var context = flexApp.createContext({ req: req });

                context.executeAction(loadData, {}, function (err) {
                    if (err) {
                        if (err.statusCode && err.statusCode === 404) {
                            return next();
                        }
                        else {
                            return next(err);
                        }
                    }
                    var exposed = 'window.App=' + serialize(flexApp.dehydrate(context)) + ';';
                    var markupElement = React.createElement(
                        FluxibleComponent,
                        {context: context.getComponentContext()},
                        React.createElement(RouterContext, renderProps));

                    res.render("./page",
                        {
                            appHtml: ReactDOMServer.renderToStaticMarkup(markupElement),
                            appState: exposed
                        }
                    );
                });
            } else {
                next();
            }
        }
    );
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
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

app.locals.NODE_ENV = process.env.NODE_ENV;

module.exports = app;
