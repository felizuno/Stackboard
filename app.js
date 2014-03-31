
/**
 * Module dependencies.
 */

var express = require('express');

// user written modules must begin with './' or else node will look in node_modules
var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var path = require('path');

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/residentsdb');
mongoose.connect('mongodb://localhost/app_db');

var app = express();

// Where does the at listen
app.set('port', process.env.PORT || 8000);

// where to look for views
app.set('views', path.join(__dirname, 'views'));
// what engine to render the view templates with
app.set('view engine', 'hjs');

// favicon woo!
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));

// All the public files are served at example.com/folder/file
app.use(express.static(path.join(__dirname, 'public')));

// All middleware (app.use()) after this will log itself
app.use(express.logger());

app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());

// Faux HTTP apu for PUT and DELETE
app.use(express.methodOverride());

// Sets up cookies session, cookies expies in 1 day (in ms)
app.use(express.cookieParser('superpassword'));  
app.use(express.session({ db: mongoose.connection.db }));

// Invokes the routes' callbacks
app.use(app.router);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
}

// Pattern match routes - order matters, hardcoded routes befor dynamic always!
app.get('/', routes.index);
app.get('/home', routes.home);
app.get('/residents', routes.residents);
app.get('/new-resident', routes.serve_create_resident);

app.post('/create-resident', routes.create_resident);
app.post('/delete-resident', routes.delete_resident);

app.get('/api/residents', routes.serve_residents_JSON);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
