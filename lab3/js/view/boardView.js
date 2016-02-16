//ExampleView Object constructor
var BoardView = function(container) {
	this.currentPlayer = container.find("#currentPlayer");
	this.board = container.find("#board");
	this.doneButton = container.find("#done");
	this.ships = container.find("#ships");
	this.scoreTable = container.find("#scoretable");
	this.rotation = container.find("#rotation");
 }