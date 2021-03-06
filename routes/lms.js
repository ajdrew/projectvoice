module.exports = function(app) {

  // mongodb
  var Db = require('mongodb').Db;
  var Server = require('mongodb').Server;

  // Main navigation page
  app.get('/lms', function(req, res) {

    var country = null;
    var type = null;
    var optionscountry = {
      "sort": "lmsadmincountry"
    }
    var optionstype = {
      "sort": "lmsadmintype"
    }

    var listDataCountry = function(err, collection) {
      collection.find({}, optionscountry).toArray(function(err, results) {
        if (err) throw err;
        country = results;
        complete();
      });
    }
    var listDataType = function(err, collection) {
      collection.find({}, optionstype).toArray(function(err, results) {
        if (err) throw err;
        type = results;
        complete();
      });
    }
    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lmsadmincountry', listDataCountry);
      Client.collection('lmsadmintype', listDataType);
    });

    function complete() {
      if (country !== null && type !== null) {
        res.render('lms/lms.html', {
          layout: false,
          'title': 'Amway.voice',
          'Country': country,
          'Type': type,
        });
      }
    }

  })

  app.get('/lms/add', function(req, res) {


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
        res.render('lms/lms-add.html', {
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

  // DB - CRUD
  app.post('/lms/save', function(req, res) {
    console.log(req.body);
    var data = {
      'lmsip': req.body.lmsip,
      'lmshostname': req.body.lmshostname,
      'lmscountry': req.body.lmscountry,
      'lmssite': req.body.lmssite,
      'lmstype': req.body.lmstype,
      'lmsdescription': req.body.lmsdescription,
      'lmsciscocontract': req.body.lmsciscocontract,
      'lmslink': req.body.lmslink,
      'lmsversiongeneral': req.body.lmsversiongeneral,
      'lmsversioncmeios': req.body.lmsversioncmeios,
      'lmsversioncimc': req.body.lmsversioncimc,
      'lmsversionwindows': req.body.lmsversionwindows,
      'lmsaccess': req.body.lmsaccess,
      'lmssslrenewaldate': req.body.lmssslrenewaldate,
      'lmsldap': req.body.lmsldap,
      'lmsiosusername': req.body.lmsiosusername,
      'lmsiospassword': req.body.lmsiospassword,
      'lmsucsusername': req.body.lmsucsusername,
      'lmsucspassword': req.body.lmsucspassword,
      'lmsappusername': req.body.lmsappusername,
      'lmsapppassword': req.body.lmsapppassword,
      'lmsvoiceappusername': req.body.lmsvoiceappusername,
      'lmsvoiceapppassword': req.body.lmsvoiceapppassword,
      'lmsvoiceplatusername': req.body.lmsvoiceplatusername,
      'lmsvoiceplatpassword': req.body.lmsvoiceplatpassword,
      'lmsvoicedatabase': req.body.lmsvoicedatabase,
      'lmselm': req.body.lmselm,
      'lmsvirtualized': req.body.lmsvirtualized,
      'lmsvsphere': req.body.lmsvsphere,
      'lmsesxlicense': req.body.lmsesxlicense,
      'lmshardwaretype': req.body.lmshardwaretype,
      'lmshardwareserial': req.body.lmshardwareserial
    };
    var insertData = function(err, collection) {
      collection.insert(data);
    }
    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lms', insertData);
      Client.close();
    });

    res.redirect('/lms');
  });

  app.get('/lms/edit1/:id', function(req, res) {
    var ObjectID = require('mongodb').ObjectID;
    var listData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.findOne({
        '_id': chosenId
      }, function(err, results) {
        console.log(results);
        res.render('lms/lms-edit.html', {
          layout: false,
          'title': 'Amway.voice',
          'Results': results
        });
      });
    }
    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lms', listData);
      //Client.close();
    });
  });

  app.get('/lms/edit/:id', function(req, res) {
    console.log(req.body);
    var ObjectID = require('mongodb').ObjectID;
    var resultsx = null;
    var country = null;
    var sites = null;
    var type = null;
    var contract = null;
    var access = null;
    var elm = null;
    var vsphere = null;

    var optionscountry = {
      "sort": "lmsadmincountry"
    }
    var optionssites = {
      "sort": "lmsadminsites"
    }
    var optionstype = {
      "sort": "lmsadmintype"
    }
    var optionsaccess = {
      "sort": "lmsadminaccess"
    }
    var optionsvsphere = {
      "sort": "lmsadminvsphere"
    }
    var optionselm = {
      "sort": "lmsadminelm"
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
    }

    var listDataCountry = function(err, collection) {
      collection.find({}, optionscountry).toArray(function(err, results) {
        if (err) throw err;
        country = results;
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

    var listDataType = function(err, collection) {
      collection.find({}, optionstype).toArray(function(err, results) {
        if (err) throw err;
        type = results;
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

    var listDataAccess = function(err, collection) {
      collection.find({}, optionsaccess).toArray(function(err, results) {
        if (err) throw err;
        access = results;
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

    var listDataElm = function(err, collection) {
      collection.find({}, optionselm).toArray(function(err, results) {
        if (err) throw err;
        elm = results;
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

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lms', listData);
      Client.collection('lmsadmincountry', listDataCountry);
      Client.collection('lmsadminsites', listDataSites);
      Client.collection('lmsadmintype', listDataType);
      Client.collection('lmsadmincontract', listDataContract);
      Client.collection('lmsadminaccess', listDataAccess);
      Client.collection('lmsadminelm', listDataElm);
      Client.collection('lmsadminvsphere', listDataVsphere);
    });

    function complete() {
      if (resultsx !== null && country !== null && sites !== null && type !== null && contract !== null && access !== null && elm !== null && vsphere !== null) {
        res.render('lms/lms-edit.html', {
          layout: false,
          'title': 'Amway.voice',
          'Results': resultsx,
          'Country': country,
          'Sites': sites,
          'Type': type,
          'Contract': contract,
          'Access': access,
          'Elm': elm,
          'Vsphere': vsphere,
        });
      }
    }
  });

  app.post('/lms/update', function(req, res) {
    console.log(req.body);

    var ObjectID = require('mongodb').ObjectID;

    var data = {
      'lmsip': req.body.lmsip,
      'lmshostname': req.body.lmshostname,
      'lmscountry': req.body.lmscountry,
      'lmssite': req.body.lmssite,
      'lmstype': req.body.lmstype,
      'lmsdescription': req.body.lmsdescription,
      'lmsciscocontract': req.body.lmsciscocontract,
      'lmslink': req.body.lmslink,
      'lmsversiongeneral': req.body.lmsversiongeneral,
      'lmsversioncmeios': req.body.lmsversioncmeios,
      'lmsversioncimc': req.body.lmsversioncimc,
      'lmsversionwindows': req.body.lmsversionwindows,
      'lmsaccess': req.body.lmsaccess,
      'lmssslrenewaldate': req.body.lmssslrenewaldate,
      'lmsldap': req.body.lmsldap,
      'lmsiosusername': req.body.lmsiosusername,
      'lmsiospassword': req.body.lmsiospassword,
      'lmsucsusername': req.body.lmsucsusername,
      'lmsucspassword': req.body.lmsucspassword,
      'lmsappusername': req.body.lmsappusername,
      'lmsapppassword': req.body.lmsapppassword,
      'lmsvoiceappusername': req.body.lmsvoiceappusername,
      'lmsvoiceapppassword': req.body.lmsvoiceapppassword,
      'lmsvoiceplatusername': req.body.lmsvoiceplatusername,
      'lmsvoiceplatpassword': req.body.lmsvoiceplatpassword,
      'lmsvoicedatabase': req.body.lmsvoicedatabase,
      'lmselm': req.body.lmselm,
      'lmsvirtualized': req.body.lmsvirtualized,
      'lmsvsphere': req.body.lmsvsphere,
      'lmsesxlicense': req.body.lmsesxlicense,
      'lmshardwaretype': req.body.lmshardwaretype,
      'lmshardwareserial': req.body.lmshardwareserial
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
      Client.collection('lms', updateData);
      Client.close();
    });

    res.redirect('/lms');
  });

  app.get('/lms/delete/:id', function(req, res) {
    var ObjectID = require('mongodb').ObjectID;

    var removeData = function(err, collection) {
      var chosenId = new ObjectID(req.params.id);
      collection.remove({
        '_id': chosenId
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lms', removeData);
      //Client.close();
    });
    res.redirect('lms');
  });

  app.get('/lms/show', function(req, res) {
    var country = null;
    var type = null;
    var resultsx = null;
    var optionscountry = {
      "sort": "lmsadmincountry"
    }
    var optionstype = {
      "sort": "lmsadmintype"
    }

    var listDataCountry = function(err, collection) {
      collection.find({}, optionscountry).toArray(function(err, results) {
        if (err) throw err;
        country = results;
        complete();
      });
    }
    var listDataType = function(err, collection) {
      collection.find({}, optionstype).toArray(function(err, results) {
        if (err) throw err;
        type = results;
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
      Client.collection('lmsadmincountry', listDataCountry);
      Client.collection('lmsadmintype', listDataType);
      Client.collection('lms', listData);
    });

    function complete() {
      if (country !== null && resultsx !== null && type !== null) {
        res.render('lms/lms-show.html', {
          layout: false,
          'title': 'Amway.voice',
          'Country': country,
          'Type': type,
          'Results': resultsx,
        });
      }
    }

  })

  // DB - SEARCH
  app.post('/lms/search', function(req, res) {
    console.log(req.body);
    var search = req.body.search;
    var filtercountry = req.body.lmsfiltercountry;
    var country = null;
    var type = null;
    var resultsx = null;
    var optionscountry = {
      "sort": "lmsadmincountry"
    }
    var optionstype = {
      "sort": "lmsadmintype"
    }

    var listDataCountry = function(err, collection) {
      collection.find({}, optionscountry).toArray(function(err, results) {
        if (err) throw err;
        country = results;
        complete();
      });
    }
    var listDataType = function(err, collection) {
      collection.find({}, optionstype).toArray(function(err, results) {
        if (err) throw err;
        type = results;
        complete();
      });
    }
    var listData = function(err, collection) {
      collection.find({
        $or: [{
          lmsip: new RegExp(search, "i")
        }, {
          lmshostname: new RegExp(search, "i")
        }]
      }).toArray(function(err, results) {
        if (err) throw err;
        resultsx = results;
        complete();
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lms', listData);
      Client.collection('lmsadmincountry', listDataCountry);
      Client.collection('lmsadmintype', listDataType);
    });

    function complete() {
      if (country !== null && resultsx !== null && type !== null) {
        res.render('lms/lms-show.html', {
          layout: false,
          'title': 'Amway.voice',
          'Country': country,
          'Type': type,
          'Results': resultsx,
        });
      }
    }
  });

  app.post('/lms/search/country', function(req, res) {
    var filtercountry = req.body.lmsfiltercountry;
    var type = null;
    var resultsx = null;
    var country = null;
    var optionscountry = {
      "sort": "lmsadmincountry"
    }
    var optionstype = {
      "sort": "lmsadmintype"
    }

    var listDataCountry = function(err, collection) {
      collection.find({}, optionscountry).toArray(function(err, results) {
        if (err) throw err;
        country = results;
        complete();
      });
    }
    var listDataType = function(err, collection) {
      collection.find({}, optionstype).toArray(function(err, results) {
        if (err) throw err;
        type = results;
        complete();
      });
    }
    var listData = function(err, collection) {
      collection.find({
        lmscountry: new RegExp(filtercountry)
      }).toArray(function(err, results) {
        if (err) throw err;
        resultsx = results;
        complete();
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lms', listData);
      Client.collection('lmsadmincountry', listDataCountry);
      Client.collection('lmsadmintype', listDataType);
    });

    function complete() {
      if (country !== null && resultsx !== null && type !== null) {
        res.render('lms/lms-show.html', {
          layout: false,
          'title': 'Amway.voice',
          'Country': country,
          'Type': type,
          'Results': resultsx,
        });
      }
    }
  });

  app.post('/lms/search/type', function(req, res) {
    console.log(req.body);
    var lmsfiltertype = req.body.lmsfiltertype;
    var type = null;
    var resultsx = null;
    var country = null;
    var optionscountry = {
      "sort": "lmsadmincountry"
    }
    var optionstype = {
      "sort": "lmsadmintype"
    }

    var listDataCountry = function(err, collection) {
      collection.find({}, optionscountry).toArray(function(err, results) {
        if (err) throw err;
        country = results;
        complete();
      });
    }
    var listDataType = function(err, collection) {
      collection.find({}, optionstype).toArray(function(err, results) {
        if (err) throw err;
        type = results;
        complete();
      });
    }

    var listData = function(err, collection) {
      collection.find({
        lmstype: new RegExp(lmsfiltertype)
      }).toArray(function(err, results) {
        if (err) throw err;
        resultsx = results;
        complete();
      });
    }

    var Client = new Db('amway-voice', new Server('172.30.53.200', 27017, {}));
    Client.open(function(err, pClient) {
      Client.collection('lms', listData);
      Client.collection('lmsadmincountry', listDataCountry);
      Client.collection('lmsadmintype', listDataType);
    });

    function complete() {
      if (country !== null && resultsx !== null && type !== null) {
        res.render('lms/lms-show.html', {
          layout: false,
          'title': 'Amway.voice',
          'Country': country,
          'Type': type,
          'Results': resultsx,
        });
      }
    }
  });
}
