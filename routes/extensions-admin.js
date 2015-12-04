module.exports = function(app) {

  // mongodb
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  // Main navigation page
  app.get('/extensions/admin', function(req, res) {

    var locations = null;

    var optionslocations = {
      "sort": "extensionsadminlocations"
    }

    var listDataLocations = function(err, collection) {
      collection.find({}, optionslocations).toArray(function(err, results) {
        if (err) throw err;
        locations = results;
        complete();
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('extensionsadminlocations', listDataLocations);
    });

    function complete() {
      if (locations !== null) {
        res.render('extensions/extensions-admin.html', {
          layout: false,
          'title': 'Amway.voice',
          'Locations': locations,
        });
      }
    }

  })

  // DB - CRUD - LOCATION
  app.post('/extensions/admin/location/save', function(req, res) {
    console.log(req.body);
    var data = {
      'extensionsadminlocations': req.body.extensionsadminlocations
    };
    var insertData = function(err, collection) {
      collection.insert(data);
    }
    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('extensionsadminlocations', insertData);
      Client.close();
    });

    res.redirect('/extensions/admin');
  });

  app.get('/extensions/admin/location/delete/:id', function(req, res) {
    var ObjectID = require('mongodb').ObjectID;

    var removeData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.remove({
        '_id': chosenId
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('extensionsadminlocations', removeData);
      //Client.close();
    });
    res.redirect('/extensions/admin');
  });

}
