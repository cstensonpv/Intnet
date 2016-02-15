// Whole-script strict mode syntax
"use strict";

$(function() {
    //We instantiate our model
    var model = new BattleshipGame();
     
    //And create the needed controllers and views
    var boardView = new BoardView($("#game"), model);
    var boardCtrl = new BoardCtrl(boardView, model);
});