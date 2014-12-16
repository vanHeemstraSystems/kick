QuizEngine.module('Data', function(Data) {
    console.log("QuizEngine - Data.Question called");     
    Data.Question = Backbone.Model.extend({
        defaults: {
            id: null,
            text: "",
            correctAnswer: 0,
            answers: []
        },
        initialize: function() {
            console.log("QuizEngine - modelQuestion.initialize called"); 
            var answers = this.get('answers');
            this.set('answers', new Data.Answers(answers));
        },
        // Custom toJSON
        toJSON: function() {
            console.log("QuizEngine - modelQuestion.toJSON called");
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