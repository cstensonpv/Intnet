//ExampleView Object constructor
var BoardView = function(container) {
	 
	// Get all the relevant elements of the view (ones that show data
	// and/or ones that responed to interaction)
	//console.log(container);

	this.currentPlayer = container.find("#currentPlayer");
	this.board = container.find("#board");
	this.doneButton = container.find("#done");
	this.ships = container.find("#ships");
	this.scoreTable = container.find("#scoretable");
	//this.printArray(); //runs in inatilatzion phase 
 }