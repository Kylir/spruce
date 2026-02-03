
# Tic-Tac-Toe

This is my solution to the game of Tic Tac Toe.
It took me around 3 hours to implement on a busy Sunday.
I used Claude Code all along.

After completing each exercise, I created a git tag. For instance, using `git checkout exercise1` will set the repo at the end of the Exercise 1. 

## Problems
### Problem 1

I decided to keep the UI very minimal. I reused most of the initial template.

One thing I did change is the initial `type` for the content of the cells. To me it made more sense to not mix values (O or X or empty string) with the `undefined` "concept".

I then needed variables for the current player, the number of turns and so on. Adding the `clickHandler` to handle the players interactions gave me the graphical foundation of the project.

Next phase was to handle the draw - easy with the number of turns variable - and the victory of a player. The latter was a little bit more work as I wanted to keep the complexity of the project to a minimal level; but I also wanted to reduce the number of operations and only consider the rows, columns and diagonals impacted by the move that just happened.

I used Claude Code to generate a set of tests for the detection of the winning move. To me it's the only part of the implementation that requires a bit of unit tests.

### Problem 2

Building on what was already there, the variable size of the grid wasn't complex to implement. I added an input to the page and made sure we couldn't create a game outside the given range. I kept the UI consistent and minimal. I also added a "win condition" to let the players have a bit of fun and experiment outside the "3 in a row".

I then made the generation of the initial board based on the input. 

The biggest change was to detect if a move is a winning move in an efficient way. I didn't want to scan the whole board but I wanted a short function - straight to the point. After some attempts I settled on counting "around" the current move how many similar pieces are already there and compare that to the number needed to win.

### Problem 3

Adding a server was next. I went for a framework that I know very well: ExpressJS. For the database, the simplest was to use SQLite.

The API allows to save a game, retrieve simple statistics about the games and also retrieve all the games for testing purposes - as a developer it is very easy to check that the games have been inserted correctly.

The database schema is minimal. There is one table only. To store a game we are only storing the date, the winner, the board size and the win condition. Storing a game will also assign an ID that could be used in the future if we want to add new functionalities like remembering the moves and allow to take back moves.

Because of the new section showing statistics, I decided to refactor `main.tsx` to have components.

I finally connected the frontend to the API using simple `fetch` calls and I made sure connectivity issues were handled gracefully.

## Quickstart
- Make sure you have **node** installed
- `cd client`
- `npm i`
- `npm start`
- Open another terminal
- `cd server`
- `npm i`
- `npm run build && npm run start`

