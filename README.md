# Chalkboard Jeopardy
A chalkboard quiz game SPA. Each round presents a random question from a past Jeopardy episode. The format is multiple-choice. As the Jeopardy API can only supply the correct answer, the app must generate a set of incorrect choices for each question: a series of calls to a dictionary API attempt to categorize the answer and collect related words. 

Because the false answer generation process is slow, a server was created to prepare and maintain a store of question-and-answer data. Clients can now instantly receive all data needed for a new game from a single GET request.

note: *Due to service costs, the gh-pages demo has been disconnected from the API and serves preset questions.*

### Major Tools
Node.js, Express, Unirest, jQuery, jService Jeopardy API, Mashape WordsAPI
