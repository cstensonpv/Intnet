var BoardCtrl = function (view, model) {
	var _this = this;
	this.selectedShip = null;

	this.generateShipList = function() {
		var list = document.createElement('ol')
		for(key in boatTypes){
			var ship = document.createElement('li');
			ship.appendChild(document.createTextNode(key + "(with length "+ boatTypes[key]+")"));
			ship.className = "ship";
			ship.id = key;
			list.appendChild(ship);
					
		}
		view.ships.html(list);

	}

	this.update = function() {

		if (!model.gameStarted){
			view.printArray(model.currentPlayer.grid);
		} else {
			//console.log(model.player1);
			view.printArray(model.currentPlayer.guesses);
		}

		if (!model.guessMade) {
			$(".sea" ).click(function() {
				//console.log(this.id);
				//model.test(if hit);
				var id = this.id.split(":")
				var x = parseInt(id[0]);
				var y = parseInt(id[1]);

				if(!model.gameStarted){
					model.addBoat(x, y, "Destroyer", "v");
				}else{
					model.guess(x, y);
				}
			});
		}
		if (model.winner !== null) {
			alert("You have won!");
		}

		view.doneButton.click( function() {
			console.log("doneclick)");
			//console.log(model.currentPlayer.boats.length);
			if (!model.gameStarted && model.player1.boats.length >= 1 && model.player2.boats.length >= 1){
				model.startGame();
				model.switchPlayer();
			} else if (!model.gameStarted && (model.currentPlayer === model.player1) && model.currentPlayer.boats.length >= 1) {
				model.switchPlayer();
			} else if (model.gameStarted && (model.winner === null)) {
				model.switchPlayer();
			} else if (model.gameStarted && (model.winner !== null)) {
				location.reload();
			}

			view.doneButton.unbind().click(function() { console.log("unbind")});

		});

		view.currentPlayer.html("Player "+model.currentPlayer.playerNumber);
	};


	//initialize from the start

	//console.log("Game: "+ model.gameStarted);

	this.generateShipList()
	this.update();
	

	$(".ship" ).click(function() {
		console.log(this);
		//model.test(if hit);
		this.selectedShip = this.id;
		console.log(this.selectedShip);
	});

	//Add observer
	model.addObserver(this);
}