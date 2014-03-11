
/**
 * Module dependencies.
 */

var express = require('express');

// user written modules must begin with './' or else node will look in node_modules
var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var path = require('path');

var app = express();

// Where does the at listen
app.set('port', process.env.PORT || 8000);

// where to look for views
app.set('views', path.join(__dirname, 'views'));
// what engine to render the view templates with
app.set('view engine', 'jade');

// favicon woo!
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

// Faux HTTP apu for PUT and DELETE
app.use(express.methodOverride());

// Sign cookies fool
app.use(express.cookieParser('superpassword'));

// Sets up cookies session, cookies expies in 1 day (in ms)
app.use(express.session());

// Invokes the routes' callbacks
app.use(app.router);

// All the public files are served at example.com/folder/file
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Pattern match routes - order matters, hardcoded routes befor dynamic always!
app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
