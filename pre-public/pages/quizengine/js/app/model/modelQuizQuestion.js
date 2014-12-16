QuizEngine.module('Data', function(Data) {
    console.log("QuizEngine - Data.QuizQuestion called");     
    Data.QuizQuestion = Backbone.Model.extend({
        defaults: {
            question: null,
            chosenAnswer: null
        },
        initialize: function() {
            console.log("QuizEngine - modelQuizQuestion.initialize called"); 
            var q = this.get('question');

            if (_.isNumber(q) || _.isString(q)) {
                // If all we have is an identifier, retrieve the actual question
                this.set('question', QuizEngine.module('Data').questions.getQuestion(q));
            }
        },
        isCorrect: function() {
            console.log("QuizEngine - modelQuizQuestion.isCorrect called");            
            return this.get('chosenAnswer') === this.get('question').get('correctAnswer');
        },
        // Custom toJSON to also JSONify 'question'
        toJSON: function() {
            console.log("QuizEngine - modelQuizQuestion.toJSON called");            
            var data = Backbone.Model.prototype.toJSON.call(this);
            if (data.question && data.question.toJSON) {
                data.question = data.question.toJSON();
            }
            if (!data.id) {
                data.id = this.cid;
            }
            return data;
        }
    });
});