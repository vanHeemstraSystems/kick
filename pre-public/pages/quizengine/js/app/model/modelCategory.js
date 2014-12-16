QuizEngine.module('Data', function(Data) {
    console.log("QuizEngine - Data.Category called");    
    Data.Category = Backbone.Model.extend({
        defaults: {
            name: "",
            questions: null
        },
        initialize: function() {
            console.log("QuizEngine - modelCategory.initialize called"); 
            var questions = this.get('questions');
            this.set('questions', new Data.Questions(questions));
        },
        getQuestion: function(id) {
            console.log("QuizEngine - modelCategory.getQuestion called");
            return this.get('questions').get(id);
        },
        getQuestions: function() {
            console.log("QuizEngine - modelCategory.getQuestions called");
            return this.get('questions').models;
        },
        // Custom toJSON to also JSONify 'questions'
        toJSON: function() {
            console.log("QuizEngine - modelCategory.toJSON called");
            var data = Backbone.Model.prototype.toJSON.call(this);
            if (data.questions && data.questions.toJSON) {
                data.questions = data.questions.toJSON();
            }
            if (!data.id) {
                data.id = this.cid;
            }
            return data;
        }
    });
});