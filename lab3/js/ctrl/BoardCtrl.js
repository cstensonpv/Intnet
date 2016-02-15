var BoardCtrl = function (view, model) {


	this.update = function() {

		$(".sea" ).click(function() {
			console.log(this.id);
			//model.test(if hit);
			var id= this.id.split(":")
			var row = id[0];
			var col = id[1];

			model.guess(row, col);

			model.player1[row][col] = "Hit";//change to "Hit"
			console.log(model.player1);

			view.update(model.player1);
		 	this.update();

		});
	};

	//initialize onclick
	this.update();

	//Add observer
	model.addObserver(this);
}