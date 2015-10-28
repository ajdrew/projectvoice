module.exports = function(app) {

  // mongodb
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  // Main navigation page
  app.get('/lms/admin', function(req, res){

      var listData = function(err, collection) {
          collection.find().toArray(function(err, results) {
            var listData2 = function(err, collection2) {
              collection.find().toArray(function(err, results2) {
                res.render('lms-admin.html', { layout : false , 'title' : 'Amway.voice', 'results' : results , "results2" : results2 });
              });
            };
          });
        }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('lmsadmintype', listData);
          //Client.close();
      });

      var Client2 = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client2.open(function(err, pClient) {
          Client2.collection2('lmsadminaccess', listData2);
          //Client.close();
      });

  })

  // DB - CRUD - TYPE
  app.post('/lms/admin/type/save', function(req, res){
      console.log(req.body);
      var data = {'lmsadmintype' : req.body.lmsadmintype };
      var insertData = function(err, collection) {
          collection.insert(data);
      }
      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('lmsadmintype', insertData);
          Client.close();
      });

      res.redirect('/lms/admin');
  });

  app.get('/lms/admin/type/delete/:id', function(req, res){
      var ObjectID = require('mongodb').ObjectID;

      var removeData = function(err, collection) {
          var chosenId = new ObjectID(req.params.id);
          collection.remove({'_id' : chosenId});
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('lmsadmintype', removeData);
          //Client.close();
      });
      res.redirect('/lms/admin');
  });

  // DB - CRUD - TYPE
  app.post('/lms/admin/access/save', function(req, res){
      console.log(req.body);
      var data = {'lmsadminaccess' : req.body.lmsadminaccess };
      var insertData = function(err, collection) {
          collection.insert(data);
      }
      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('lmsadminaccess', insertData);
          Client.close();
      });

      res.redirect('/lms/admin');
  });

  app.get('/lms/admin/access/delete/:id', function(req, res){
      var ObjectID = require('mongodb').ObjectID;

      var removeData = function(err, collection) {
          var chosenId = new ObjectID(req.params.id);
          collection.remove({'_id' : chosenId});
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('lmsadminaccess', removeData);
          //Client.close();
      });
      res.redirect('/lms/admin');
  });



}
