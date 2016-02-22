console.log("QuizEngine - view Quiz2 (Quiz) called");
QuizEngine.module('Quiz', function(Quiz) {
	console.log("QuizEngine - layout view Quiz.QuizView called");
    //OLD Quiz.QuizView = Marionette.Layout.extend({
	Quiz.QuizView = Marionette.LayoutView.extend({
        template: '#quiz-quiz',
        emptyTemplate: '#quiz-quiz404',

        getTemplate: function() {
			console.log("QuizEngine - layout view Quiz.QuizView.getTemplate called");
            if (this.model) {
                return this.template;
            }
            else {
                return this.emptyTemplate;
            }
        },

        regions: {
            quizData: '[data-region=quizData]'
        }
    });

});