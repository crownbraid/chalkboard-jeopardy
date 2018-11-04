# Chalkboard Jeopardy
A chalkboard quiz game SPA. Each round presents a random question from a past Jeopardy episode. The format is multiple-choice and, as the Jeopardy API can only supply the correct answer, the app must generate a set of incorrect choices for each question: a series of calls to a dictionary API attempt to categorize the answer and collect related words. The server regularly maintains a store of question-and-answer data so clients can receive all data needed for a new game from a single GET request.

note: Due to service costs, the demo has been disconnected from the API. The gh-pages demo plays default questions.

### Major Technologies
Node.js, Express, Unirest, jQuery, jService Jeopardy API, Mashape WordsAPI
