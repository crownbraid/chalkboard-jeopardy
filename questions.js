const unirest = require('unirest');

class Question {
	constructor() {
		this.question = null;
		this.answer = null;
		this.fakeAnswers = [];
		this.prepareQuestion();
	}

	prepareQuestion() {
		unirest.get('http://jservice.io/api/random', (req, res) => {
			this.question = req.body[0].question;
			this.answer = req.body[0].answer;
			this.getSimilarAnswers();
		});
	}

	getSimilarAnswers() {
		const url = 'https://wordsapiv1.p.mashape.com/words/';
		const options = {'X-Mashape-Key': 'Q3mEcts35FmshxFGDp94g0ach9F0p1IfiAWjsnD2iNV7FBSpcG'};

		unirest.get(url + this.answer, options, (req, res) => {
			req.results.forEach( result => {
				unirest.get(url + result.typeOf, options, (req, res) => {
					req.results.forEach( result => {
						result.hasInstances.forEach( instance => {
							this.fakeAnswers.push(instance);
						});
					});
				});
			});
		});
	}
};

module.exports = {
	store: [],
	storeSize: 0,
	reloadStore() {
		while (this.store.length < this.storeSize) {
			this.store.push(new Question);
		}
	}
};
