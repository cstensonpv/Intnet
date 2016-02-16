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

		_this.currentPlayer.numGuesses ++;
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

	this.addBoat = function(x, y, type, rotation){
		//control if valid input
		_this.currentPlayer.addBoat(x, y, type, rotation);
		_this.notifyObservers();
	}

	this.removeBoat = function(x, y){
		//control if valid input
		_this.currentPlayer.removeBoat(x, y);
		_this.notifyObservers();
	}


	this.player1 = new Player(1, gridSize);
	this.player2 = new Player(2, gridSize);
	this.currentPlayer = this.player1;


	console.log("Game created");
}

var boatTypes = {
	"Aircraft carrier": 5,
	"Battleship": 4,
	"Submarine": 3,
	"Destroyer": 3,
	"Patrol boat": 2
}

var Grid = function() {

}

var Player = function(playerNumber, gridSize) {
	var _this = this;
	this.playerNumber = playerNumber;
	this.boats = [];
	this.grid = [];
	this.guesses = [];
	this.numGuesses = 0;

	for (var i = 0; i < gridSize; i ++) {
		this.grid.push(new Array(gridSize));
	}

	for (var i = 0; i < gridSize; i ++) {
		this.guesses.push(new Array(gridSize));
	}

	//console.log(this.grid);
	//console.log(this.guesses[0][0] === undefined);

	this.addBoat = function(x, y, type, rotation) {
		var length = boatTypes[type];
		_this.boats.push(new Boat(type, rotation));
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

	this.removeBoat = function(x, y) {
		var boat = this.grid[y][x];
		console.log("Player remove boat: "+ x +": "+y);
		console.log(boat);
		_this.boats.splice(_this.boats.indexOf(boat),1);
		console.log(_this.boats);

		if (boat.rotation == "h") {
			for (i = Math.max(x-boat.length, 0); i < Math.min(x + boat.length,8); i++) {
				_this.grid[y][i] = undefined;
			}
		} else if (boat.rotation === "v") {
			console.log(Math.max(y -boat.length, 0) + ": "+ Math.min(y + boat.length, 8));
			for (i = Math.max(y-boat.length, 0); i < Math.min(y + boat.length, 8); i++) {
				_this.grid[i][x] = undefined;
				console.log("delete :"+ i);
			}	
		}




	}

	this.noSunkBoats = function() {
		var num = 0;

		for (var i in this.boats) {
			if (this.boats[i].isDestroyed) num ++;
		}

		return num;
	}

	this.notUsedBoatTypes = function() {
		var assocArray = {};
		for(key in boatTypes){
			var used = false;
			for(boat = 0; boat < this.boats.length; boat++){
				if(this.boats[boat].type == key){
					used = true;
				}
			}
			if(!used){
				assocArray[key] = boatTypes[key];
			}
		}
		return assocArray
	}
}

var Boat = function(type, rotation) {
	this.type = type;
	this.length = boatTypes[type];
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