var QuizEngine = (function(){
    console.log("QuizEngine - main called");
    var Application = Marionette.Application.extend({});
    var application = new Application();
    application.addRegions({
        header: '[data-region=header]', // Not used right now
        body: '[data-region=body]',
        footer: '[data-region=footer]' // Not used right now
    });
    application.on('initialize:after', function() {
        console.log("QuizEngine - main initialize:after called");        
        Backbone.history.start();
    });
    return application;
})();