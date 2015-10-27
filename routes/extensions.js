module.exports = function(app) {

  // mongodb
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  // Main navigation page
  app.get('/extensions', function(req, res){

      var listData = function(err, collection) {
          collection.find().toArray(function(err, results) {
              res.render('extensions.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
      });

  })

  app.get('/extensions/show', function(req, res){
      console.log(req.body);
      var listData = function(err, collection) {
          collection.find().toArray(function(err, results) {
              res.render('extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
      });

  })

  // DB - CRUD
  app.post('/extensions/save', function(req, res){
      console.log(req.body);
      var data = {'extension' : req.body.extension , 'user_id' : req.body.user_id, 'whole_name' : req.body.whole_name, 'email' : req.body.email, 'place' : req.body.place, 'phone_number_jabber' : req.body.phone_number_jabber, 'did' : req.body.did, 'out_date' : req.body.out_date };
      var insertData = function(err, collection) {
          collection.insert(data);
      }
      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', insertData);
          Client.close();
      });

      res.redirect('extensions');
  });

  app.get('/extensions/edit/:id', function(req, res){
      console.log(req.body);
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
          Client.collection('extensions', listData);
          //Client.close();
      });

  });

  app.post('/extensions/update', function(req, res){
      console.log(req.body);

      var ObjectID = require('mongodb').ObjectID;

      var data = {'extension' : req.body.extension , 'user_id' : req.body.user_id, 'whole_name' : req.body.whole_name, 'email' : req.body.email, 'place' : req.body.place, 'phone_number_jabber' : req.body.phone_number_jabber, 'did' : req.body.did, 'out_date' : req.body.out_date};
      var updateData = function(err, collection) {
          var chosenId = new ObjectID(req.body.id);
          collection.update({"_id": chosenId}, {$set: data });
      }
      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', updateData);
          Client.close();
      });

      res.redirect('extensions');
  });

  app.get('/extensions/delete/:id', function(req, res){
      console.log(req.body);
      var ObjectID = require('mongodb').ObjectID;

      var removeData = function(err, collection) {
          var chosenId = new ObjectID(req.params.id);
          collection.remove({'_id' : chosenId});
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', removeData);
          //Client.close();
      });
      res.redirect('extensions');
  });

  // DB - FILTERS
  app.get('/extensions/filter/ad', function(req, res){

    var listData = function(err, collection) {
        collection.find({place:"AD"}).toArray(function(err, results) {
            res.render('extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
        });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
        Client.collection('extensions', listData);
        //Client.close();
      });
    });

  app.get('/extensions/filter/bp', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"BP"}).toArray(function(err, results) {
              res.render('extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });

  app.get('/extensions/filter/br', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"BR"}).toArray(function(err, results) {
              res.render('extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });

  app.get('/extensions/filter/ca', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"CA"}).toArray(function(err, results) {
              res.render('extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });

  app.get('/extensions/filter/co', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"CO"}).toArray(function(err, results) {
              res.render('extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });

  app.get('/extensions/filter/cr', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"CR"}).toArray(function(err, results) {
              res.render('extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });

  app.get('/extensions/filter/mx', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"MX"}).toArray(function(err, results) {
              res.render('extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });

  app.get('/extensions/filter/open', function(req, res){

      var options = {"limit":1, "sort": "out_date"}

      var listData = function(err, collection) {
          collection.find({whole_name:"OPEN"}, options).toArray(function(err, results) {
              res.render('extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
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
