/*
 * ControllerBase
 */
define(function () {
    console.log('KICK: controllerBase called');
    function controllerBase(id) {
        this.id = id;
    };
    controllerBase.prototype = {
        setStoreName: function (storeName) {
            console.log('KICK: controllerBase setStoreName(storeName) called');
            this.storeName = storeName;
        },
        setAppController: function (appController) {
            console.log('KICK: controllerBase setAppController(appController) called');
            this.appController = appController;
            this.appController.setStoreName(this.storeName);
            this.appController.setConfig(this.config);
            this.appController.setServiceBus(this.serviceBus);
        },
        setAppEvent: function (appEvent) {
            console.log('KICK: controllerBase setAppEvent(appEvent) called');
            this.appEvent = appEvent;
            this.appController.setAppEvent(appEvent);
        },
        setAppService: function (appService) {
            console.log('KICK: controllerBase setAppService(appService) called');
            this.appService = appService;
            this.appController.setAppService(appService);
        },
        setApp: function (app) {
            console.log('KICK: controllerBase setApp(app) called');
            this.app = app;
            this.appController.setApp(app);
        },
        loadApp: function (id) {
            console.log('KICK: controllerBase loadApp(id) called');
            this.appController.loadApp(id);
        },   
        subscribeAppService: function() {
            console.log('KICK: controllerBase subscribeAppService() called');
            this.appController.subscribeAppService(); 
        },
        setConfig: function (config) {
            console.log('KICK: controllerBase setConfig(config) called');
            this.config = config;
        },    
        setServiceBus: function (serviceBus) {
            console.log('KICK: controllerBase setServiceBus(serviceBus) called');
            this.serviceBus = serviceBus;
        },
        setViewController: function (viewController) {
            console.log('KICK: controllerBase setViewController(viewController) called');
            this.viewController = viewController;
            this.viewController.setStoreName(this.storeName);
            this.viewController.setConfig(this.config);
            this.viewController.setServiceBus(this.serviceBus);
        },
        setViewEvent: function (viewEvent) {
            console.log('KICK: controllerBase setViewEvent(viewEvent) called');
            this.viewEvent = viewEvent;
            this.viewController.setViewEvent(viewEvent);
        },        
        setViewService: function (viewService) {
            console.log('KICK: controllerBase setViewService(viewService) called');
            this.viewService = viewService;
            this.viewController.setViewService(viewService);
        },
        setView: function (view) {
            console.log('KICK: controllerBase setView(view) called');
            this.view = view;
            this.viewController.setView(view);
        },
        loadView: function (id) {
            console.log('KICK: controllerBase loadView(id) called');
            this.viewController.loadView(id);
        },
        renderView: function (elementId) {
            console.log('KICK: controllerBase renderView(elementId) called');
            this.viewController.renderView(elementId);
        },
        subscribeViewService: function() {
            console.log('KICK: controllerBase subscribeViewService() called');
            this.viewController.subscribeViewService(); 
        }
    };
    return controllerBase;
});
