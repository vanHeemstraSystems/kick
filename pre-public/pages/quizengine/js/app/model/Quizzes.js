QuizEngine.module('Data', function(Data) {    Data.Categories = Backbone.Collection.extend({        model: Data.Quiz    });});