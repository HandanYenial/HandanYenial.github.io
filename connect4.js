/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let gameOVer=false; //to prevent continue playing after one of the player wins.

function makeBoard() { // makeBoard: create in-JS board structure:board = array of rows, each row is array of cells  (board[y][x])// TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y=0; y<HEIGHT ; y++){
    board.push(Array.from({length:WIDTH}));
  }
}
//I have board as an empty array as let board=[]; then for the height which is 7
// and mentioned as let HEIGHT=7, I will push an array of WIDTH(which was not an array, it
//is an array-like object so we used Array.from),to the board. 

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard=document.getElementById('board');

  // TODO: add comment for this code
  var top = document.createElement("tr"); // created an element "tr" which is table row(there are 7 rows)
  top.setAttribute("id", "column-top");//top row will have the value column top
  top.addEventListener("click", handleClick); // we will click on the top column to release the tokens
// making an html board, so no need to form a board in html



  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td"); // created an element as td for each cell on the top row.
    headCell.setAttribute("id", x);// it will have the value x
    top.append(headCell);// will add headcell to the top row
  }
  htmlBoard.append(top); // and top row to the board.

  // TODO: add comment for this code

  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");//we will create an element td for each cell
      cell.setAttribute("id", `${y}-${x}`); // and set an attribute to each cell with value of y-x like 3-2
      // as 3 in column(height) 2 in row(width)
      row.append(cell); // we will add these each cell to the row.
    }
    htmlBoard.append(row); // and add each row to the board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x){
  // TODO: write the real version of this, rather than always returning 0
  for(let y=HEIGHT-1;y>0;y--){ //it is y-1 because every time we send a token from the top y will change as y-1
    if(!board[y][x]){
       console.log(board);
      return y;}
    }return null;
  }

/** placeInTable: update DOM to place piece into HTML table of board */
// TODO: make a div and insert into correct table cell
function placeInTable(y, x) {
  const piece= document.createElement('div'); // made a div and assign it to const piece
  piece.classList.add('piece'); // added the 'piece'to the const piece classList
  piece.classList.add(  `p${currPlayer}`); // the piece we added will be the current player's piece - If we add names to the game we can also add it here to show each turn.
  piece.style.top=-50*(y+2); // for the top position of the piece ????
  const spot = document.getElementById(`${y}-${x}`);//spot of the piece with the id of y-x as 3-2
  spot.append(piece); // add the spot to the piece

  
}

/** endGame: announce game end */
// TODO: pop up alert message
function endGame(msg) {
  alert(msg);  
}

/** handleClick: handle click of column top to play piece */
// get x from ID of clicked cell
function handleClick(evt) {
  var x = +evt.target.id;


  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  console.log(x,y);

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`); //function endgame will return an alert of the message
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  if (board.every(row=>row.every(cell=>cell))){
    return endGame('Tie');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer=currPlayer ===1?2:1
}


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();


