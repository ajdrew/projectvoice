// Module dependencies
var express = require('express'),
  routes = require('./routes'),
  http = require('http');

// template engine
var hbs = require('hbs');

// mongodb
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

function checkAuth (req, res, next) {
	console.log('checkAuth ' + req.url);

	// don't serve /secure to those not logged in
	// you should add to this list, for each and every secure url
	if (req.url === '/lms' && (!req.session || !req.session.authenticated)) {
		res.render('unauthorized', { status: 403 });
		return;
	}

	next();
}

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 80);

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'example' }));
  app.use(checkAuth);
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
// INCLUDE - Extensions-admin DB app routes
var routingextensions = require('./routes/extensions-admin.js')(app);

// INCLUDE - LMS DB app routes
var routingextensions = require('./routes/lms.js')(app);
// INCLUDE - LMS-admin DB app routes
var routingextensions = require('./routes/lms-admin.js')(app);

// INCLUDE - Authorization app routes
var routingextensions = require('./routes/authorization.js')(app);



// END - EXPRESS ROUTING

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
