/**
 * Module dependencies.
 */

var express = require('express'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google').Strategy,
  routes = require('./routes'),
  http = require('http');

// template engine
var hbs = require('hbs');

// mongodb
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GoogleStrategy within Passport.
passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:80/auth/google/return',
    realm: 'http://localhost:80/'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

app.configure(function() {
  app.set('port', process.env.PORT || 80);

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  app.engine('html', require('hbs').__express);
  app.set('views', __dirname + '/views/html');
  app.set('view engine', 'html');

  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'jade');

});

app.configure('development', function() {
  app.use(express.errorHandler());
});


// EXPRESS ROUTING
// NAVIGATION - INDEX
app.get('/', function(req, res) {
  res.render('index.html', {
    layout: false,
    'title': 'Amway.voice'
  });
})

// INCLUDE - Extensions DB app routes
var routingextensions = require('./routes/extensions.js')(app);
// var routingextensions = require('./routes/extensionsjade.js')(app);

// INCLUDE - LMS DB app routes
var routingextensions = require('./routes/lms.js')(app);

// INCLUDE - LMS-admin DB app routes
var routingextensions = require('./routes/lms-admin.js')(app);




// END - EXPRESS ROUTING

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
