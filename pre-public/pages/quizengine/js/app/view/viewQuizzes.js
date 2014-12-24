QuizEngine.module('QuizList', function(QuizList) {
    
    QuizList.QuizzesView = Marionette.CompositeView.extend({
        template: '#quizlist-quizzes',
        childView: QuizList.QuizView,
        childViewContainer: '[data-item-view-container]',
        
        emptyView: QuizList.NoQuizzesView
    });

});