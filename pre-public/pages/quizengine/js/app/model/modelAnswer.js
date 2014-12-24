console.log("QuizEngine - Data.Answer called");
QuizEngine.module('Data', function(Data) {
    Data.Answer = Backbone.Model.extend({
        defaults: {
            text: ""
        },
        // Custom toJSON
        toJSON: function() {
			console.log("QuizEngine - Data.Answer.toJSON called");		
            var data = Backbone.Model.prototype.toJSON.call(this);
            return data;
        }
    });
});