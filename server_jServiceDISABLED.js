var express = require('express')
  , app = express();

app.use(express.static(__dirname + '/public'));

var questions = require('./questions_default');

app.get('/questions/:numquest', function(req, res) {
	var gameQuests = [];
	while (gameQuests.length < req.params.numquest) {
		var numAdd = Math.floor(Math.random() * questions.length);
		if (!gameQuests.indexOf(numAdd) > -1) { gameQuests.push(numAdd); }
	}
	gameQuests = gameQuests.map(function(i) {
		return questions[i];
	});
	res.send(gameQuests);
	questions.reloadStore();
});

app.listen(process.env.PORT || 8080);