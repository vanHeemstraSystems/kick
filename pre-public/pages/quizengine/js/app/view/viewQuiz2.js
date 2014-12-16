QuizEngine.module('Quiz', function(Quiz) {
    
    //OLD Quiz.QuizView = Marionette.Layout.extend({
    Quiz.QuizView = Marionette.LayoutView.extend({    
        template: '#quiz-quiz',
        emptyTemplate: '#quiz-quiz404',

        getTemplate: function() {
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