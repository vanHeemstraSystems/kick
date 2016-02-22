/*
 * MainBase
 */
define(function () {
    console.log('KICK: mainBase called');
    function mainBase(id, require) {
        this.id = id;
        this.require = require;
	    var $ = require('jquery'),
	        backbone = require('backbone'),
	        underscore = require('underscore'),
	        lodash = require('lodash'),
	        jquery = require('jquery'),
	        bootstrap = require('bootstrap'), // bootstrap extends jquery
	        expect = require('expect'),
	        mocha = require('mocha'),
	        jquerypp = require('jquerypp.custom'),
	        framewarp = require('framewarp');
    };
    mainBase.prototype = {
        setLib: function(lib) {
        	console.log('KICK: mainBase setLib(lib) called');
        	this.lib = lib;
        },
        setConfig: function(config) {
        	console.log('KICK: mainBase setConfig(config) called');
        	this.config = config;
        },
        setController: function(controller) {
        	console.log('KICK: mainBase setController(controller) called');
        	this.controller = controller;
        },
        setStoreName: function(storeName) {
        	console.log('KICK: mainBase setStoreName(storeName) called: storeName =');
        	console.log(storeName);
        	this.storeName = storeName;
        },  
        setElementId: function(elementId) {
        	console.log('KICK: mainBase setElementId(elementId) called: elementId =');
        	console.log(elementId);
        	this.elementId = elementId;
        }, 
        setApp: function(app) {
        	console.log('KICK: mainBase setApp(app) called');
        	this.app = app;
        },
        setAppController: function(appController) {
        	console.log('KICK: mainBase setAppController(appController) called');
        	this.appController = appController;
        },
        setAppEvent: function(appEvent) {
        	console.log('KICK: mainBase setAppEvent(appEvent) called');
        	this.appEvent = appEvent;
        },
        setAppService: function(appService) {
        	console.log('KICK: mainBase setAppService(appService) called');
        	this.appService = appService;
        },
        setServiceBus: function(serviceBus) {
        	console.log('KICK: mainBase setServiceBus(serviceBus) called');
        	this.serviceBus = serviceBus;
        },
        setView: function(view) {
        	console.log('KICK: mainBase setView(view) called');
        	this.view = view;
        },
        setViewController: function(viewController) {
        	console.log('KICK: mainBase setViewController(viewController) called');
        	this.viewController = viewController;
        },
        setViewService: function(viewService) {
        	console.log('KICK: mainBase setViewService(viewService) called');
        	this.viewService = viewService;
        },
        setViewEvent: function(viewEvent) {
        	console.log('KICK: mainBase setViewEvent(viewEvent) called');
        	this.viewEvent = viewEvent;
        },
        setViewIndex: function(viewIndex) {
        	console.log('KICK: mainBase setViewIndex(viewIndex) called');
        	this.viewIndex = viewIndex;
        },
        loadView: function(viewIndex) {
        	console.log('KICK: mainBase loadView(viewIndex) called');
        	this.controller.loadView(viewIndex);
        },
        renderView: function(elementId) {
        	console.log('KICK: mainBase renderView(elementId) called');
        	this.controller.renderView(elementId);
        },
        readyController: function(me, callback) {
        	console.log('KICK: mainBase readyController(me, callback) called');
        	var err = null;
			if(typeof me.controller === 'undefined') {
				me.require(['../app/controller/controller'], function (controller) {
                    console.log('KICK: mainBase: controller required');
                    console.log(controller);
                    me.controller = controller; 
                    callback(me, err, me.controller);
            	});
            }
			else {
				me.controller = me.controller;
				console.log(me.controller);
        		callback(me, err, me.controller);
        	}
    	},
        readyConfig: function(me, callback) {
        	console.log('KICK: mainBase readyConfig(me, callback) called');
        	var err = null;
			if(typeof me.config === 'undefined') {
				me.require(['../app/config/config'], function (config) {
                    console.log('KICK: mainBase: config required');
                    console.log(config);
                    me.config = config; 
                    callback(me, err, me.config);
            	});
            }
			else {
				me.config = me.config;
				console.log(me.config);
        		callback(me, err, me.config);
        	}
    	},
        readyServiceBus: function(me, callback) {
        	console.log('KICK: mainBase readyServiceBus(me, callback) called');
        	var err = null;
			if(typeof me.serviceBus === 'undefined') {
				me.require(['../app/serviceBus/serviceBus'], function (serviceBus) {
                    console.log('KICK: mainBase: serviceBus required');
                    console.log(serviceBus);
                    me.serviceBus = serviceBus; 
                    callback(me, err, me.serviceBus);
            	});
            }
			else {
				me.serviceBus = me.serviceBus;
				console.log(me.serviceBus);
        		callback(me, err, me.serviceBus);
        	}
    	},
        readyAppController: function(me, callback) {
        	console.log('KICK: mainBase readyAppController(me, callback) called');
        	var err = null;
			if(typeof me.appController === 'undefined') {
				me.require(['../app/appController/appController'], function (appController) {
                    console.log('KICK: mainBase: appController required');
                    console.log(appController);
                    me.appController = appController; 
                    callback(me, err, me.appController);
            	});
            }
			else {
				me.appController = me.appController;
				console.log(me.appController);
        		callback(me, err, me.appController);
        	}
    	},
        readyAppService: function(me, callback) {
        	console.log('KICK: mainBase readyAppService(me, callback) called');
        	var err = null;
			if(typeof me.appService === 'undefined') {
				me.require(['../app/appService/appService'], function (appService) {
                    console.log('KICK: mainBase: appService required');
                    console.log(appService);
                    me.appService = appService; 
                    callback(me, err, me.appService);
            	});
            }
			else {
				me.appService = me.appService;
				console.log(me.appService);
        		callback(me, err, me.appService);
        	}
    	},
        readyApp: function(me, callback) {
        	console.log('KICK: mainBase readyApp(me, callback) called');
        	var err = null;
			if(typeof me.app === 'undefined') {
				me.require(['../app/app/app'], function (app) {
                    console.log('KICK: mainBase: app required');
                    console.log(app);
                    me.app = app; 
                    callback(me, err, me.app);
            	});
            }
			else {
				me.app = me.app;
				console.log(me.app);
        		callback(me, err, me.app);
        	}
    	},
        readyAppEvent: function(me, callback) {
        	console.log('KICK: mainBase readyAppEvent(me, callback) called');
        	var err = null;
			if(typeof me.appEvent === 'undefined') {
				me.require(['../app/appEvent/appEvent'], function (appEvent) {
                    console.log('KICK: mainBase: appEvent required');
                    console.log(appEvent);
                    me.appEvent = appEvent; 
                    callback(me, err, me.appEvent);
            	});
            }
			else {
				me.appEvent = me.appEvent;
				console.log(me.appEvent);
        		callback(me, err, me.appEvent);
        	}
    	},
        readyViewController: function(me, callback) {
        	console.log('KICK: mainBase readyViewController(me, callback) called');
        	var err = null;
			if(typeof me.viewController === 'undefined') {
				me.require(['../app/viewController/viewController'], function (viewController) {
                    console.log('KICK: mainBase: viewController required');
                    console.log(viewController);
                    me.viewController = viewController; 
                    callback(me, err, me.viewController);
            	});
            }
			else {
				me.viewController = me.viewController;
				console.log(me.viewController);
        		callback(me, err, me.viewController);
        	}
    	},
        readyViewService: function(me, callback) {
        	console.log('KICK: mainBase readyViewService(me, callback) called');
        	var err = null;
			if(typeof me.viewService === 'undefined') {
				me.require(['../app/viewService/viewService'], function (viewService) {
                    console.log('KICK: mainBase: viewService required');
                    console.log(viewService);
                    me.viewService = viewService; 
                    callback(me, err, me.viewService);
            	});
            }
			else {
				me.viewService = me.viewService;
				console.log(me.viewService);
        		callback(me, err, me.viewService);
        	}
    	},
        readyView: function(me, callback) {
        	console.log('KICK: mainBase readyView(me, callback) called');
        	var err = null;
			if(typeof me.view === 'undefined') {
				me.require(['../app/view/view'], function (view) {
                    console.log('KICK: mainBase: view required');
                    console.log(view);
                    me.view = view; 
                    callback(me, err, me.view);
            	});
            }
			else {
				me.view = me.view;
				console.log(me.view);
        		callback(me, err, me.view);
        	}
    	},
        readyViewEvent: function(me, callback) {
        	console.log('KICK: mainBase readyViewEvent(me, callback) called');
        	var err = null;
			if(typeof me.viewEvent === 'undefined') {
				me.require(['../app/viewEvent/viewEvent'], function (viewEvent) {
                    console.log('KICK: mainBase: viewEvent required');
                    console.log(viewEvent);
                    me.viewEvent = viewEvent; 
                    callback(me, err, me.viewEvent);
            	});
            }
			else {
				me.viewEvent = me.viewEvent;
				console.log(me.viewEvent);
        		callback(me, err, me.viewEvent);
        	}
    	},
        ready: function() {
        	console.log('KICK: mainBase ready() called');
        	var me = this; // contains the current context
        	// Controller
        	me.readyController(me, function(me, err, controller) {
        		if(err) {
        			console.log('KICK: mainBase readyController error:');
        			console.log(err);
        		}
        		else {
        			console.log('KICK: mainBase ready controller:');
        			console.log(controller);
        			me.controller = controller;
					// Set storeName
				    console.log('KICK: mainBase ready me.controller.setStoreName(me.storeName):');
					// StoreName
					if(typeof me.storeName === 'undefined') {
						me.storeName = 'unknown'; // default
						console.log(me.storeName);
						me.controller.setStoreName(me.storeName);
					}
					else {
						me.storeName = me.storeName;
						console.log(me.storeName);
						me.controller.setStoreName(me.storeName);
					}
					// Config
					me.readyConfig(me, function(me, err, config) {
						if(err) {
							console.log('KICK: mainBase readyConfig error:');
							console.log(err);
						}
						else {
							console.log('KICK: mainBase ready config:');
							console.log(config);
							me.config = config;
							// Set config
							console.log('KICK: mainBase ready me.controller.setConfig(me.config):');
							// Config
							if(typeof me.config === 'undefined') {
								me.config = {}; // default
								console.log(me.config);
								me.controller.setConfig(me.config);
							}
							else {
								me.config = me.config;
								console.log(me.config);
								me.controller.setConfig(me.config);
							}
							// ServiceBus
							me.readyServiceBus(me, function(me, err, serviceBus) {
								if(err) {
									console.log('KICK: mainBase readyServiceBus error:');
									console.log(err);
								}
								else {
									console.log('KICK: mainBase ready serviceBus:');
									console.log(serviceBus);
									me.serviceBus = serviceBus;
									// Set serviceBus
									console.log('KICK: mainBase ready me.controller.setServiceBus(me.serviceBus):');
									// ServiceBus
									if(typeof me.serviceBus === 'undefined') {
										me.serviceBus = {}; // default
										console.log(me.serviceBus);
										me.controller.setServiceBus(me.serviceBus);
									}
									else {
										me.serviceBus = me.serviceBus;
										console.log(me.serviceBus);
										me.controller.setServiceBus(me.serviceBus);
									}
									// AppController
									me.readyAppController(me, function(me, err, appController) {
										if(err) {
											console.log('KICK: mainBase readyAppController error:');
											console.log(err);
										}
										else {
											console.log('KICK: mainBase ready appController:');
											console.log(appController);
											me.appController = appController;
											// Set appController
											console.log('KICK: mainBase ready me.controller.setAppController(me.appController):');
											// AppController
											if(typeof me.appController === 'undefined') {
												me.appController = {}; // default
												console.log(me.appController);
												me.controller.setAppController(me.appController);
											}
											else {
												me.appController = me.appController;
												console.log(me.appController);
												me.controller.setAppController(me.appController);
											}
											// AppService
											me.readyAppService(me, function(me, err, appService) {
												if(err) {
													console.log('KICK: mainBase readyAppService error:');
													console.log(err);
												}
												else {
													console.log('KICK: mainBase ready appService:');
													console.log(appService);
													me.appService = appService;
													// Set appService
													console.log('KICK: mainBase ready me.controller.setAppService(me.appService):');
													// AppService
													if(typeof me.appService === 'undefined') {
														me.appService = {}; // default
														console.log(me.appService);
														me.controller.setAppService(me.appService);
													}
													else {
														me.appService = me.appService;
														console.log(me.appService);
														me.controller.setAppService(me.appService);
													}
													// App
													me.readyApp(me, function(me, err, app) {
														if(err) {
															console.log('KICK: mainBase readyApp error:');
															console.log(err);
														}
														else {
															console.log('KICK: mainBase ready app:');
															console.log(app);
															me.app = app;
															// Set app
															console.log('KICK: mainBase ready me.controller.setApp(me.app):');
															// App
															if(typeof me.app === 'undefined') {
																me.app = {}; // default
																console.log(me.app);
																me.controller.setApp(me.app);
															}
															else {
																me.app = me.app;
																console.log(me.app);
																me.controller.setApp(me.app);
															}
															// AppEvent
															me.readyAppEvent(me, function(me, err, appEvent) {
																if(err) {
																	console.log('KICK: mainBase readyAppEvent error:');
																	console.log(err);
																}
																else {
																	console.log('KICK: mainBase ready appEvent:');
																	console.log(appEvent);
																	me.appEvent = appEvent;
																	// Set appEvent
																	console.log('KICK: mainBase ready me.controller.setAppEvent(me.appEvent):');
																	// AppEvent
																	if(typeof me.appEvent === 'undefined') {
																		me.appEvent = {}; // default
																		console.log(me.appEvent);
																		me.controller.setAppEvent(me.appEvent);
																	}
																	else {
																		me.appEvent = me.appEvent;
																		console.log(me.appEvent);
																		me.controller.setAppEvent(me.appEvent);
																	}
																	// Subscribe AppService
																	console.log('KICK: mainBase ready this.controller.subscribeAppService()');			    
				    												me.controller.subscribeAppService();
				    												// More ...


																}
															});// eof AppEvent
														}
													});// eof App
												}
											});// eof AppService
										}
									});// eof AppController
									// ViewController
									me.readyViewController(me, function(me, err, viewController) {
										if(err) {
											console.log('KICK: mainBase readyViewController error:');
											console.log(err);
										}
										else {
											console.log('KICK: mainBase ready viewController:');
											console.log(viewController);
											me.viewController = viewController;
											// Set viewController
											console.log('KICK: mainBase ready me.controller.setViewController(me.viewController):');
											// ViewController
											if(typeof me.viewController === 'undefined') {
												me.viewController = {}; // default
												console.log(me.viewController);
												me.controller.setViewController(me.viewController);
											}
											else {
												me.viewController = me.viewController;
												console.log(me.viewController);
												me.controller.setViewController(me.viewController);
											}
											// ViewService
											me.readyViewService(me, function(me, err, viewService) {
												if(err) {
													console.log('KICK: mainBase readyViewService error:');
													console.log(err);
												}
												else {
													console.log('KICK: mainBase ready viewService:');
													console.log(viewService);
													me.viewService = viewService;
													// Set viewService
													console.log('KICK: mainBase ready me.controller.setViewService(me.viewService):');
													// ViewService
													if(typeof me.viewService === 'undefined') {
														me.viewService = {}; // default
														console.log(me.viewService);
														me.controller.setViewService(me.viewService);
													}
													else {
														me.viewService = me.viewService;
														console.log(me.viewService);
														me.controller.setViewService(me.viewService);
													}
													// View
													me.readyView(me, function(me, err, view) {
														if(err) {
															console.log('KICK: mainBase readyView error:');
															console.log(err);
														}
														else {
															console.log('KICK: mainBase ready view:');
															console.log(view);
															me.view = view;
															// Set view
															console.log('KICK: mainBase ready me.controller.setView(me.view):');
															// View
															if(typeof me.view === 'undefined') {
																me.view = {}; // default
																console.log(me.view);
																me.controller.setView(me.view);
															}
															else {
																me.view = me.view;
																console.log(me.view);
																me.controller.setView(me.view);
															}
															// ViewEvent
															me.readyViewEvent(me, function(me, err, viewEvent) {
																if(err) {
																	console.log('KICK: mainBase readyViewEvent error:');
																	console.log(err);
																}
																else {
																	console.log('KICK: mainBase ready viewEvent:');
																	console.log(viewEvent);
																	me.viewEvent = viewEvent;
																	// Set viewEvent
																	console.log('KICK: mainBase ready me.controller.setViewEvent(me.viewEvent):');
																	// ViewEvent
																	if(typeof me.viewEvent === 'undefined') {
																		me.viewEvent = {}; // default
																		console.log(me.viewEvent);
																		me.controller.setViewEvent(me.viewEvent);
																	}
																	else {
																		me.viewEvent = me.viewEvent;
																		console.log(me.viewEvent);
																		me.controller.setViewEvent(me.viewEvent);
																	} // eof ViewEvent
																	// Subscribe ViewService
																	console.log('KICK: mainBase ready me.controller.subscribeViewService()');			    
				    												me.controller.subscribeViewService();
				    												// LoadView, before renderView
                                                                    console.log('KICK: mainBase ready me.controller.loadView(viewIndex):')
                                                                    // ViewIndex
                                                                    if(typeof me.viewIndex === 'undefined') {
                                                                        me.viewIndex = 0; // default
                                                                        console.log(me.viewIndex);
                                                                        me.controller.loadView(me.viewIndex);
                                                                    }
                                                                    else {
                                                                        me.viewIndex = me.viewIndex;
                                                                        console.log(me.viewIndex);
                                                                        me.controller.loadView(me.viewIndex);
                                                                    }// oef ViewIndex
                                                                    // RenderView, after loadView
                                                                    console.log('KICK: mainBase ready me.controller.renderView(elementId):'); 
                                                                    // ElementId
                                                                    if(typeof me.elementId === 'undefined'){
                                                                        me.elementId = 'unknown'; // default
                                                                        console.log(me.elementId);            
                                                                        me.controller.renderView(me.elementId);
                                                                    }
                                                                    else {
                                                                        me.elementId = me.elementId;
                                                                        console.log(me.elementId);
                                                                        me.controller.renderView(me.elementId);
                                                                    }// eof ElementId
																}
															});// eof ViewEvent
														}
													});// eof View
												}
											});// eof ViewService
										}
									});// eof ViewController
								}
							});// eof ServiceBus
						}
					});// eof Config
        		}
        	});// eof Controller
        }
    };
    return mainBase;
});
