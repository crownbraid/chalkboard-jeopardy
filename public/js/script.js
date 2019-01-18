$(function() {

	$('.new-game').on('click', e => {
		e.preventDefault();
		
		$(e.currentTarget).removeClass("flashgreen");
		newGame();
		$(e.currentTarget).addClass("flashgreen");
	});

	$('main').on('click', '.answer', e => {
		e.preventDefault();
		
		if (!haltClick) {
			haltAni = false;
			haltClick = true;
			
			// check answer
			const isCorrect = $(e.currentTarget).text() == gameQuests[0].answer;
			if (isCorrect) {
				numCorr++;
				scoreAni('.scoreboard', scInc);
				$(e.currentTarget).addClass("flashgreen");
			} else {
				$(e.currentTarget).addClass("flashred");
			}
			
			// advance to next question or end game
			if (gameQuests.length > 1) {
				transition( () => {
					if (haltAni == false) {
						scoreAni('.turn-count', scInc);
						gameQuests.shift();	
						newQuestion();
					}
				});
			} else {
				transition(endGame);
			}
		}
	});
});

let gameQuests; 
const numQuests = 5;
const scInc = '+=' + (16.18/numQuests) + 'em';
let haltClick = false;
let haltAni = false;
let numCorr = 0;

// NEW GAME
const newGame = () => {
	haltAni = true;
	resetGame();
	questsGet();
}
const resetGame = () => {
	$('.erase').finish().css('padding-top', '35em').show();
	$('*').clearQueue();
	haltClick = false;
	numCorr = 0;
	scoreAni('.turn-count', '24em');
	scoreAni('.scoreboard', '24em');
	scoreAni('.turn-count', scInc);
}
const questsGet = () => {
	$.get("/" + numQuests + "/questions", data => {
		gameQuests = data;
		newQuestion();
	});
}

// DISPLAY QUESTION
const newQuestion = () => {
	$('#question').text(gameQuests[0].question);
	$('main .answers').remove();
	$('.interactive').after(makeAnswerTemplate());
}
const makeAnswerTemplate = () => {
	let template = $('.templates .answers').clone();
	const answers = gameQuests[0].answers.slice();
	for (let i = 1; i <= 4; i++) {
		let randomAns = Math.floor(Math.random()*answers.length);
		randomAns = answers.splice(randomAns, 1);
		template.find('#ans' + i).text(randomAns);
		if (randomAns == gameQuests[0].answer) {
			$('#erase' + i).hide();
		}
	}
	return template;
}

// TRANSITION BETWEEN QUESTIONS
const transition = callback => {
	$('#erase1').animate({'padding-top': '0em'}, 1900);
	$('#erase2').delay(600).animate({'padding-top': '0em'}, 1900);
	$('#erase3').delay(1200).animate({'padding-top': '0em'}, 1900);
	$('#erase4').delay(1800).animate({'padding-top': '0em'}, 1900, () => {
		$('.erase').animate({'padding-top': '35em'}, 300);
		$('.erase').show();
		callback();
		haltClick = false;
	});
	for (let i = 1; i <= 4; i++) {
		const ans = $('#ans' + i);
		if (ans.text() != gameQuests[0].answer) {
			ans.delay((700 * i)).animate({'opacity': '0', 'letter-spacing': '.1em'}, 500);
		} else {ans.addClass("flashgreen");}
	}
}

// ANIMATE SCOREBOARD
const scoreAni = (obj, left) => {
	$(obj).animate({'margin-left': left}, 390);
}

// END GAME
const endGame = () => {
	$('main .answers').html($('.templates .answers').clone());
	$('#question').text("You scored " + numCorr + " out of " + numQuests + "!");
}
