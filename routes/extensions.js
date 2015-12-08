module.exports = function(app) {

  // DB - SETUP
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  // PAGES
  app.get('/extensions', function(req, res) {

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
        res.render('extensions/extensions.html', {
          layout: false,
          'title': 'Amway.voice',
          'Locations': locations,
        });
      }
    }
  })

  app.get('/extensions/show', function(req, res) {
    res.render('extensions/extensions-show.html', {
      layout: false,
      'title': 'Amway.voice'
    });
  })

  // DB - CRUD
  app.post('/extensions/save', function(req, res) {
    console.log(req.body);
    var data = {
      'extension': req.body.extension,
      'user_id': req.body.user_id,
      'whole_name': req.body.whole_name,
      'email': req.body.email,
      'place': req.body.place,
      'phone_number_jabber': req.body.phone_number_jabber,
      'did': req.body.did,
      'status': req.body.status,
      'out_date': req.body.out_date
    };
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

  app.get('/extensions/edit/:id', function(req, res) {
    console.log(req.body);
    var locations = null;
    var resultsx = null;
    var ObjectID = require('mongodb').ObjectID;
    var optionslocations = {
      "sort": "extensionsadminlocations"
    }

    var listData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.findOne({
        '_id': chosenId
      }, function(err, results) {
        if (err) throw err;
        resultsx = results;
        complete();
        });
      });
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
      Client.collection('extensions', listData);
    });

    function complete() {
      if (locations !== null && resultsx !== null) {
        res.render('extensions/extensions-edit.html', {
          layout: false,
          'title': 'Amway.voice',
          'Locations': locations,
          'Results': resultsx,
        });
      }
    }
  })

  });

  //OLD
  app.get('/extension', function(req, res) {
    console.log(req.body);
    var ObjectID = require('mongodb').ObjectID;

    var listData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.findOne({
        '_id': chosenId
      }, function(err, results) {
        console.log(results);
        res.render('extensions/extensions-edit.html', {
          layout: false,
          'title': 'Amway.voice',
          'results': results
        });
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('extensions', listData);
    });

  });

  app.post('/extensions/update', function(req, res) {
    console.log(req.body);

    var ObjectID = require('mongodb').ObjectID;

    var data = {
      'extension': req.body.extension,
      'user_id': req.body.user_id,
      'whole_name': req.body.whole_name,
      'email': req.body.email,
      'place': req.body.place,
      'phone_number_jabber': req.body.phone_number_jabber,
      'did': req.body.did,
      'status': req.body.status,
      'out_date': req.body.out_date
    };
    var updateData = function(err, collection) {
      var chosenId = new ObjectID(req.body.id);
      collection.update({
        "_id": chosenId
      }, {
        $set: data
      });
    }
    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('extensions', updateData);
      Client.close();
    });

    res.redirect('extensions');
  });

  app.get('/extensions/delete/:id', function(req, res) {
    console.log(req.body);
    var ObjectID = require('mongodb').ObjectID;

    var removeData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.remove({
        '_id': chosenId
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('extensions', removeData);
    });
    res.redirect('extensions');
  });

  // DB - FILTERS
  app.post('/extensions/filter', function(req, res) {

    var filter = req.body.filter;
    var locations = null;
    var resultsx = null;
    var options = {
      "sort": "extension"
    }
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

    var listData = function(err, collection) {
      collection.find({
        place: new RegExp(filter)
      }, options).toArray(function(err, results) {
        if (err) throw err;
        resultsx = results;
        complete();
        });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('extensions', listData);
      Client.collection('extensionsadminlocations', listDataLocations);
    });

    function complete() {
      if (locations !== null && resultsx !== null) {
        res.render('extensions/extensions-show.html', {
          layout: false,
          'title': 'Amway.voice',
          'Locations': locations,
          'Results' : resultsx,
        });
      }
    }
  });

  app.get('/extensions/all', function(req, res) {

    var locations = null;
    var resultsx = null;
    var options = {
      "sort": "extension"
    }
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

    var listData = function(err, collection) {
      collection.find().toArray(function(err, results) {
        if (err) throw err;
        resultsx = results;
        complete();
        });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('extensions', listData);
      Client.collection('extensionsadminlocations', listDataLocations);
    });

    function complete() {
      if (locations !== null && resultsx !== null) {
        res.render('extensions/extensions-show.html', {
          layout: false,
          'title': 'Amway.voice',
          'Locations': locations,
          'Results' : resultsx,
        });
      }
    }
  });

  app.get('/extensions/filter/open', function(req, res) {

    var locations = null;
    var resultsx = null;
    var options = {
      "limit": 1,
      "sort": "out_date"
    }
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

    var listData = function(err, collection) {
      collection.find({
        status: "OPEN"
      }, options).toArray(function(err, results) {
        if (err) throw err;
        resultsx = results;
        complete();
        });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('extensions', listData);
      Client.collection('extensionsadminlocations', listDataLocations);
    });

    function complete() {
      if (locations !== null && resultsx !== null) {
        res.render('extensions/extensions-show.html', {
          layout: false,
          'title': 'Amway.voice',
          'Locations': locations,
          'Results' : resultsx,
        });
      }
    }
  });

  // DB - SEARCH
  app.post('/extensions/search', function(req, res) {
    console.log(req.body);
    var search = req.body.search;
    var locations = null;
    var resultsx = null;
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

    var listData = function(err, collection) {
      collection.find({
        $or: [{
          extension: new RegExp(search, "i")
        }, {
          whole_name: new RegExp(search, "i")
        }, {
          user_id: new RegExp(search, "i")
        }]
      }).toArray(function(err, results) {
        if (err) throw err;
        resultsx = results;
        complete();
        });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('extensions', listData);
      Client.collection('extensionsadminlocations', listDataLocations);
    });

    function complete() {
      if (locations !== null && resultsx !== null) {
        res.render('extensions/extensions-show.html', {
          layout: false,
          'title': 'Amway.voice',
          'Locations': locations,
          'Results' : resultsx,
        });
      }
    }
  });
}
