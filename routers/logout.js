/*
 * Logout router
 */
module.exports = function(req, res, next) { 
	var _Logout = {}; 
	config = require('../configs/server.js');
	var configs = config.configs,
	    server_prefix = configs.server_prefix || 'MASK';
	console.log(server_prefix + " - Logout router required.");
	var express = require('express'),
		redirect = require('express-redirect'),
		bodyParser = require('body-parser');
	_Logout = express.Router();
	_Logout.use(function(req, res, next) {
		console.log(server_prefix + ' - Logout router process');
		// process each logout request
		next();
	});
	// routes starting with '/'
	_Logout.route('/')
		.all(function(req, res, next) {
			console.log(server_prefix + " - Logout all");
			// process all, runs each time
			next();
		})
		.get(function(req, res, next) {
			console.log(server_prefix + " - Logout get");
			if(req.isAuthenticated()) {
				req.logout();
				req.session.messages = req.i18n.__("Log out successfully.");
			}
			res.redirect('/login'); // TODO Choose what page to go to
		})
		.put(function(req, res, next) {
			console.log(server_prefix + " - Logout put");
			// process the put (e.g. update)
			next();
		})
		.post(function(req, res, next) {
			console.log(server_prefix + " - Logout post");
			// process the post (e.g. insert)
			next();
		})
		.delete(function(req, res, next) {
			console.log(server_prefix + " - Logout delete");
			// process the delete (e.g. delete)
			next();
		});
	return _Logout;
}();// calls itself