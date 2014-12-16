QuizEngine.module('Data', function(Data) {
    console.log("QuizEngine - Data.Questions called");     
    Data.Questions = Backbone.Collection.extend({
        model: Data.Question
    });
});