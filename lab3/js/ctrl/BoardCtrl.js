var BoardCtrl = function(view, model) {
	var _this = this;
	this.selectedShip = null;
	this.selectedRotation = "v";

	this.generateShipList = function() {
		view.ships.html("");

		var boatsLeft = model.currentPlayer.notUsedBoatTypes();
		if(!boatsLeft[this.selectedShip]){
			this.selectedShip = null;
		}
		var list = document.createElement('ol')
		for(key in boatsLeft){
			var ship = document.createElement('li');
			ship.appendChild(document.createTextNode(key + "(with length "+ boatsLeft[key]+")"));
			ship.className = "ship";
			ship.id = key.replace(" ","_");
			list.appendChild(ship);
					
		}
		view.ships.html(list);

		//automark the first element
		if(Object.keys(boatsLeft)[0]){
			this.markSelectedShip(Object.keys(boatsLeft)[0].replace(" ","_"));
		}

		

	}

	this.printArray = function(playerGuesses) {  
		view.board.html("");
		var clickable = model.guessMade ? "" : " clickable";

		for (y = 0; y < playerGuesses.length; y++) {
			var row = document.createElement('div')//.className = "row";
			row.className = "row";

			for (x = 0; x < playerGuesses[y].length; x++){
				if (playerGuesses[y][x] == undefined){
					var col = document.createElement('div');
					col.className = "sea" + clickable;
					col.id = x+":"+y;
				} else if (playerGuesses[y][x] === "hit"){
					var col = document.createElement('div');
					col.className = "hit" + clickable;
					col.id = x+":"+y;
				} else if (playerGuesses[y][x] === "empty"){
					var col = document.createElement('div');
					col.className = "empty" + clickable;
					col.id = x+":"+y;
				} else {
					//console.log(playerGuesses[y][x]);
					var col = document.createElement('div');
					col.className = "boat" + clickable;
					col.id = x+":"+y; 
				}
				//col.appendChild(document.createTextNode(x+":"+y));
				row.appendChild(col);   //className = "sea"+i+":"+k;  
			}
			
			view.board.append(row);
		}
	}

	this.printScores = function() {
		view.scoreTable.html("");

		console.log("Print scores");
		// view.scoreTable.append("<tr><td>asdf</td></tr>");
		var scores = ""

		scores += '<tr><th>Player</th><th>Ships</th><th>Sunk ships</th><th>Shots</th></tr>';

		scores += '<tr>';
		scores += '<td>' + model.currentPlayer.playerNumber + '</td>';
		scores += '<td>' + model.currentPlayer.boats.length + '</td>';
		scores += '<td>' + model.currentPlayer.noSunkBoats() + '</td>';
		scores += '<td>' + model.currentPlayer.numGuesses + '</td>';
		scores += '</tr>';

		scores += '<tr>';
		scores += '<td>' + model.otherPlayer().playerNumber + '</td>';
		scores += '<td>' + model.otherPlayer().boats.length + '</td>';
		scores += '<td>' + model.otherPlayer().noSunkBoats() + '</td>';
		scores += '<td>' + model.otherPlayer().numGuesses + '</td>';
		scores += '</tr>';

		view.scoreTable.append(scores);
		// view.scoreTable.append(document.createElement('tr').appendChild(document.createTextNode("test")));
	}

	this.update = function() {
		this.generateShipList();

		if (!model.gameStarted){
			this.printArray(model.currentPlayer.grid);
			view.scoreTable.hide();
		} else {
			//console.log(model.player1);
			this.printArray(model.currentPlayer.guesses);
			view.scoreTable.show();
			this.printScores();
			view.rotation.hide();
		}

		if (!model.guessMade) {
			$(".sea" ).click(function() {
				//console.log(this.id);
				//model.test(if hit);
				var id = this.id.split(":")
				var x = parseInt(id[0]);
				var y = parseInt(id[1]);

				if (!model.gameStarted) {
					model.addBoat(x, y, _this.selectedShip, _this.selectedRotation);
				} else {
					model.guess(x, y);
				}
			});
		}

		if (model.winner !== null) {
			alert("You have won!");
		}

		if (!model.gameStarted && model.player1.boats.length >= 1 && model.player2.boats.length >= 1){
			// If all players have finished placing their boats
			view.doneButton.show();
			view.doneButton.click(function() {
				model.startGame();
				model.switchPlayer();
				_this.dbUnbind();
			});
			view.doneButton.html("Done – Start game");
		} else if (!model.gameStarted && (model.currentPlayer === model.player1) && model.currentPlayer.boats.length >= 1) {
			// If the first player has finished placing their boats
			view.doneButton.show();
			view.doneButton.click(function() {
				model.switchPlayer();
				_this.dbUnbind();
			});
			view.doneButton.html("Done – Let player " + model.otherPlayer().playerNumber + " place boats");
		} else if (model.gameStarted && (model.winner === null)) {
			// If this is a normal turn
			view.doneButton.show();
			view.doneButton.click(function() {
				model.switchPlayer();
				_this.dbUnbind();
			});
			view.doneButton.html("Done – Give the turn to player " + model.otherPlayer().playerNumber);
		} else if (model.gameStarted && (model.winner !== null)) {
			// If the game is won
			view.doneButton.show();
			view.doneButton.click(function() {
				location.reload();
				_this.dbUnbind();
			});
			view.doneButton.html("Reset game");
		} else {
			view.doneButton.hide();
		}

		view.currentPlayer.html("Player " + model.currentPlayer.playerNumber);

		$(".ship" ).click(function() {
			_this.markSelectedShip(this.id);
			
		});
		$(".boat" ).click(function() {

			var id = this.id.split(":")
			var x = parseInt(id[0]);
			var y = parseInt(id[1]);

			console.log("shoud remove boat");
			model.removeBoat(x, y);
			
		});
	}

	this.markSelectedShip = function (id) {
		if(_this.selectedShip !== null){
			$("#"+_this.selectedShip.replace(" ","_")).css("background-color", "white");
		}
		_this.selectedShip = id.replace("_", " ");

		$("#"+_this.selectedShip.replace(" ","_")).css("background-color", "red");

	}

	this.dbUnbind = function() {
		view.doneButton.unbind().click(function() {});
	}

	this.update();

	view.rotation.click( function() {
		if(_this.selectedRotation === "v"){
			_this.selectedRotation = "h";
			$("#rotation").html("Rotation: Horizontal");
		}else{
			_this.selectedRotation = "v";
			$("#rotation").html("Rotation: Vertical");
		}	
		console.log(_this.selectedRotation);

	});


	//Add observer
	model.addObserver(this);
}