/*
 * Login router
 */
module.exports = function(req, res, next) {	
	var _Login = {};
	config = require('../configs/server.js');
	var configs = config.configs,
	    server_prefix = configs.server_prefix || 'MASK';
	console.log(server_prefix + " - Login router required.");
	var express = require('express'),
		redirect = require('express-redirect'),
		bodyParser = require('body-parser'),
		passport = require('passport');
	_Login = express.Router();
	_Login.use(function(req, res, next) {
		console.log(server_prefix + ' - Login router process');
		// process each login request
		next();
	});
	// routes starting with '/'
	_Login.route('/')
		.all(function(req, res, next) {
			console.log(server_prefix + " - Login all");
			// process all, runs each time
			next();
		})
		.get(function(req, res, next) {
			console.log(server_prefix + " - Login get");
			// process the get (e.g. render)
			if(req.user) {
		    	// already logged in
		    	res.redirect('/?app=mydefaultstore'); // TODO make dynamic
			} else {
		    	// not logged in, show the login form, remember to pass the message
		    	// for displaying when error happens
		    	console.log(server_prefix + " - Login requested");
				var app = 'login'; // default  
				if(typeof configs.title === 'undefined'){
					var title = 'Untitled';
				}
				else {
					var title = configs.title;
				}
		    	res.render('pages/login', { title: title, message: req.session.messages, layout: false });
		    	// and then remember to clear the message
		    	req.session.messages = null;
			}
		})
		.put(function(req, res, next) {
			console.log(server_prefix + " - Login put");
			// process the put (e.g. update)
			next();
		})
		.post(function(req, res, next) {
			console.log(server_prefix + " - Login post");
			// process the post (e.g. insert)
			// ask passport to authenticate
			passport.authenticate('local', function(err, username, info) {
			    if (err) {
			    	console.log(server_prefix + " - Login, error: " + err);
			    	// if error happens
			    	return next(err);
			    }
			    if (!username) {
			    	// if authentication fail, get the error message that we set
			    	// from previous (info.message) step, assign it into to
			    	// req.session and redirect to the login page again to display
			    	console.log(server_prefix + " - Login, message: " + info.message);
			    	req.session.messages = req.i18n.__(info.message);
			    	return res.redirect('/login');
			    }
			    // if everything is OK
			    req.logIn(username, function(err) {
			    	if (err) {
			    		console.log(server_prefix + " - Login, error: " + err);
			        	req.session.messages = req.i18n.__("Error");
			        	return next(err);
			    	}
			    	// set the message
			    	console.log(server_prefix + " - Login successful, redirecting ...");
			    	req.session.messages = req.i18n.__("Login successfully.");
			    	return res.redirect('/?app=mydefaultstore'); // TODO make dynamic
			    });
			})(req, res, next);
		})
		.delete(function(req, res, next) {
			console.log(server_prefix + " - Login delete");
			// process the delete (e.g. delete)
			next();
		});
	return _Login;
}();// calls itself