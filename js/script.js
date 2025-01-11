/* DOM elements */
const BG = document.querySelector('.bg');
const BOARD = document.getElementById('board');
const CELLS = document.querySelectorAll('.cell');
const RESULT = document.getElementById('result');
const MSG = document.querySelector('.result p');
const REPLAY = document.getElementById('replay');

/* Game variables */
// Wins
const WINS = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

// Player classes
const CLASS_X = "x";
const CLASS_O = "o";

// Game variables
let xTurn;
let gameOver = false;

startGame();

/* Start the game */
function startGame() {

   CELLS.forEach(cell => {
      cell.addEventListener('click', play, { once: true }); // Only allow one click
      cell.classList.remove('disabled');
   });

   // Reset game variables
   xTurn = true;
   gameOver = false;
   RESULT.classList.remove('active');
   BG.style.left = "0px";
   switchHoverBoardClass();
   CELLS.forEach(cell => cell.classList.remove(CLASS_X, CLASS_O, 'win'));
}

/* Play the game */
function play(e) {

   // Check if the game is over
   if (gameOver) {
      return;
   }

   const currentCell = e.target;
   const currentClass = xTurn ? CLASS_X : CLASS_O;

   placeLetter(currentCell, currentClass);

   if (checkWinner(currentClass)) {
      addBgToWinningCells(checkWinner(currentClass));
      endGame(`${currentClass.toUpperCase()} wins 🔥`);
   } else if (isDraw()) {
      endGame('It\'s a draw 🙁');
   } else {
      switchTurn();
      switchHoverBoardClass();
   }
}

/* All functions */

/* Place the current player's letter */
function placeLetter(currentCell, currentClass) {
   currentCell.classList.add(currentClass);
}

// Check turn and change display
function switchTurn() {
   xTurn = !xTurn;
   BG.style.left = xTurn ? "0px" : "58px";
}

// Check hover display according to turn
function switchHoverBoardClass() {
   BOARD.className = `board ${xTurn ? CLASS_X : CLASS_O}`;
}

// Check winner
function checkWinner(currentClass) {
   // Runs throught each combination in array WINS and return true (some) if there is a win
   // Runs throught each combination in array WINS and return the winning combination (find) if there is a win
   return WINS.find(combination => {
      return combination.every(index => {
         return CELLS[index].classList.contains(currentClass);
      });
   });
}

// Add background color to winning cells
function addBgToWinningCells(winningCells) {
   winningCells.forEach(index => {
      CELLS[index].classList.add('win');
   });
}

// Check draw
function isDraw() {
   return [...CELLS].every(cell => {
      return cell.classList.contains(CLASS_X) || cell.classList.contains(CLASS_O);
   });
}

// End the game
function endGame(message) {
   gameOver = true;
   RESULT.classList.add('active');
   MSG.textContent = message;
   BOARD.className = 'board';
   CELLS.forEach(cell => cell.classList.add('disabled'));
}

/* Replay the game */
REPLAY.addEventListener('click', startGame);
