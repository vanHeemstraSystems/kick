QuizEngine.module('Data', function(Data) {
    console.log("QuizEngine - Data.Answer called");
    Data.Answer = Backbone.Model.extend({
        defaults: {
            text: ""
        },
        // Custom toJSON
        toJSON: function() {
            console.log("QuizEngine - modelAnswer.toJSON called");
            var data = Backbone.Model.prototype.toJSON.call(this);
            return data;
        }
    });
});