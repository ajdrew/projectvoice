module.exports = function(app) {

  // mongodb
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  // Main navigation page
  app.get('/lms/admin', function(req, res) {

    var type = null;
    var access = null;
    var country = null;
    var contract = null;
    var sites = null;
    var vsphere = null;
    var elm = null;

    var optionstype = {
      "sort": "lmsadmintype"
    }
    var optionsaccess = {
      "sort": "lmsadminaccess"
    }
    var optionscountry = {
      "sort": "lmsadmincountry"
    }
    var optionssites = {
      "sort": "lmsadminsites"
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

    var listDataSites = function(err, collection) {
      collection.find({}, optionssites).toArray(function(err, results) {
        if (err) throw err;
        sites = results;
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
      collection.find({}, optionselm).toArray(function(err, results) {
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
      Client.collection('lmsadminsites', listDataSites);
      Client.collection('lmsadminvsphere', listDataVsphere);
      Client.collection('lmsadminelm', listDataElm);
    });

    function complete() {
      if (type !== null && access !== null && country !== null && contract !== null && sites !== null && vsphere !== null && elm !== null) {
        res.render('lms/lms-admin.html', {
          layout: false,
          'title': 'Amway.voice',
          'Type': type,
          'Access': access,
          'Country': country,
          'Contract': contract,
          'Sites': sites,
          'Vsphere': vsphere,
          'Elm': elm
        });
      }
    }

  })

  // DB - CRUD - TYPE
  app.post('/lms/admin/type/save', function(req, res) {
    console.log(req.body);
    var data = {
      'lmsadmintype': req.body.lmsadmintype
    };
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

  app.get('/lms/admin/type/delete/:id', function(req, res) {
    var ObjectID = require('mongodb').ObjectID;

    var removeData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.remove({
        '_id': chosenId
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadmintype', removeData);
      //Client.close();
    });
    res.redirect('/lms/admin');
  });

  // DB - CRUD - ACCESS
  app.post('/lms/admin/access/save', function(req, res) {
    console.log(req.body);
    var data = {
      'lmsadminaccess': req.body.lmsadminaccess
    };
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

  app.get('/lms/admin/access/delete/:id', function(req, res) {
    var ObjectID = require('mongodb').ObjectID;

    var removeData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.remove({
        '_id': chosenId
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadminaccess', removeData);
      //Client.close();
    });
    res.redirect('/lms/admin');
  });

  // DB - CRUD - Country
  app.post('/lms/admin/country/save', function(req, res) {
    console.log(req.body);
    var data = {
      'lmsadmincountry': req.body.lmsadmincountry
    };
    var insertData = function(err, collection) {
      collection.insert(data);
    }
    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadmincountry', insertData);
      Client.close();
    });

    res.redirect('/lms/admin');
  });

  app.get('/lms/admin/country/delete/:id', function(req, res) {
    var ObjectID = require('mongodb').ObjectID;

    var removeData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.remove({
        '_id': chosenId
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadmincountry', removeData);
      Client.close();
    });
    res.redirect('/lms/admin');
  });

  // DB - CRUD - CONTRACT
  app.post('/lms/admin/contract/save', function(req, res) {
    console.log(req.body);
    var data = {
      'lmsadmincontract': req.body.lmsadmincontract
    };
    var insertData = function(err, collection) {
      collection.insert(data);
    }
    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadmincontract', insertData);
      Client.close();
    });

    res.redirect('/lms/admin');
  });

  app.get('/lms/admin/contract/delete/:id', function(req, res) {
    var ObjectID = require('mongodb').ObjectID;

    var removeData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.remove({
        '_id': chosenId
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadmincontract', removeData);
      //Client.close();
    });
    res.redirect('/lms/admin');
  });

  // DB - CRUD - SITES
  app.post('/lms/admin/sites/save', function(req, res) {
    console.log(req.body);
    var data = {
      'lmsadminsites': req.body.lmsadminsites
    };
    var insertData = function(err, collection) {
      collection.insert(data);
    }
    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadminsites', insertData);
      Client.close();
    });

    res.redirect('/lms/admin');
  });

  app.get('/lms/admin/ucschassis/delete/:id', function(req, res) {
    var ObjectID = require('mongodb').ObjectID;

    var removeData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.remove({
        '_id': chosenId
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadminucschassis', removeData);
      //Client.close();
    });
    res.redirect('/lms/admin');
  });

  // DB - CRUD - VSPHERE
  app.post('/lms/admin/vsphere/save', function(req, res) {
    console.log(req.body);
    var data = {
      'lmsadminvsphere': req.body.lmsadminvsphere
    };
    var insertData = function(err, collection) {
      collection.insert(data);
    }
    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadminvsphere', insertData);
      Client.close();
    });

    res.redirect('/lms/admin');
  });

  app.get('/lms/admin/vsphere/delete/:id', function(req, res) {
    var ObjectID = require('mongodb').ObjectID;

    var removeData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.remove({
        '_id': chosenId
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadminvsphere', removeData);
      //Client.close();
    });
    res.redirect('/lms/admin');
  });

  // DB - CRUD - VSPHERE
  app.post('/lms/admin/elm/save', function(req, res) {
    console.log(req.body);
    var data = {
      'lmsadminelm': req.body.lmsadminelm
    };
    var insertData = function(err, collection) {
      collection.insert(data);
    }
    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadminelm', insertData);
      Client.close();
    });

    res.redirect('/lms/admin');
  });

  app.get('/lms/admin/elm/delete/:id', function(req, res) {
    var ObjectID = require('mongodb').ObjectID;

    var removeData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.remove({
        '_id': chosenId
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadminelm', removeData);
      //Client.close();
    });
    res.redirect('/lms/admin');
  });





}
