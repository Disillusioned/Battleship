function parseJSON(){
    //Get the JSON file from local storage
    var request = new XMLHttpRequest();
    request.open("GET", "EXjson.json", false);
    request.send(null);
    //By here request should have the JSON object in it in the response section

    var json = request.response;
    json = JSON.parse(json);

    //Things I need to parse out:
    //Player grid
    //Comp grid
    //Player health
    //Comp health
    //turn
    //shotsremaining (beta)

    var playerBoard = document.getElementById("playerBoard");
    var compBoard = document.getElementById("compBoard");
    var compHealth = document.getElementById("compHealth");
    var playerHealth = document.getElementById("playerHealth");
    var turn = document.getElementById("turn");

    //Player Board and CompBoard are 2D arrays ex. playerboard.rows[row].cells[col];

    turn.innerHTML = "Turn: " + json.turn;
    playerHealth.innerHTML = "Your Health: " + json.playerHealth;
    compHealth.innerHealth = "Computer Health: " + json.compHealth;


    console.info(playerBoard.length);

    var constArraySize = 3;
    var playerObjGrid = json.playerBoard;
    var compObjGrid = json.compBoard;

    //Three different values inside of the ObjGrids:
    // 0 - Means hasnot been targeted, but will be a miss
    // 1 - Means has been targeted, was a miss
    // Piece obj - has a parameter if prevTargeted.
    //      If prevTargeted is 0 - means that has not been targeted
    //      If prevtargeted is 1 - means has already been shot, was a hit

    //Really only need to display for player board: Pieces, and missed shots against player
    for(var i = 0; i < constArraySize; ++i){
        for(var j = 0; j < constArraySize; ++j){
            if(playerObjGrid[i][j] == 1){ // Is a prevTargeted miss, display water splash
                playerBoard.rows[i].cells[j].innerHTML = "<img src='miss.png' alt='MISS'>";
            }
            else if(playerObjGrid[i][j].prevTargeted == 1){ //is a prevTargeted piece, display fire
                playerBoard.rows[i].cells[j].innerHTML = "<img src='hit.png' alt='HIT'>";
            }
            else if(playerObjGrid[i][j].isPiece == 1){ //is a Piece, but has not been hit, display black box
                playerBoard.rows[i].cells[j].setAttribute("bgcolor","black");
            }
        }
    }

    //For computerBoard, only need to show misses and hits, no pieces, so only show 1's and pieces that prevTargeted = 1
    for(var i = 0; i < constArraySize; ++i){
        for(var j = 0; j < constArraySize; ++j){
            if(compObjGrid[i][j] == 1){ // Is a prevTargeted miss, display water splash
                compBoard.rows[i].cells[j].innerHTML = "<img src='miss.png' alt='MISS'>";
            }
            else if(compObjGrid[i][j].prevTargeted == 1){ //is a prevTargeted piece, display fire
                compBoard.rows[i].cells[j].innerHTML = "<img src='hit.png' alt='HIT'>";
            }
        }
    }
}

parseJSON();