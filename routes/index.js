var Resident = require('./../models/resident');

/*
 * GET home page.
 */

exports.index = function(req, res, next){
  var nav = [
    { name: 'home' },
    { name: 'residents' }
  ];
  res.render('index', { title: '1700 Madison', nav: nav });
};

exports.home = function(req, res, next){
  res.render('home', { title: '1700 Madison'});
};

exports.residents = function(req, res, next) {
  var residents = Resident.find(function(err, residents) {
    if (err) console.log('!!!!', err);
    else res.render('residents-list', { title: '1700 Madison', residents: residents });
  });
};

exports.serve_residents_JSON = function(req, res, next) {
  var residents = Resident.find(function(err, residents) {
    if (err) console.log('!!!!', err);
    else res.send({residents: residents});
  });
};

exports.serve_create_resident = function(req, res, next) {
  res.render('new-resident', {title: 'Add new resident'});
};

exports.create_resident = function(req, res, next) {
  var resident = new Resident({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    unit: req.body.unit_number,
  });

  resident.save(function(err) {
    if (err) console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!', err);
    else res.send({ success: !err, resident: resident });
  });
};

exports.delete_resident = function(req, res, next) {
  status = Resident.findOne({ _id: req.body.id }, function(err, resident) {
    if (err) console.log('[delete_resident] Error: ', err);
    else if (resident) resident.remove();
    else console.log('@#$%@#$%@#%', resident, err);

    res.send({ success: !err });
  });
};
