/*
 * SERVER - The Server
 */ 
var express = require('express'),
	path = require('path'),
	mime = require('mime'),
	fs = require('fs'),
	url = require('url'),	
	morgan = require('morgan'),
	partials = require('express-partials'),
	device = require('../lib/device.js'),
	hash = require('../lib/pass.js').hash,	
	redirect = require('express-redirect'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	i18n = require('i18n-2'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	sass = require('node-sass'),	
	session = require('express-session'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy;
/*
 * CONFIGS - The Configurations
 */ 	
config = require('../configs/server.js');
var configs = config.configs,
	server_prefix = configs.server_prefix || 'KICK';
/*
 * ROUTER - The Router
 */
var router = require('../routers/router.js');
/* 
 * ROUTES - The Routes
 */
var routes = require('../routes'); // it seems that we have to start each required file as its own var 
/*
 * SERVICES - The Services
 */
var services = require('../routes/services'); // it seems that we have to start each required file as its own var
/*
 * SERVER - The Server used for shutdown etc
 * See: https://www.exratione.com/2011/07/running-a-nodejs-server-as-a-service-using-forever/
 */
var server = express();
// Port
if(typeof configs.server_port === 'undefined'){
	var server_port = process.env.PORT || 15080;
}
else {
	var server_port = configs.server_port;
}
server.listen(server_port);
console.log(server_prefix + " - Node Version: " + process.version);
console.log(server_prefix + " - Express server listening on port %d", server_port);
console.log(server_prefix + " - To shutdown server gracefully type: node prepareForStop.js");

server.get('/prepareForShutdown', function(req, res) {
	if(req.connection.remoteAddress == "127.0.0.1"
		|| req.socket.remoteAddress == "127.0.0.1"
		// 0.4.7 oddity in https only
		|| req.connection.socket.remoteAddress == "127.0.0.1")
	{
		managePreparationForShutdown(function() {
			// don't complete the connection until the preparation is done.
			res.statusCode = 200;
			res.end();
		});
	}
	else {
		res.statusCode = 500;
		res.end();
	}
});
// Manage prepare for shutdown
var managePreparationForShutdown = function(callback) {
	// perform all the cleanup and other operations needed prior to shutdown,
	// but do not actually shutdown. Call the callback function only when
	// these operations are actually complete.
	try {
		app_server.close();
		console.log(server_prefix + " - Shutdown app successful.");
	}
	catch(ex) {
		console.log(server_prefix + " - Shutdown app failed.");
		console.log(ex);
	}
	try {
		api_server.close();
		console.log(server_prefix + " - Shutdown api successful.");
	}
	catch(ex) {
		console.log(server_prefix + " - Shutdown api failed.");
		console.log(ex);
	}
	console.log(server_prefix + " - All preparations for shutdown completed.");
	callback();
};
/*
 * APP - The Application
 */
var app = express();
// Port
if(typeof configs.app_port === 'undefined'){
	var app_port = process.env.PORT || 5000;
}
else {
	var app_port = configs.app_port;
}
// App List
if(typeof configs.app_list === 'undefined'){
	var app_list = {};
}
else {
	var app_list = configs.app_list;
}
// User List
if(typeof configs.user_list === 'undefined'){
	var user_list = {};
}
else {
	var user_list = configs.user_list;
}
/*
 * API - The Application Programming Interface
 */
var api = express();
// Port
if(typeof configs.api_port === 'undefined'){
	var api_port = app_port+1 || 5001;
}
else {
	var api_port = configs.api_port;
}
// Api List
if(typeof configs.api_list === 'undefined'){
	var api_list = {};
}
else {
	var api_list = configs.api_list;
}
// Action List
if(typeof configs.action_list === 'undefined'){
	var action_list = {};
}
else {
	var action_list = configs.action_list;
}
// Model List
if(typeof configs.model_list === 'undefined'){
	var model_list = {};
}
else {
	var model_list = configs.model_list;
}
// Format List
if(typeof configs.format_list === 'undefined'){
	var format_list = {};
}
else {
	var format_list = configs.format_list;
}
// User List
if(typeof configs.user_list === 'undefined'){
	var user_list = {};
}
else {
	var user_list = configs.user_list;
}
// API All
api.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');  // Accepts requests coming from anyone, replace '*' by configs.allowedHost to restrict it
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.set('X-Powered-By', 'Express');
  res.set('Content-Type', 'application/json; charset=utf8'); 
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});
// API Post
api.post('/login', function(req, res){
  console.log(req.body);
  res.send(201);
});
/*
 * APP DEVELOPMENT
 *
 * .bash_profile contains 
 * NODE_ENV=development
 *
 * or start server as follows
 * NODE_ENV=development node server.js
 *
 * on Windows use
 * set NODE_ENV=development
 * check with
 * echo %NODE_ENV% 
 */
if('development' == app.settings.env){
	console.log(server_prefix + " - Using development configurations");
    app.set('view engine', 'ejs');
    app.set('view options', { 
    	// layout: '/../public/layout.ejs', 
    	// layout_content_container_no_sidebar: '/../public/layout_content_container_no_sidebar.ejs' 
    });
    app.set('views', __dirname + '/../views');
	/*
	 * bodyParser() is the composition of three middlewares:
	 * - json: parses application/json request bodies
	 * - urlencoded: parses x-ww.form-urlencoded request bodies
	 * - multipart: parses multipart/form-data request bodies
	 */
	app.use(partials());
	app.use(morgan('dev'));		 
    app.use(bodyParser()); // pull information from html in POST
    app.use(methodOverride());
    app.use(cookieParser('s3cr3t')); // TODO get from config
	i18n.expressBind(app, {
		locales: ['nl', 'en'], // TODO get from config
		defaultLocale: 'en',   // TODO get from config
		cookieName: 'locale'
	});
	app.use(function(req, res, next) {
		req.i18n.setLocaleFromQuery();
		req.i18n.setLocaleFromCookie();
		next();
	});	
    app.use(device.capture());    
    app.enableDeviceHelpers();
    app.enableViewRouting();
	app.use(sass.middleware({
		src: path.join(__dirname, '/../public/sass'),
		dest: path.join(__dirname + '/../public/css'),
		debug: true,
		outputStyle: 'compressed',
		prefix:  '/css'
	}));    
    app.use('/app', express.static(path.join(__dirname, '/../public/app')));
    app.use('/tests', express.static(path.join(__dirname, '/../tests')));
    app.use(express.static(path.join(__dirname, '/../public'))); // Fall back to this as a last resort   
    app.use(errorHandler({ dumpExceptions: true, showStack: true })); // specific for development
    // These next instructions are placed after express.static to avoid passport.deserializeUser to be called several times
    app.use(session({secret: 'default', saveUninitialized: true, resave: true})); // required by passport, default values required
    app.use(passport.initialize());
    app.use(passport.session());
    /**
     * Passport
     * See http://truongtx.me/2014/03/29/authentication-in-nodejs-and-expressjs-with-passportjs-part-1/
	 */
	passport.serializeUser(function(user, done) {
		console.log(server_prefix + " - Serialize user " + user);
		return done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		var user = '';
		var user_keys = {};		
		var user_not_found = true; // default to true
		// Lookup user in user list by id, if found set not_found to false
		for (key in user_list) {
			user = key;
			user_keys = user_list[key];
			for(user_key in user_keys) {
				if(user_key == 'id') {
					var id_key = user_key;
					var id_value = user_keys[user_key];
					if(id_value == id) {
						id = id_value;
						user_not_found = false;
						break;
					}
				}
			}
		}//eof for
		if(user_not_found) {
			console.log(server_prefix + " - Deserialize user " + user + " failed: user not found");
			user = 'not_found';
			return done(null, false, {message: "The user " + user + " has not been found."});
		}
		else {
			console.log(server_prefix + " - Deserialize user " + user);
			return done(null, user);
		}
	});
	passport.use(new LocalStrategy({
			// Set the field names here
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {
			console.log(server_prefix + " - Authenticating username " + username + " and password " + password);
			// Get the username and password from the input arguments of the function
			var user_key = '';
			var user_values = {};
			var user_not_found = true; // default to true
			// Lookup user in user list, if found set not_found to false
			for (key in user_list) {
				if(key == username) {
					user_key = key;
					console.log(server_prefix + " - Authenticating found user key:");
					console.log(user_key);
					user_values = user_list[user_key];
					console.log(server_prefix + " - Authenticating found user values:");
					console.log(user_values);
					user_not_found = false;
					break;
				}
			}//eof for
			if(user_not_found) {
				console.log(server_prefix + " - User requested, but not found: " + user);
				user = 'not_found';
				return done(null, false, {message: "The user " + user + " has not been found."});
			}
			else {
				var salt = user_values.salt;
				hash(password, salt, function (err, hash) {
					if(err) {
						console.log(server_prefix + " - Error: " + err);
						return done(err);
					}
					hash = hash.toString('hex'); // NOTE: necessary for string comparison
					if(hash == user_values.hash) {
						console.log(server_prefix + " - Correct password");
						return done(null, user_values);
					}
					console.log(server_prefix + " - Incorrect password");
					return done(null, false, { message: 'Incorrect password.' });
				});
			}
		}
	));
	// TODO:
	// passport.use(new FacebookStrategy({}));   
};
/*
 * APP PRODUCTION
 *
 * .bash_profile contains
 * NODE_ENV=production
 *
 * or start server as follows
 * NODE_ENV=production node server.js
 *
 * on Windows use
 * set NODE_ENV=production
 * check with
 * echo %NODE_ENV% 
 */
if('production' == app.settings.env){
	console.log(server_prefix + " - Using production configurations");
    app.set('view engine', 'ejs');
    app.set('view options', { 
    	// layout: '/../public/layout.ejs', 
    	// layout_content_container_no_sidebar: '/../public/layout_content_container_no_sidebar.ejs' 
    });
    app.set('views', __dirname + '/../views');
	/*
	 * bodyParser() is the composition of three middlewares:
	 * - json: parses application/json request bodies
	 * - urlencoded: parses x-ww.form-urlencoded request bodies
	 * - multipart: parses multipart/form-data request bodies
	 */
	app.use(partials());
	app.use(morgan('prod'));	
    app.use(bodyParser()); // pull information from html in POST
    app.use(methodOverride());
    app.use(cookieParser('s3cr3t')); // TODO get from config
	i18n.expressBind(app, {
		locales: ['nl', 'en'], // TODO get from config
		defaultLocale: 'en',   // TODO get from config
		cookieName: 'locale'
	});
	app.use(function(req, res, next) {
		req.i18n.setLocaleFromQuery();
		req.i18n.setLocaleFromCookie();
		next();
	});
    app.use(device.capture());   
    app.enableDeviceHelpers();
    app.enableViewRouting();
	app.use(sass.middleware({
		src: path.join(__dirname, '/../public/sass'),
		dest: path.join(__dirname + '/../public/css'),
		debug: true,
		outputStyle: 'compressed',
		prefix:  '/css'
	}));    
    app.use('/app', express.static(path.join(__dirname, '/../public/app')));
    app.use('/tests', express.static(path.join(__dirname, '/../tests')));    
    app.use(express.static(path.join(__dirname, '/../public'))); // Fall back to this as a last resort    
    app.use(errorHandler({ dumpExceptions: false, showStack: false })); // specific for production
    // These next instructions are placed after express.static to avoid passport.deserializeUser to be called several times
    app.use(session({secret: 'default', saveUninitialized: true, resave: true})); // required by passport, default values required
    app.use(passport.initialize());
    app.use(passport.session()); 
    /**
     * Passport
     * See http://truongtx.me/2014/03/29/authentication-in-nodejs-and-expressjs-with-passportjs-part-1/
	 */
	passport.serializeUser(function(user, done) {
		console.log(server_prefix + " - Serialize user " + user);
		return done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		var user = '';
		var user_keys = {};		
		var user_not_found = true; // default to true
		// Lookup user in user list by id, if found set not_found to false
		for (key in user_list) {
			user = key;
			user_keys = user_list[key];
			for(user_key in user_keys) {
				if(user_key == 'id') {
					var id_key = user_key;
					var id_value = user_keys[user_key];
					if(id_value == id) {
						id = id_value;
						user_not_found = false;
						break;
					}
				}
			}
		}//eof for
		if(user_not_found) {
			console.log(server_prefix + " - Deserialize user " + user + " failed: user not found");
			user = 'not_found';
			return done(null, false, {message: "The user " + user + " has not been found."});
		}
		else {
			console.log(server_prefix + " - Deserialize user " + user);
			return done(null, user);
		}
	});
	passport.use(new LocalStrategy({
			// Set the field names here
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {
			console.log(server_prefix + " - Authenticating username " + username + " and password " + password);
			// Get the username and password from the input arguments of the function
			var user_key = '';
			var user_values = {};
			var user_not_found = true; // default to true
			// Lookup user in user list, if found set not_found to false
			for (key in user_list) {
				if(key == username) {
					user_key = key;
					console.log(server_prefix + " - Authenticating found user key:");
					console.log(user_key);
					user_values = user_list[user_key];
					console.log(server_prefix + " - Authenticating found user values:");
					console.log(user_values);
					user_not_found = false;
					break;
				}
			}//eof for
			if(user_not_found) {
				console.log(server_prefix + " - User requested, but not found: " + user);
				user = 'not_found';
				return done(null, false, {message: "The user " + user + " has not been found."});
			}
			else {
				var salt = user_values.salt;
				hash(password, salt, function (err, hash) {
					if(err) {
						console.log(server_prefix + " - Error: " + err);
						return done(err);
					}
					hash = hash.toString('hex'); // NOTE: necessary for string comparison
					if(hash == user_values.hash) {
						console.log(server_prefix + " - Correct password");
						return done(null, user_values);
					}
					console.log(server_prefix + " - Incorrect password");
					return done(null, false, { message: 'Incorrect password.' });
				});
			}
		}
	));
	// TODO:
	// passport.use(new FacebookStrategy({}));    
};
/** 
 * ALL requests
 */
app.all('*', function(req, res, next){
	if (!req.get('Origin')) return next();
	// use "*" here to accept any origin
	res.set('Access-Control-Allow-Origin', '*'); // Accepts requests coming from anyone, replace '*' by configs.allowedHosts to restrict it
	res.set('Access-Control-Allow-Methods', 'GET, PUT, POST');
	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	// res.set('Access-Control-Allow-Max-Age', 3600);
	if ('OPTIONS' == req.method) return res.send(200);
	// for static file requests
	var static_file_path = "../public/"; 
	var uri = url.parse(req.url).pathname;
	var filename = path.join(static_file_path, uri);
	fs.exists(filename, function(exists) {
		if (!exists) {
			response.writeHead(404, {
				"Content-Type": "text/plain"
			});
			response.write("404 Not Found\n");
			response.end();
			return;
		}
		if(fs.statSync(filename).isDirectory()) {
			// filename += '/index.html'; 
			next();
		}
		fs.readFile(filename, "binary", function(err, file) {
			if(err) {
				response.writeHead(500, {
					"Content-Type": "text/plain"
				});
				response.write(err + "\n");
				response.end();
				return;
			}
			var type = mime.lookup(filename);
			response.writeHead(200, {
				"Content-Type": type
			});
			response.write(file, "binary");
			response.end();
		});
	});
});
/**
 * ALL using router
 */
// test
try {
	app.use('/test', router.test);
}
catch(err) {
	console.log(err);
}
// login
try {
	app.use('/login', router.login);
}
catch(err) {
	console.log(err);
}	
// logout
try {
	app.use('/logout', router.logout);
}
catch(err) {
	console.log(err);
}	
// admin
try {
	app.use('/admin', router.admin);
}
catch(err) {
	console.log(err);
}	
// source
try {
	app.use('/source', router.source);
}
catch(err) {
	console.log(err);
}
// index, place last
try {
	app.use('/', router.index);
}
catch(err) {
	console.log(err);
}
/**
 * LISTEN
 */ 
var app_server = app.listen(app_port, function() {
	console.log(server_prefix + " - Express app server listening on port %d in %s mode", app_port, app.settings.env);
});
var api_server = api.listen(api_port, function() {
	console.log(server_prefix + " - Express api server listening on port %d in %s mode", api_port, api.settings.env);
});
