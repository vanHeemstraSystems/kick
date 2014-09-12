/*
 * Test router
 */
module.exports = function(req, res, next) {	
	var _Test = {};
	config = require('../configs/server.js');
	var configs = config.configs,
	    server_prefix = configs.server_prefix || 'MASK';
	console.log(server_prefix + " - Test router required.");
	var express = require('express'),
		redirect = require('express-redirect'),
		bodyParser = require('body-parser');
	_Test = express.Router();
	_Test.use(function(req, res, next) {
		console.log(server_prefix + ' - Test router process');
		// process each test request
		next();
	});
	// routes starting with '/'	
	_Test.route('/')
		.all(function(req, res, next) {
			console.log(server_prefix + " - Test all");
			// process all, runs each time
			next();
		})
		.get(function(req, res, next) {
			console.log(server_prefix + " - Test get");
			// process the get (e.g. render)
			var app = 'test'; // default
		    res.render(app, { title: title, access_control_allow_origin: access_control_allow_origin, host: host, web_root: web_root, layout: false });
		})
		.put(function(req, res, next) {
			console.log(server_prefix + " - Test put");
			// process the put (e.g. update)
			next();
		})
		.post(function(req, res, next) {
			console.log(server_prefix + " - Test post");
			// process the post (e.g. insert)
			next();
		})
		.delete(function(req, res, next) {
			console.log(server_prefix + " - Test delete");
			// process the delete (e.g. delete)
			next();
		});
	return _Test;
}();// calls itself