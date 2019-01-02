# Chalkboard Jeopardy
A chalkboard quiz game SPA. Each round presents a random question from a past Jeopardy episode. The format is multiple-choice. As the Jeopardy API supplies only the correct answer, dummy answers are selected through a series of calls to a dictionary API. 

The false answer selection process is slow, so a store of question-and-answer data is prepared by the server. This allows clients to instantly receive all data needed for a new game from a single GET request.

note: *Due to service costs, the gh-pages demo has been disconnected from the API and serves preset questions.*

### Major Tools
Node.js, Express, Unirest, jQuery, jService Jeopardy API, Mashape WordsAPI
