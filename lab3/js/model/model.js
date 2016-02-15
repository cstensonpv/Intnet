var BattleshipGame = function() {
	var _this = this;
	this.observers = [];

	function notifyObservers() {
		for (i in this.observers) {
			this.observers[i].update();
		}
	}

	this.otherPlayer = function() {
		if (this.currentPlayer == this.player1) {
			return this.player2;
		} else {
			return this.player1;
		}
	}

	this.addObserver = function(controller) {
		this.observers.push(controller);
	}

	this.guess = function(x, y) {
		if (this.otherPlayer().grid[x][y] !== undefined) {
			this.otherPlayer().grid[x][y].hit();
			this.currentPlayer.guesses[x][y] = "hit";
		} else {
			this.currentPlayer.guesses[x][y] = "empty";
		}

		notifyObservers();
	}

	this.player1 = new Player(1);
	this.player2 = new Player(2);
	this.currentPlayer = this.player1;


	console.log("Game created");

	this.boatPrototypes = []
}

var Grid = function() {

}

var Player = function(playerNumber) {
	this.playerNumber = playerNumber;
	this.boats = [];
	this.grid = [];
	this.guesses = [];

	for (var i = 0; i < 9; i ++) {
		this.grid.push(new Array(9));
	}

	for (var i = 0; i < 9; i ++) {
		this.guesses.push(new Array(9));
	}

	//console.log(this.grid);
	//console.log(this.guesses[0][0] === undefined);

	this.addBoat = function(length, rotation, x, y) {
		this.boats.push(new Boat(length, rotation));

		if (length === "h") {
			for (var i = x; i <= length; i ++) {
				this.grid[i][y] = this.boats[this.boats.length - 1];
			}
		} else if (rotation === "v") {
			for (var j = y; j <= length; j ++) {
				this.grid[x][j] = this.boats[this.boats.length - 1];
			}
		}

		notifyObservers();
	}

	
}

var Boat = function(length, rotation) {
	this.length = length;
	this.rotation = rotation;
	this.hits = 0;
	this.isDestroyed = false;

	this.hit() = function() {
		this.hits ++;

		if (this.hits === this.length) {
			this.isDestroyed = true;
			console.log(this);
		}
	}
}