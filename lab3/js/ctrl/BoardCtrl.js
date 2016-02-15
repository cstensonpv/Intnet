var BoardCtrl = function (view, model) {
	var _this = this;

	this.update = function() {

		$(".sea" ).click(function() {
			//console.log(this.id);
			//model.test(if hit);
			var id = this.id.split(":")
			var row = id[0];
			var col = id[1];

			model.guess(row, col);
			//console.log(model.player1);

			view.printArray(model.currentPlayer.guesses);
			_this.update();
		});
	};

	//initialize from the start
	view.printArray(model.currentPlayer.guesses);
	this.update();

	//Add observer
	model.addObserver(this);
}