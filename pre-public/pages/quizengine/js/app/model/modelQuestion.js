console.log("QuizEngine - Data.Question called");
QuizEngine.module('Data', function(Data) {
    Data.Question = Backbone.Model.extend({
        defaults: {
            id: null,
            text: "",
            correctAnswer: 0,
            answers: []
        },
        initialize: function() {
			console.log("QuizEngine - Data.Question.initialize called");		
            var answers = this.get('answers');
            this.set('answers', new Data.Answers(answers));
        },
        // Custom toJSON
        toJSON: function() {
			console.log("QuizEngine - Data.Question.toJSON called");		
            var data = Backbone.Model.prototype.toJSON.call(this);
            if (data.answers && data.answers.toJSON) {
                data.answers = data.answers.toJSON();
            }
            if (!data.id) {
                data.id = this.cid;
            }
            return data;
        }
    });
});