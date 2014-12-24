console.log("QuizEngine - view Quiz1 (QuizList) called");
QuizEngine.module('QuizList', function(QuizList) {
	console.log("QuizEngine - item view QuizList.QuizView called");

	QuizList.QuizView = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#quizlist-quiz',
        templateHelpers: function() {
			console.log("QuizEngine - item view QuizList.QuizView.templateHelpers called");		
            var model = this.model;

            return {
                score: function() {
					console.log("QuizEngine - item view QuizList.QuizView.score called");
                    return model.isInProgress() ? "In Progress" : model.getScore() + "%";
                },
                id: function() {
					console.log("QuizEngine - item view QuizList.QuizView.id called");
                    return model.cid;
                },
                viewAction: function() {
					console.log("QuizEngine - item view QuizList.QuizView.viewAction called");
                    return model.isComplete() ? "Review" : "Continue";
                }
            };
        },

        events: {
            'click [data-action=delete]': 'deleteQuiz'
        },

        deleteQuiz: function() {
			console.log("QuizEngine - item view QuizList.QuizView.deleteQuiz called");
            this.model.destroy();
        }
    });

});