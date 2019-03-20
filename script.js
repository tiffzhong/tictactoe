var originalBoard; //initializing the board. array of what's in each square
const humanPlayer = "O";
const computerPlayer = "X";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]; //these are the winning combos on the board

const cells = document.querySelectorAll(".cell"); //cells variable is going too store a reference to each td element.
startGame(); //'Replay' button will run startGame function.

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  originalBoard = Array.from(Array(9).keys()); //creates an array of 9 elements and grabs the keys from that array (0-9) to put into an array

  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = ""; //   do 3 things each cell
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}

function turnClick(square) {
  if (typeof originalBoard[square.target.id] === "number") {
    console.log(square.target.id); //shows the number that is clicked on the board
    turn(square.target.id, humanPlayer); //pass in the id we are clicking and the humanplayer's turn
    if (!checkWin(originalBoard, humanPlayer) && !checkTie()) {
      turn(bestSpot(), computerPlayer);
    }
  }
}

function turn(squareId, player) {
  originalBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let winner = checkWin(originalBoard, player);
  if (winner) {
    gameOver(winner);
  }
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let winner = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      winner = { index: index, player: player };
      break;
    }
  }
  return winner;
}

function gameOver(winner) {
  for (let i of winCombos[winner.index]) {
    document.getElementById(i).style.backgroundColor =
      winner.player == humanPlayer ? "blue" : "red";
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(winner.player == humanPlayer ? "You won!" : "You lost!");
}

function declareWinner(winningPlayer) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = winningPlayer;
}
function emptySquares() {
  return originalBoard.filter(square => typeof square == "number");
}

function bestSpot() {
  return emptySquares()[0];
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "green";
      cells[i].removeEventListener("click", turnClick, false);
    }
    declareWinner("Tie");
    return true;
  }
  return false;
}
