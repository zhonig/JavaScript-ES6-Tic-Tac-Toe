class TicTacToe {
	
	//Initialize the Tic Tac Toe board and start the game
	constructor() {
		
		//Store class context
		let self = this;
		
		//Specify board size rows and columns. Default is 3.
		self.BOARD_SIZE = 3;

		//Store cells into array
		self.cells = [];

		//Store current player's turn
		self.currentPlayerTurn = 'X';

		//Keep track of total moves made
		self.totalMoves = 0;

		//Empty HTML Value of cell
		self.EMPTY_CELL = '&nbsp;';

		//Specify tic-tac-toe div element board container id
		self.tictactoeContainerId = 'tictactoe_container';

		//Specify reset element button id
		self.resetbuttonElId = 'resetGame';

		//Specify total moves element id
		self.totalmovesElId = 'totalMoves';

		//Specify current player turn element id
		self.currentPlayerTurnElId = 'currentPlayerTurn';

		//Bind click event listener to reset button -- if reset button is clicked, then start new game
		document.getElementById(self.resetbuttonElId).addEventListener("click", function(event) {
			self.startNewGame(self, event);
		});
		
		//Create board table element
		let board = document.createElement('table');
	  
		//Iterate through rows
		for (let row = 0; row < self.BOARD_SIZE; row++) {
		
			//Create table row
			let rowEl = document.createElement('tr');
		
			//Append row element to table board
			board.appendChild(rowEl);
		
			//Iterate through columns
			for (let col = 0; col < self.BOARD_SIZE; col++) {
				
				//Create cell
				let cell = document.createElement('td');
				
				//Add class to cell -- specify column position and row position
				cell.classList.add('col' + col, 'row' + row);
				
				//If row position is equal to column position
				if (row === col) {
					
					//Add diagonal0 class to cell
					cell.classList.add('diagonal0');
				}
				
				//If column position is equal to (BOARD_SIZE - row position - 1)
				if (col === self.BOARD_SIZE - row - 1) {
					
					//Add diagonal1 class to cell
					cell.classList.add('diagonal1');
				}
				
				//Bind click event listener to cell
				cell.addEventListener('click', function(event) {
					self.onCellClick(self, event);
				});
				
				//Append cell to row
				rowEl.appendChild(cell);
				
				//Push cell into array
				self.cells.push(cell);
			}
		}

		//Append new board to tic-tac-toe div container
		document.getElementById(self.tictactoeContainerId).appendChild(board);
		
		//Start New Game
		self.startNewGame(self);
	}
	
	//On Cell Click
	onCellClick(self, event) {
					
		//Get clicked cell
		let cell = event.target;
		
		//If clicked cell inner html is not empty
		if (cell.innerHTML !== self.EMPTY_CELL) {
			
			//Ignore click
			return;
		}
		
		//Update cell inner html to current player turn
		cell.innerHTML = self.currentPlayerTurn;
		
		//Increment total moves by 1
		self.totalMoves += 1;
		
		//Update total moves on HTML View
		document.getElementById(self.totalmovesElId).innerHTML = self.totalMoves;
		
		//If the player won
		if (self.checkWin(cell)) {
			
			//Announce winner
			alert('Winner: Player ' + self.currentPlayerTurn);
			
			//Start New Game after user confirms
			self.startNewGame(self);
		}
		
		//Else if -- there are no more moves to make on the board
		else if (self.totalMoves === self.BOARD_SIZE * self.BOARD_SIZE) {
			
			//Announce draw
			alert('Draw');
			
			//Start New Game after user confirms
			self.startNewGame(self);
		}
		
		//Else
		else {
			
			//Toggle current player turn
			self.currentPlayerTurn = self.currentPlayerTurn === 'X' ? 'O' : 'X';
			
			//Update Current Player Turn on HTML view
			document.getElementById(self.currentPlayerTurnElId).innerHTML = self.currentPlayerTurn;
		}
	}
	
	//Check if current player won
	checkWin(clickedCell) {
		
		//Store class context
		let self = this;
		
		//Get all clicked cell classes
		let classNames = clickedCell.className.split(/\s+/);
		
		//Iterate through clicked cell class names
		for (let count = 0; count < classNames.length; count++) {
			
			//Get all cell elements with class name within tic tac toe div container
			let cellElements = document.querySelectorAll('#' + self.tictactoeContainerId + ' .' + classNames[count]);
			
			//Initialize cell count with current player turn
			let cellCountWithCurrentPlayerTurn = 0;
			
			//Iterate through cell elements
			for(let col = 0; col < cellElements.length; col++) {
				
				//If cell's inner html is equal to current player turn
				if(cellElements[col].innerHTML === self.currentPlayerTurn) {
					
					//Increment cell count with current player turn by 1
					cellCountWithCurrentPlayerTurn++;
				}
			}
			
			//If cell count with current player turn equals BOARD_SIZE
			if (cellCountWithCurrentPlayerTurn === self.BOARD_SIZE) {
				
				//Current player won
				return true;
			}
		}
		
		//Current player did not win
		return false;
	}
	
	//Start New Game
	startNewGame(self, event) {
		
		//Reset moves
		self.totalMoves = 0;
		
		//Update total moves on HTML View
		document.getElementById(self.totalmovesElId).innerHTML = self.totalMoves;
		
		//Reset current player's turn
		self.currentPlayerTurn = 'X';
		
		//Update Current Player Turn on HTML view
		document.getElementById(self.currentPlayerTurnElId).innerHTML = self.currentPlayerTurn;
		
		//Clear tic-tac-toe board
		self.cells.forEach(function (cell) {
			
			//Update cell inner html to empty
			cell.innerHTML = self.EMPTY_CELL;
		});
	}
	
}

//Initiate the board and start new game
let tictactoeboardgame = new TicTacToe();