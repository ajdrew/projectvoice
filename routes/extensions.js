module.exports = function(app) {

  // mongodb
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  // Main navigation page
  app.get('/extensions', function(req, res){
    res.render('extensions/extensions.html', { layout : false , 'title' : 'Amway.voice' });
  })

  app.get('/extensions/show', function(req, res){
      console.log(req.body);
      var listData = function(err, collection) {
          collection.find().toArray(function(err, results) {
              res.render('extensions/extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
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
              res.render('extensions/extensions-edit.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
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
  app.get('/extensions/filter/USNS41', function(req, res){

    var listData = function(err, collection) {
        collection.find({place:"USNS41"}).toArray(function(err, results) {
            res.render('extensions/extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
        });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
        Client.collection('extensions', listData);
        //Client.close();
      });
    });

  app.get('/extensions/filter/USBP02', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"USBP02"}).toArray(function(err, results) {
              res.render('extensions/extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });

  app.get('/extensions/filter/BRCM01', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"BRCM01"}).toArray(function(err, results) {
              res.render('extensions/extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });

  app.get('/extensions/filter/CACM01-PUB', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"CACM01-PUB"}).toArray(function(err, results) {
              res.render('extensions/extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });

  app.get('/extensions/filter/CONS01', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"CONS01"}).toArray(function(err, results) {
              res.render('extensions/extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });

  app.get('/extensions/filter/CRNS01', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"CRNS01"}).toArray(function(err, results) {
              res.render('extensions/extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });

  app.get('/extensions/filter/MXCM01', function(req, res){

      var listData = function(err, collection) {
          collection.find({place:"MXCM01"}).toArray(function(err, results) {
              res.render('extensions/extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
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
              res.render('extensions/extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
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
          collection.find({$or:[{extension: new RegExp(search, "i")},{whole_name: new RegExp(search, "i")},{user_id: new RegExp(search, "i")}]}).toArray(function(err, results) {
              res.render('extensions/extensions-show.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }
      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('extensions', listData);
          //Client.close();
        });
  });
}
