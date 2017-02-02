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

module.exports = questions;