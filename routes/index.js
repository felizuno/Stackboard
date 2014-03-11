var Resident = require('./../models/resident');

/*
 * GET home page.
 */

exports.index = function(req, res){
  Resident.find(function(err, residents) {
    if (err) console.log('!!!!', err);
  });
  residents = Resident.find(function(err, residents) {
    res.render('index', { title: '1700 Madison', residents: residents });
  });
};

exports.serve_create_resident = function(req, res) {
  res.render('create-resident', {title: 'Add new resident'});
};

exports.create_resident = function(req, res) {
  var resident = new Resident({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    unit: req.body.unit_number,
  });

  resident.save(function(err) {
    if (err) console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!', err);
    else res.redirect('/'); // go to the home page to show it worked.
  });
};
