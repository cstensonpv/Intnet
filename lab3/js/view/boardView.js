//ExampleView Object constructor
var BoardView = function (container) {
     
    // Get all the relevant elements of the view (ones that show data
    // and/or ones that responed to interaction)
    //console.log(container);

    this.board = container.find("#board");
     
    this.printArray = function(playerGuesses){  
        

        //console.log("printArray view" + playerGuesses.length);


        this.board.html("");
        //function print_board(board){
        //document.getElementById('board').innerHTML = "";



        for (i = 0; i < playerGuesses.length; i++) {
            var row = document.createElement('div')//.className = "row";
            row.className = "row";
            for(k = 0; k < playerGuesses[i].length; k++){
                if(playerGuesses[i][k] == undefined){
                    var col = document.createElement('div');
                    col.className = "sea";
                    col.id = i+":"+k;
                }else if(playerGuesses[i][k] === "hit"){
                    var col = document.createElement('div');
                    col.className = "hit";
                    col.id = i+":"+k;
                }else if(playerGuesses[i][k] === "empty"){
                    var col = document.createElement('div');
                    col.className = "empty";
                    col.id = i+":"+k;
                }
                row.appendChild(col);   //className = "sea"+i+":"+k;  
            }
        this.board.append(row);
        }

 
    }
     
 
    //this.printArray(); //runs in inatilatzion phase 
 
}