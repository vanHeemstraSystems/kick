QuizEngine.module('Data', function(Data) {
    console.log("QuizEngine - Data.Quizzes called");     
    Data.Quizzes = Backbone.Collection.extend({
        model: Data.Quiz,
        createQuiz: function(name, questions) {
            console.log("QuizEngine - modelQuizzes.createQuiz called");
            var quiz = {
                name: name,
                questions: []
            };
            _.each(questions, function(question) {
                quiz.questions.push({
                    question: question
                });
            });
            return this.add(quiz);
        }
    });
});