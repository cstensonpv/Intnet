$(function() {
    //We instantiate our model
    var model = new BattleshipGame();
     
    //And create the needed controllers and views
    console.log($("#board"));
    var boardView = new boardView($("#board"), model);
    var boardCtrl = new boardCtrl(exampleboardViewView, model);

    console.log("app js körd!");
});