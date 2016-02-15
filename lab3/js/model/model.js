"use strict";

var BattleshipGame = function() {
	var _this = this;
	this.observers = [];

	function notifyObservers(msg) {
		for (i in this.observers) {
			this.observers[i].update(msg);
		}
	}

	this.addObserver = function(controller) {
		this.observers.push(controller);
	}

	this.guess = function(x, y) {
		//
	}

	this.player1 = new Player(1);
	this.player2 = new Player(2);
	this.currentPlayer = this.Player1;

	this.currentPlayer = function() {
		return _this.currentPlayer.playerNumber;
	}

	console.log("Game created");

	this.player1 = [
	["Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown"],
	["Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown"],
	["Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown"],
	["Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown"],
	["Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown"],
	["Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown"],
	["Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown"],
	["Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown"],
	["Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown","Unknown", "Unknown", "Unknown"],
		];
	this.boatPrototypes = []
}

var Grid = function() {

}

var Player = function(playerNumber) {
	this.playerNumber = playerNumber;
	this.grid = [];

	for (var i = 0; i < 9; i ++) {
		this.grid.push(new Array(9));
	}

	console.log(this.grid);

	this.addBoat = function(boatNumber, x, y) {
		this.grid[x][y] = boat;
	}

	
}

var Boat = function() {
	this.length = 1; // all lengths are 1 until the bonus assignment
}