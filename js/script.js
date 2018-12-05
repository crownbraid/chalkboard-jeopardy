$(function() {

	$('.new-game').click(function() {
		$(this).removeClass("flashgreen");
		newGame();
		$(this).addClass("flashgreen");
	});

	$('main').on('click', '.answer', function(e) {
		if (haltClick == 'off') {
			haltAni = 'off';
			haltClick= 'on';
			e.preventDefault();
			// checks answer
			var correctAnswer = $(this).text() == gameQuests[0].answer;
			if (correctAnswer) {
				numCorr++;
				scoreAni('.scoreboard', scInc);
				$(this).addClass("flashgreen");
			} else {
				$(this).addClass("flashred");
			}
			// advances to next question or end game
			if (gameQuests.length > 1) {
				transition(function() {
					if (haltAni == 'off') {
						scoreAni('.turn-count', scInc);
						gameQuests.shift();	
						newQuestion();
					}
				});
			} else {
				transition(function() {
					endGame();
				});
			}
		}
	});
});

var gameQuests; 
var numQuests = 5;
var scInc = '+=' + (16.18/numQuests) + 'em';
var haltClick = 'off';
var haltAni = 'off';
var numCorr = 0;

// NEW GAME
function newGame() {
	haltAni = 'on';
	resetGame();
	questsGet();
	newQuestion();
}
function resetGame() {
	$('.erase').finish().css('padding-top', '35em').show();
	$('*').clearQueue();
	haltClick = 'off';
	numCorr = 0;
	scoreAni('.turn-count', '24em');
	scoreAni('.scoreboard', '24em');
	scoreAni('.turn-count', scInc);
}
function questsGet() {
	// SELECT RANDOM QUESTION SET, LENGTH SPECIFIED BY "numQuests"
	gameQuests = [];
	while (gameQuests.length < numQuests) {
		var numAdd = Math.floor(Math.random()*questions.length);
		if (!gameQuests.includes(numAdd)) {gameQuests.push(numAdd);}
	}
	gameQuests = gameQuests.map(function(i) {
		return questions[i];
	});
}

// DISPLAY QUESTION
function newQuestion() {
	$('#question').text(gameQuests[0].question);
	$('main .answers').remove();
	$('.interactive').after(makeAnswerTemplate());
}
function makeAnswerTemplate() {
	var template = $('.templates .answers').clone();
	var answers = gameQuests[0].answers.slice();
	for (var i = 1; i <= 4; i++) {
		var randomAns = Math.floor(Math.random()*answers.length);
		randomAns = answers.splice(randomAns, 1);
		template.find('#ans' + i).text(randomAns);
		if (randomAns == gameQuests[0].answer) {
			$('#erase' + i).hide();
		}
	}
	return template;
}

// TRANSITION BETWEEN QUESTIONS
function transition(callback) {
	$('#erase1').animate({'padding-top': '0em'}, 1900, function() {
	});
	$('#erase2').delay(600).animate({'padding-top': '0em'}, 1900);
	$('#erase3').delay(1200).animate({'padding-top': '0em'}, 1900);
	$('#erase4').delay(1800).animate({'padding-top': '0em'}, 1900, function() {
		$('.erase').animate({'padding-top': '35em'}, 300);
		$('.erase').show();
		callback();
		haltClick = 'off';
	});
	for (var i = 1; i <= 4; i++) {
		if ($('#ans' + i).text() != gameQuests[0].answer) {
			$('#ans' + i).delay((700 * i)).animate({'opacity': '0', 'letter-spacing': '.1em'}, 500);
		} else {$('#ans' + i).addClass("flashgreen");}
	}
}

// ANIMATE SCOREBOARD
function scoreAni(obj, left) {
	$(obj).animate(
	 	{'margin-left': left},
	 	390
	);
}

// END GAME
function endGame() {
	$('main .answers').html($('.templates .answers').clone());
	$('#question').text("You scored " + numCorr + " out of " + numQuests + "!");
}

// QUESTION OBJECT
function question(question, answers, answer) {
	this.question = question;
	this.answers = answers;
	this.answer = answer;
}
var questions = [
	new question("How large was the first VCR, made in 1956? The size of a", ["piano", "sailboat", "oven", "yacht"], "piano"),
	new question("Who invented roulette?", ["French mathematician Blaise Pascal", "Professional Gambler Jimmy Fitzgerald", "Aesthetician Christopher Dresser", "King Louis XIV"], "French mathematician Blaise Pascal"),
	new question("Which publisher printed the first paperback book in 1935?", ["Penguin", "Dell", "Potter Press", "Pan Books"], "Penguin"),
	new question("Which film director invented false eyelashes in 1916?", ["D.W. Griffith", "Ernst Lubitsch", "Victor Sjöström", "Leni Riefenstahl"], "D.W. Griffith"),
	new question("Which root produces more distilled spirits than potatoes?", ["carrots", "ginger root", "beets", "turmeric"], "carrots"),
	new question("Which US state produces two-thirds of the worlds egg plant crop?", ["New Jersey", "California", "New York", "Missouri"], "New Jersey"),
	new question("Which country has the highest minimum drinking age in the world?", ["The United States", "Djibouti", "Singapore", "Qatar"], "The United States"),
	new question("When a drunk driver is jailed in Malaysia, who is jailed along with them?", ["their spouse", "their father", "their lawyer", "any children of-age"], "their spouse"),
	new question("Three live dogs have a star in the Hollywood walk of fame: Rin Tin Tin, Lassie, and who else?", ["Strongheart", "Toto", "Hooch", "Petey"], "Strongheart"),
	new question("On average, how many minor earthquakes occur per minute?", [2, 0, 4, 6], 2),
	new question("Which animal actors get paid the most, as much as 20,000 a day?", ["bears", "tigers", "elephants", "chimpanzees"], "bears")
];
