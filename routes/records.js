module.exports = function(app) {

  // DB CRUD - record
  app.get('/add_record', function(req, res){
      res.render('add.html', { layout : false , 'title' : 'Amway.voice'});
  })

  app.post('/save_record', function(req, res){
      console.log(req.body);
      var data = {'first_name' : req.body.first_name , 'last_name' : req.body.last_name, 'email' : req.body.email, 'password' : req.body.pwd };
      var insertData = function(err, collection) {
          collection.insert(data);
      }
      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('users', insertData);
          Client.close();
      });

      res.redirect('/');
  });

  app.get('/edit_record/:id', function(req, res){

      var ObjectID = require('mongodb').ObjectID;

      var listData = function(err, collection) {

          var chosenId = new ObjectID(req.params.id);
          collection.findOne({'_id' : chosenId} , function(err, results) {
              console.log(results);
              res.render('edit.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('users', listData);
          //Client.close();
      });

  });

  app.post('/update_record', function(req, res){
      console.log(req.body);

      var ObjectID = require('mongodb').ObjectID;

      var data = {'first_name' : req.body.first_name , 'last_name' : req.body.last_name, 'email' : req.body.email };
      var updateData = function(err, collection) {
          var chosenId = new ObjectID(req.body.id);
          collection.update({"_id": chosenId}, {$set: data });
      }
      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('users', updateData);
          Client.close();
      });

      res.redirect('/');
  });

  app.get('/delete_record/:id', function(req, res){
      var ObjectID = require('mongodb').ObjectID;

      var removeData = function(err, collection) {
          var chosenId = new ObjectID(req.params.id);
          collection.remove({'_id' : chosenId});
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('users', removeData);
          //Client.close();
      });
      res.redirect('/');
  });
  // END - DB CRUD - record
}
