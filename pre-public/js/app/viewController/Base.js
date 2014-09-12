/*
 * ViewControllerBase
 */
define(function () {
	console.log('CORE: viewControllerBase called');
    function viewControllerBase(id) {
        this.id = id;
        this.viewArray = {};
    };
    function cloneObject(oldObject) {
    	function F() {}
    	F.prototype = oldObject;
    	return new F();
    };    
    viewControllerBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('CORE: viewControllerBase setServiceBus(serviceBus) called');			
			this.serviceBus = serviceBus;
		},
		setAppName: function (appName) {
			console.log('CORE: viewControllerBase setAppName(appName) called');
			this.appName = appName;
		},		
		setView: function (view) {
			console.log('CORE: viewControllerBase setView(view) called');			
			this.view = view;
			// view is a template, ready to be made specific based on the views in the config
			var app_not_found = true; // default to true
			// lookup app in app_list
			var configs = this.config.getConfigs();
			var app_list = configs.app_list;
			for (key in app_list) {
				if(key == this.appName) {
					console.log('CORE: viewControllerBase appName ' + this.appName + ' found in app_list');
					app_not_found = false;
					var app_configs = app_list[key];
					console.log('CORE: viewControllerBase app_configs')
					console.log(app_configs);
					// continue for views ....
					if(typeof app_configs.views === 'undefined') {
						console.log('CORE: viewControllerBase no views found for appName ' + this.appName);
						var views = {};
					}
					else {
						console.log('CORE: viewControllerBase views found for appName ' + this.appName);
						console.log(app_configs.views);
						var views = app_configs.views;
					}
					var i = 0;
					for (key in views) {
						console.log('CORE: viewControllerBase view ' + key + ' found in views');
						var view_keyValuePairs = views[key];
						console.log('CORE: viewControllerBase view ' + key + ' key value pairs:');
						console.log(view_keyValuePairs);
						// viewService is a template, ready to be made specific based on the new view's keyValuePairs
						// Create a new viewService
						var newViewService = cloneObject(this.viewService);
						newViewService.setServiceBus(this.serviceBus);
						// Set subscriptions to newViewService
						for(key in view_keyValuePairs) {
							if(key == 'subscriptions') {
								var subscriptions = view_keyValuePairs[key];
								console.log('CORE: viewControllerBase subscriptions in key value pairs:');
								console.log(subscriptions);
								newViewService.setSubscriptions(subscriptions);
							}
						}
						// Create a new view for these keyValuePairs
						var newView = cloneObject(this.view);
						newView.setKeyValuePairs(view_keyValuePairs);
						// Set new view service on the new view
						newView.setViewService(newViewService);
						// Add new view to view array
						this.viewArray[i] = newView;
						console.log('CORE: viewControllerBase viewArray [' + i + ']');
						console.log(this.viewArray[i]);
						// Increase i by 1
						i++;
					}
					console.log('CORE: viewControllerBase viewArray');
					console.log(this.viewArray);			
				}
			}// eof for
			if(app_not_found) {
				console.log('CORE: viewControllerBase appName ' + this.appName + 'not found in app_list');
			}
		},
		setViewService: function (viewService) {
			console.log('CORE: viewControllerBase setViewService(viewService) called');			
			this.viewService = viewService;
		},
		setViewEvent: function (viewEvent) {
			console.log('CORE: viewControllerBase setViewEvent(viewEvent) called');		
			this.viewEvent = viewEvent;
		},
		setConfig: function(config) {
			console.log('CORE: viewControllerBase setConfig(config) called');		
			this.config = config;
		},		
    	loadView: function (id) {
			console.log('CORE: viewControllerBase loadView(id) called'); 		
	        try {
	        	this.loadedView = this.viewArray[id];
				console.log('CORE: viewControllerBase loadedView:');
	        	console.log(this.loadedView);
	        }
	        catch(e) {
	        	console.log('CORE: viewControllerBase loadView(id) error:');
	        	console.log(e);
	        }
	    },
	    subscribeViewService: function() {
			console.log('CORE: viewControllerBase subscribeViewService() called'); 	    	
	        for (key in this.viewArray) {
	        	console.log('CORE: viewControllerBase view ' + key + ' in viewArray');
	        	var view = this.viewArray[key];
	        	console.log(view);
	        	for (key in view) {
	        		if (key == 'viewService') {
	        			var viewService = view[key];
	        			viewService.subscribe();
	        		}
	        	}
	        }
	    },
        renderView: function (elementId) {
			console.log('CORE: viewControllerBase renderView(elementId) called');       	
			this.loadedView.renderView(elementId); // NOTE: Use the loaded View !!
        }
    };
    return viewControllerBase;
});