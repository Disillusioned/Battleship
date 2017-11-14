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


    turn.innerHTML = "Turn: " + json.turn;
    playerHealth.innerHTML = "Your Health: " + json.playerHealth;
    compHealth.innerHealth = "Computer Health: " + json.compHealth;

    var compCells = compBoard.getElementsByTagName("td");
    var playerCells = playerBoard.getElementsByTagName("td");

    for(var i = 0; i < sizeof(compCells); ++i){
        
    }

    
}

parseJSON();