module.exports = function(app) {

  // mongodb
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  // EXPRESS ROUTING - FILE UPLOAD
  app.get('/file/upload', function(req, res) {
    res.render('fileupload/basic-plus.html', {
      layout: false,
      'title': 'Amway.voice'
    });
  })

}
