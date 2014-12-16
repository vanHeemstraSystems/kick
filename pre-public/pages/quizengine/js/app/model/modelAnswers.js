QuizEngine.module('Data', function(Data) {
    console.log("QuizEngine - Data.Answers called");    
    Data.Answers = Backbone.Collection.extend({
        model: Data.Answer
    });
});