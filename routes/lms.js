module.exports = function(app) {

  // mongodb
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  // Main navigation page
  app.get('/lms', function(req, res){

      var listData = function(err, collection) {
          collection.find().toArray(function(err, results) {
              res.render('lms.html', { layout : false , 'title' : 'Amway.voice', 'results' : results });
          });
      }

      var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
      Client.open(function(err, pClient) {
          Client.collection('lms', listData);
          //Client.close();
      });

  })

  app.get('/lms/add', function(req, res){


    var type = null;
    var access = null;
    var country = null;
    var contract = null;
    var ucschassis = null;
    var vsphere = null;
    var elm = null;

    var optionstype = {
      "sort": "lmsadminaccess"
    }
    var optionsaccess = {
      "sort": "lmsadminaccess"
    }
    var optionscountry = {
      "sort": "lmsadmincountry"
    }
    var optionsucschassis = {
      "sort": "lmsadminucschassis"
    }
    var optionsvsphere = {
      "sort": "lmsadminvsphere"
    }
    var optionselm = {
      "sort": "lmsadminelm"
    }

    var listDataType = function(err, collection) {
      collection.find({}, optionstype).toArray(function(err, results) {
        if (err) throw err;
        type = results;
        complete();
      });
    }

    var listDataAccess = function(err, collection) {
      collection.find({}, optionsaccess).toArray(function(err, results) {
        if (err) throw err;
        access = results;
        complete();
      });
    }

    var listDataCountry = function(err, collection) {
      collection.find({}, optionscountry).toArray(function(err, results) {
        if (err) throw err;
        country = results;
        complete();
      });
    }

    var listDataContract = function(err, collection) {
      collection.find().toArray(function(err, results) {
        if (err) throw err;
        contract = results;
        complete();
      });
    }

    var listDataUcschassis = function(err, collection) {
      collection.find({}, optionsucschassis).toArray(function(err, results) {
        if (err) throw err;
        ucschassis = results;
        complete();
      });
    }

    var listDataVsphere = function(err, collection) {
      collection.find({}, optionsvsphere).toArray(function(err, results) {
        if (err) throw err;
        vsphere = results;
        complete();
      });
    }

    var listDataElm = function(err, collection) {
      collection.find().toArray(function(err, results) {
        if (err) throw err;
        elm = results;
        complete();
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadmintype', listDataType);
      Client.collection('lmsadminaccess', listDataAccess);
      Client.collection('lmsadmincountry', listDataCountry);
      Client.collection('lmsadmincontract', listDataContract);
      Client.collection('lmsadminucschassis', listDataUcschassis);
      Client.collection('lmsadminvsphere', listDataVsphere);
      Client.collection('lmsadminelm', listDataElm);
    });

    function complete() {
      if (type !== null && access !== null && country !== null && contract !== null && ucschassis !== null && vsphere !== null && elm !== null) {
        res.render('lms-add.html', {
          layout: false,
          'title': 'Amway.voice',
          'Type': type,
          'Access': access,
          'Country': country,
          'Contract': contract,
          'Ucschassis': ucschassis,
          'Vsphere': vsphere,
          'Elm': elm
        });
      }
    }
  })

  // DB - CRUD
  app.post('/save_extension', function(req, res){
      console.log(req.body);
      var data = {'extension' : req.body.extension , 'user_id' : req.body.user_id, 'whole_name' : req.body.whole_name, 'email' : req.body.email, 'place' : req.body.place, 'phone_number_jabber' : req.body.phone_number_jabber, 'did' : req.body.did };
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

      var data = {'extension' : req.body.extension , 'user_id' : req.body.user_id, 'whole_name' : req.body.whole_name, 'email' : req.body.email, 'place' : req.body.place, 'phone_number_jabber' : req.body.phone_number_jabber, 'did' : req.body.did };
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
