const express = require('express')
  , app = express();

app.use(express.static(__dirname + '/public'));

const questions = require('./questions');
questions.storeSize = 100;
questions.reloadStore();

app.get('/questions/:numquest', (req, res) => {
	const gameQuests = questions.store.splice(0, req.params.numquest);
	res.send(gameQuests);
	questions.reloadStore();
});

app.listen(process.env.PORT || 8080);
