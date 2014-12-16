QuizEngine.module('Data', function(Data) {
    console.log("QuizEngine - Data.QuizQuestions called");     
    Data.QuizQuestions = Backbone.Collection.extend({
        model: Data.QuizQuestion
    });
});