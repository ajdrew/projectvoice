module.exports = function(app) {

  // mongodb
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  // Main navigation page
  app.get('/lms/admin', function(req, res){

      var listData = function(err, collection) {
          collection.find().toArray(function(err, results) {
              res.render('lms-admin.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('lmsadmintype', listData);
          //Client.close();
      });

  })

  // DB - CRUD
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

  app.get('/lms/admin/type/edit/:id', function(req, res){

      var ObjectID = require('mongodb').ObjectID;

      var listData = function(err, collection) {

          var chosenId = new ObjectID(req.params.id);
          collection.findOne({'_id' : chosenId} , function(err, results) {
              console.log(results);
              res.render('extensions-edit.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('lmsadmintype', listData);
          //Client.close();
      });

  });

  app.post('/lms/admin/type/update', function(req, res){
      console.log(req.body);

      var ObjectID = require('mongodb').ObjectID;

      var data = {'extension' : req.body.extension , 'user_id' : req.body.user_id, 'whole_name' : req.body.whole_name, 'email' : req.body.email, 'place' : req.body.place, 'phone_number_jabber' : req.body.phone_number_jabber, 'did' : req.body.did };
      var updateData = function(err, collection) {
          var chosenId = new ObjectID(req.body.id);
          collection.update({"_id": chosenId}, {$set: data });
      }
      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('lmsadmintype', updateData);
          Client.close();
      });

      res.redirect('/lsm/admin');
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

  // DB - SEARCH
  app.post('/extensions/search', function(req, res){
      console.log(req.body);
      var search = req.body.search;
      //console.log(echo $search);
      //var search = 'MX';
      var listData = function(err, collection) {
          collection.find({$or:[{extension: new RegExp(search)},{whole_name: new RegExp(search)}]}).toArray(function(err, results) {
              res.render('extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }
      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });
}
