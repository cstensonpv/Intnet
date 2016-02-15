//ExampleView Object constructor
var boardView = function (container, model) {
     
    // Get all the relevant elements of the view (ones that show data
    // and/or ones that responed to interaction)
    //console.log(container);
    this.board = container
     
    this.doView = function(){  
 
        //function print_board(board){
        //document.getElementById('board').innerHTML = "";

        for (i = 0; i < board.length; i++) {
            var row = document.createElement('div')//.className = "row";
            row.className = "row";
            for(k = 0; k < board[i].length; k++){
                if(board[i][k] == "Unknown"){
                    var col = document.createElement('div');
                    col.className = "sea";
                    col.id = i+":"+k;
                }else if(board[i][k] === "Hit"){
                    var col = document.createElement('div');
                    col.className = "hit";
                    col.id = i+":"+k;
                }else if(board[i][k] === "empty"){
                    var col = document.createElement('div');
                    col.className = "empty";
                    col.id = i+":"+k;
                }
                row.appendChild(col);   //className = "sea"+i+":"+k;  
            }
        document.getElementById('board').appendChild(row);
        }

 
    }
     
    this.update = function(){
        this.doView();
    }
 
    this.doView(); //runs in inatilatzion phase
 
 
    //model.addObserver(this);
 
 
 
}