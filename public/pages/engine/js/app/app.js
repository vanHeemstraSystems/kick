var QuizEngine = (function(){
	console.log("QuizEngine - QuizEngine called");
    var Application = Marionette.Application.extend({});

    var application = new Application();

    application.addRegions({
        header: '[data-region=header]', // Not used right now
        body: '[data-region=body]',
        footer: '[data-region=footer]' // Not used right now
    });

    // application.on('initialize:after', function() { // Marionette 1 version
	application.on('start', function() { // Marionette 2 version
        Backbone.history.start();
    });

    return application;
})();