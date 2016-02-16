//ExampleView Object constructor
var BoardView = function(container) {
	this.currentPlayer = container.find("#currentPlayer");
	this.board = container.find("#board");
	this.doneButton = container.find("#done");
	this.ships = container.find("#ships");
	this.scoreTable = container.find("#scoretable");
	this.rotation_v = container.find("#rotation_v");
	this.rotation_h = container.find("#rotation_h");
	this.message = container.find("#message");
	this.rotation = container.find("#rotation");
 }