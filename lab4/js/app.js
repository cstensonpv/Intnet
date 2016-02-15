$(function() {
    //We instantiate our model
    var model = new Battleship();
     
    //And create the needed controllers and views
    var boardView = new boardView($("#board"), model);
    var boardCtrl = new boardCtrl(exampleboardViewView, model);

    console.log("app js körd!");
});