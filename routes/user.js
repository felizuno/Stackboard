module.exports = function(app){

    app.get('/login', function(req, res){
        res.render('login', {/*TODO: config*/});
    });

    app.post('/login', function(req, res){
      var sid = req.sessionID;
      var username = req.body.user;
      var password = req.body.pass;
    });

    //other routes..
};
