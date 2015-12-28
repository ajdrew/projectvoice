module.exports = function(app) {

  // mongodb
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  app.get('/login', function(req, res, next) {
    res.render('authorization/login.html', {
      layout: false,
      'title': 'Amway.voice',
    });
  });

  app.post('/login', function(req, res, next) {
    // you might like to do a database look-up or something more scalable here
    if (req.body.username && req.body.username === 'ccmadministrator' && req.body.password && req.body.password === 'iptel01') {
      req.session.authenticated = true;
      res.redirect('/lms');
    } else {
      res.redirect('/unauthorized');
    }
  });

  app.get('/logout', function(req, res, next) {
    delete req.session.authenticated;
    res.redirect('/');
  });

  app.get('/unauthorized', function(req, res) {
    res.render('authorization/login-retry.html', {
      layout: false,
      'title': 'Amway.voice'
    });
  });

}
