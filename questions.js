var unirest = require('unirest');

var NewQuestion = function() {
	this.question = null;
	this.answer = null;
	this.fakeAnswers = [];
}

NewQuestion.prototype.getSimilarAnswers = function() {
	var url = 'https://wordsapiv1.p.mashape.com/words/'
	var options = {'X-Mashape-Key': 'Q3mEcts35FmshxFGDp94g0ach9F0p1IfiAWjsnD2iNV7FBSpcG'};

	unirest.get(url + this.answer, options, function(req, res) {
		req.results.forEach(function(result) {
			unirest.get(url + result.typeOf, options, function(req, res) {
				req.results.forEach(function(result) {
					result.hasInstances.forEach(function(instance) {
						this.fakeAnswers.push(instance);
					});
				});
			});
		});
	});
}


function createNewQuestionObject() {
	var questionObject = new NewQuestion();

	unirest.get('http://jservice.io/api/random', function(req, res) {
		questionObject.question = req.body[0].question;
		questionObject.answer = req.body[0].answer;
		questionObject.getSimilarAnswers();
	});

	return questionObject;
}

module.exports = {
	store: [],
	storeSize: 0,
	reloadStore: function () {
		while (this.store.length < this.storeSize) {
			this.store.push(createNewQuestionObject());
		}
	}
}	