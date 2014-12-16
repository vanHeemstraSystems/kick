QuizEngine.module('Data', function(Data) {
    console.log("QuizEngine - Data.Categories called"); 
    Data.Categories = Backbone.Collection.extend({
        model: Data.Category,
        getQuestion: function(id) {
            console.log("QuizEngine - modelCategories.getQuestion called"); 
            var question = null;
            this.each(function(category) {
                var tempQuestion = category.getQuestion(id);
                if (tempQuestion) {
                    question = tempQuestion;
                    return false;
                }
            });
            return question;
        },
        getQuestionsByCategories: function(categories) {
            console.log("QuizEngine - modelCategories.getQuestionsByCategories called");           
            var self = this;
            if (_.isArray(categories)) {
                var questions = [];
                _.each(categories, function(categoryId){
                    questions.push(self.get(categoryId).getQuestions());
                });
                return _.flatten(questions);
            }
            if (_.isNumber(categories) || _.isString(categories)) {
                return this.get(categories).getQuestions();
            }
            return null;
        }
    });
});