/*
 * Index router
 */
module.exports = function(req, res, next) {	
	var _Index = {};
	config = require('../configs/server.js');
	var configs = config.configs,
	    server_prefix = configs.server_prefix || 'MASK';
	console.log(server_prefix + " - Index router required.");
	var express = require('express'),
	 	redirect = require('express-redirect'),
	 	bodyParser = require('body-parser');
	_Index = express.Router();
	_Index.use(function(req, res, next) {
		console.log(server_prefix + ' - Index router process');
		// process each index request
		next();
	});
	// routes starting with '/'
	_Index.route('/')
		.all(function(req, res, next) {
			console.log(server_prefix + " - Index all");
			// process all, runs each time
			next();
		})
		.get(function(req, res, next) {
			console.log(server_prefix + " - Index get");
			// process the get (e.g. render)
			console.log(server_prefix + " - Page requested");
			// Distinguish based on an optional key-value parameter in the request url (e.g. '/?app=mydefaultstore')
			var app = 'page'; // default
			var app_name = ''; // default
			// App List
			if(typeof configs.app_list === 'undefined'){
				var app_list = {};
			}
			else {
				var app_list = configs.app_list;
			}
			// Update app_name variable here with value from 'app' key (e.g. app=mydefaultstore) sets app to 'mydefaultstore' 
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
			// Distinguish based on an optional key-value parameter in the request url (e.g. '/?view=0')
			var view = 0; // default
			var views = 'views';
			var view_index = 0; // default
			// Update view_index variable here with value from 'view' key (e.g. view=0) sets view to 0 
			if(req.query.view) {
				view_index = req.query.view;
				var view_not_found = true; // default to true
				// Lookup view in app list, if found set not_found to false
				for (key in app_list) {
					if(key == app_name) {
						app_name = key;
						app_value = app_list[key];
						for(key in app_value) {
							if(key == views) {
								views = key;
								views_value = app_value[key];
								for(key in views_value) {
									if(key == view_index) {
										view_not_found = false;
										break;
									}
								}
							}
						}
					}
				}//eof for
				if(view_not_found) {
					console.log(server_prefix + " - View requested, but not found: " + view_index);
					view = 'not_found';
				}
			}
			console.log(server_prefix + " - View requested: " + view_index);
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
		    res.render('pages/page', { title: title, css_file_location: css_file_location, access_control_allow_origin: access_control_allow_origin, host: host, web_root: web_root, app_name: app_name, view_index: view_index, layout: false });
		})
		.put(function(req, res, next) {
			console.log(server_prefix + " - Index put");
			// process the put (e.g. update)
			next();
		})
		.post(function(req, res, next) {
			console.log(server_prefix + " - Index post");
			// process the post (e.g. insert)
			next();
		})
		.delete(function(req, res, next) {
			console.log(server_prefix + " - Index delete");
			// process the delete (e.g. delete)
			next();
		});
	return _Index;
}();// calls itself