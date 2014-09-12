/*
 * Source router
 */
module.exports = function(req, res, next) {	
	var _Source = {};
	config = require('../configs/server.js');
	var configs = config.configs,
	    server_prefix = configs.server_prefix || 'MASK';
	console.log(server_prefix + " - Source router required.");
	var express = require('express'),
	 	redirect = require('express-redirect'),
	 	bodyParser = require('body-parser');
	_Source = express.Router();
	_Source.use(function(req, res, next) {
		console.log(server_prefix + ' - Source router process');
		// process each Source request
		next();
	});
	// routes starting with '/'
	_Source.route('/')
		.all(function(req, res, next) {
			console.log(server_prefix + " - Source all");
			// process all, runs each time
			next();
		})
		.get(function(req, res, next) {
			console.log(server_prefix + " - Source get");
			// process the get (e.g. render)
			console.log(server_prefix + " - Source requested");
			// Distinguish based on an optional key-value parameter in the request url (e.g. '/?app=mydefaulttheme')
			var app = 'source'; // default
			var app_name = ''; // default
			// App List
			if(typeof configs.app_list === 'undefined'){
				var app_list = {};
			}
			else {
				var app_list = configs.app_list;
			}
			// Update app_name variable here with value from 'app' key (e.g. app=mydefaulttheme) sets app to 'mydefaulttheme' 
			if(req.query.app) {
				app_name = req.query.app;
				var app_not_found = true; // default to true
				// Lookup app in app list, if found set not_found to false
				for (key in app_list) {
					if(key == app_name) {
						app_name = key;
						app_not_found = false;
						break;
					}
				}//eof for
				if(app_not_found) {
					console.log(server_prefix + " - App requested, but not found: " + app_name);
					app = 'not_found';
				}
			}
			console.log(server_prefix + " - App requested: " + app_name);
			// Distinguish based on an optional key-value parameter in the request url (e.g. '/?source=0')
			var source = 0; // default
			// Update source variable here with value from 'source' key (e.g. source=0) sets source to 0 
			if(req.query.source) {
				source = req.query.source;
			}
			console.log(server_prefix + " - Source requested: " + source);
			// Distinguish based on an optional key-value parameter in the request url (e.g. '/?content_type=0')
			var content_type = 0; // default
			// Update content_type variable here with value from 'content_type' key (e.g. content_type=0) sets content_type to 0 
			if(req.query.content_type) {
				content_type = req.query.content_type;
			}
			console.log(server_prefix + " - Content-Type requested: " + content_type);
			if(typeof configs.title === 'undefined'){
				var title = 'Untitled';
			}
			else {
				var title = configs.title;
			}
			if(typeof configs.css_file_location === 'undefined') {
				var css_file_location = 'css/style.css';
			}
			else {
				var css_file_location = configs.css_file_location;
				// replace the css file name by the app name, if provided
				if(typeof app_name === 'undefined'){
					// continue without replacement
				}
				else {
					css_file_location = css_file_location.replace('style', app_name);
				}
			}
			if(typeof configs.access_control_allow_origin === 'undefined'){
				var access_control_allow_origin = '*';
			}
			else {
				var access_control_allow_origin = configs.access_control_allow_origin;
			}
			if(typeof configs.host === 'undefined'){
				var host = req.host;
			}
			else {
				var host = configs.host;
			}
			if(typeof configs.web_root === 'undefined'){
				var web_root = '';
			}
			else {
				var web_root = configs.web_root;
			}
		    res.render('sources/source', { title: title, css_file_location: css_file_location, access_control_allow_origin: access_control_allow_origin, host: host, web_root: web_root, app_name: app_name, content_type: content_type, source: source, layout: false });
		})
		.put(function(req, res, next) {
			console.log(server_prefix + " - Source put");
			// process the put (e.g. update)
			next();
		})
		.post(function(req, res, next) {
			console.log(server_prefix + " - Source post");
			// process the post (e.g. insert)
			next();
		})
		.delete(function(req, res, next) {
			console.log(server_prefix + " - Source delete");
			// process the delete (e.g. delete)
			next();
		});
	return _Source;
}();// calls itself