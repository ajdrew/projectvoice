module.exports = function(app) {

  // mongodb
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  app.get('/authorization/login', function(req, res, next) {
    res.render('authorization/login.html', {
      layout: false,
      'title': 'Amway.voice',
    });
  });

  app.post('/authorization/login', function(req, res, next) {
    // you might like to do a database look-up or something more scalable here
    if (req.body.username && req.body.username === 'ccmadministrator' && req.body.password && req.body.password === 'iptel01') {
      req.session.authenticated = true;
      res.redirect('/lms');
    } else {
      res.redirect('/authorization/unauthorized');
    }
  });

  app.get('/authorization/logout', function(req, res, next) {
    delete req.session.authenticated;
    res.redirect('/');
  });

  app.get('/authorization/unauthorized', function(req, res) {
    res.render('authorization/unauthorized.html', {
      layout: false,
      'title': 'Amway.voice'
    });
  });

}
