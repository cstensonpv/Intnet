var BattleshipGame = function() {
	var _this = this;
	var gridSize = 9;
	this.observers = [];
	this.gameStarted = false;
	this.guessMade = false;
	this.winner = null;

	this.notifyObservers = function() {
		for (i in this.observers) {
			this.observers[i].update();
		}
	}

	this.startGame = function() {
		if (this.gameStarted === false) {
			this.gameStarted = true;
		}

		_this.notifyObservers();

	}

	this.otherPlayer = function() {
		if (this.currentPlayer == this.player1) {
			return this.player2;
		} else {
			return this.player1;
		}
	}

	this.switchPlayer = function() {
		console.log("Switch player");
		if (_this.currentPlayer === _this.player1) {
			_this.currentPlayer = _this.player2;
		} else {
			_this.currentPlayer = _this.player1;
		}

		_this.guessMade = false;

		_this.notifyObservers();
	}

	this.addObserver = function(controller) {
		this.observers.push(controller);
	}

	this.guess = function(x, y) {
		if (this.otherPlayer().grid[y][x] !== undefined) {
			this.otherPlayer().grid[y][x].hit();
			this.currentPlayer.guesses[y][x] = "hit";

			if (this.checkIfWinner()) {
				this.winner = this.currentPlayer;
				console.log("You have won");
			}
		} else {
			this.currentPlayer.guesses[y][x] = "empty";
		}

		_this.guessMade = true;
		_this.notifyObservers();
	}

	this.checkIfWinner = function() {
		for (var i in this.otherPlayer().boats) {
			if (!this.otherPlayer().boats[i].isDestroyed) {
				return false;
			}
		}

		return true; // if there has been no encounter of a boat that has not been destroyed, all boats have been destroyed
	}

	this.addBoat = function(x ,y ,length, rotation){
		//control if valid input
		_this.currentPlayer.addBoat(x ,y ,length, rotation);
		_this.notifyObservers();
	}

	this.player1 = new Player(1, gridSize);
	this.player2 = new Player(2, gridSize);
	this.currentPlayer = this.player1;


	console.log("Game created");

	this.boatPrototypes = []
}

var Grid = function() {

}

var Player = function(playerNumber, gridSize) {
	var _this = this;
	this.playerNumber = playerNumber;
	this.boats = [];
	this.grid = [];
	this.guesses = [];

	for (var i = 0; i < gridSize; i ++) {
		this.grid.push(new Array(gridSize));
	}

	for (var i = 0; i < gridSize; i ++) {
		this.guesses.push(new Array(gridSize));
	}

	//console.log(this.grid);
	//console.log(this.guesses[0][0] === undefined);

	this.addBoat = function(x ,y , length, rotation) {
		_this.boats.push(new Boat(length, rotation));
		console.log("add boat at: "+x +":"+y+":"+length+":"+rotation);

		if (rotation == "h") {
			for (i = x; i < x + length; i++) {
				_this.grid[y][i] = _this.boats[_this.boats.length - 1];
			}
		} else if (rotation === "v") {
			for (i = y; i < y + length; i++) {
				_this.grid[i][x] = _this.boats[_this.boats.length - 1];
			}	
		}
	}

	
}

var Boat = function(length, rotation) {
	
	this.length = length;
	this.rotation = rotation;
	this.hits = 0;
	this.isDestroyed = false;

	this.hit = function() {
		this.hits ++;

		if (this.hits === this.length) {
			this.isDestroyed = true;
			console.log("boat sunk!");
			console.log(this);
		}
	}
}