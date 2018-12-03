const unirest = require('unirest');

class Question {
	constructor() {
		this.question = null;
		this.answer = null;
		this.fakeAnswers = [];
		this.prepareQuestion();
	}

	prepareQuestion() {
		unirest.get('http://jservice.io/api/random')
		.end( res => {
			this.question = res.body[0].question;
			this.answer = res.body[0].answer;
			this.getSimilarAnswers();
		});
	}

	getSimilarAnswers() {
		const url = 'https://wordsapiv1.p.mashape.com/words/';
		const options = {'X-Mashape-Key': 'Q3mEcts35FmshxFGDp94g0ach9F0p1IfiAWjsnD2iNV7FBSpcG'};

		unirest.get(url + this.answer + '/instanceOf', options) 
		.end( res => {
			res.body.instanceOf.forEach( category => {
				unirest.get(url + category + '/hasMembers', options)
				.end( res => {
					res.body.hasMembers.forEach( relatedWord => {
						this.fakeAnswers.push(relatedWord);
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
