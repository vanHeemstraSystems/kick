/*
 * Admin router
 */
module.exports = function(req, res, next) {
	var _Admin = {};
	config = require('../configs/server.js');
	var configs = config.configs,
	    server_prefix = configs.server_prefix || 'MASK';
	console.log(server_prefix + " - Admin router required.");
	var express = require('express'),
	 	redirect = require('express-redirect'),
	 	bodyParser = require('body-parser');
	_Admin = express.Router();
	_Admin.use(function(req, res, next) {
		console.log(server_prefix + ' - Admin router process');
		// process each admin request
		next();
	});
	// routes starting with '/'
	_Admin.route('/')
		.all(function(req, res, next) {
			console.log(server_prefix + " - Admin all");
			// process all, runs each time
			next();
		})
		.get(function(req, res, next) {
			console.log(server_prefix + " - Admin get");
			// process the get (e.g. render)
			if(!req.isAuthenticated()) {
				req.session.messages = req.i18n.__("You need to login to view this page.");
				res.redirect('/login');
			}
			// process the get, authenticated (e.g. render)
			// to do ...
		})
		.put(function(req, res, next) {
			console.log(server_prefix + " - Admin put");
			// process the put (e.g. update)
			next();
		})
		.post(function(req, res, next) {
			console.log(server_prefix + " - Admin post");
			// process the post (e.g. insert)
			next();
		})
		.delete(function(req, res, next) {
			console.log(server_prefix + " - Admin delete");
			// process the delete (e.g. delete)
			next();
		});
	return _Admin;
}();// calls itself