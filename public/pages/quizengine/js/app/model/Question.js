QuizEngine.module("Data",function(e){e.Question=Backbone.Model.extend({defaults:{id:null,text:"",correctAnswer:0,answers:[]},initialize:function(){var t=this.get("answers");this.set("answers",new e.Answers(t))},toJSON:function(){var e=Backbone.Model.prototype.toJSON.call(this);return e.answers&&e.answers.toJSON&&(e.answers=e.answers.toJSON()),e.id||(e.id=this.cid),e}})});