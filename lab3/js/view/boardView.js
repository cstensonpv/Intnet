//ExampleView Object constructor
var BoardView = function (container) {
	 
	// Get all the relevant elements of the view (ones that show data
	// and/or ones that responed to interaction)
	//console.log(container);

	this.currentPlayer = container.find("#currentPlayer");
	this.board = container.find("#board");
	this.doneButton = container.find("#done");
	this.ships = container.find("#ships");
	this.rotation = container.find("#rotation");

	this.printArray = function(playerGuesses) {  
		

		//console.log(playerGuesses);


		this.board.html("");
		//function print_board(board){
		//document.getElementById('board').innerHTML = "";



		for (y = 0; y < playerGuesses.length; y++) {
			var row = document.createElement('div')//.className = "row";
			row.className = "row";
			for (x = 0; x < playerGuesses[y].length; x++){
				if (playerGuesses[y][x] == undefined){
					var col = document.createElement('div');
					col.className = "sea";
					col.id = x+":"+y;
				} else if (playerGuesses[y][x] === "hit"){
					var col = document.createElement('div');
					col.className = "hit";
					col.id = x+":"+y;
				} else if (playerGuesses[y][x] === "empty"){
					var col = document.createElement('div');
					col.className = "empty";
					col.id = x+":"+y;
				} else {
					var col = document.createElement('div');
					col.className = "boat";
					col.id = x+":"+y; 
				}
				//col.appendChild(document.createTextNode(x+":"+y));
				row.appendChild(col);   //className = "sea"+i+":"+k;  
			}
			
			this.board.append(row);
		}

 
	}
	 
 
	//this.printArray(); //runs in inatilatzion phase 
 
}