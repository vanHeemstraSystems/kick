console.log("QuizEngine - QuizEngine.Router called");
QuizEngine.Router = Marionette.AppRouter.extend({
    routes: {
        "": "redirectToMain"
    },

    redirectToMain: function() {
		console.log("QuizEngine - QuizEngine.Router.redirectToMain called");
        Backbone.history.navigate('list', { trigger: true, replace: true});
    }
});

QuizEngine.addInitializer(function() {
	console.log("QuizEngine - QuizEngine.addInitializer called");
    QuizEngine.router = new QuizEngine.Router();
});