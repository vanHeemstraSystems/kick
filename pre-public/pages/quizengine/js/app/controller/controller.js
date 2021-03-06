QuizEngine.Helpers = QuizEngine.Helpers || {};
QuizEngine.Helpers.SubAppManager = (function() {
	console.log("QuizEngine - QuizEngine.Helpers.SubAppManager called");
    var SubAppManager = Marionette.Controller.extend({
        startSubApp: function(name, args) {
			console.log("QuizEngine - QuizEngine.Helpers.SubAppManager.startSubApp called");
			console.log("QuizEngine - name: " + name);
			console.log("QuizEngine - args: " + args);
            var newApp = QuizEngine.module(name);

            if (this.currentApp === newApp) {
                return;
            }

            if (this.currentApp) {
                this.currentApp.stop();
                // Nothing Responds to it, but can be an extension point
                QuizEngine.vent.trigger('subapp:stopped', this.currentAppName);
            }

            this.currentApp = newApp;
            this.currentAppName = name;

            newApp.start(args);
            // Nothing Responds to it, but can be an extension point
            QuizEngine.vent.trigger('subapp:started', name);
        }
    });

    var manager = new SubAppManager();
    QuizEngine.commands.setHandler('subapp:start', manager.startSubApp, manager);

    return manager;

})();