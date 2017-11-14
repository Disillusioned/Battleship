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

    var playerGrid = document.getElementById("playerGrid")

    
}

parseJSON();