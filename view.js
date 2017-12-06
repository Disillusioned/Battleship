//CREATION FUNCTIONS:
//creates the player grid
function createPlayerTable(){
var tr = 10,
        td = 10,
        html = "",
        numCells = 10,
        numRows = 10,
        name = "playerTable",
        i = 0,
        j = 0;
    //create the initial table
	html += "<table id=\"" + name + "\">" ;
    
    //this creates the numbers across the top
    html += "<tr>";
    for (i = 0; i < tr; ++i)
        {
            html += "<th>" + (i+1) + "</th>";
        }
	html += "</tr>";
    
   	 //This starts the actual cells for every row
    //We want the cells to be empty to start, then we will place the pieces
	for (i = 0; i < tr; ++i)
	{
       	 	//adds the tag for the row 
        	html += "<tr>";
			for (j = 0; j < td; ++j) 
			{
                html+= "<td></td>";
			}
        	//add the closing tag for the row
        	html += "</tr>";
	}
    //closing tag for the table
    html += "</table>";
    
    return html;
}

//Creates the computer grid
function createComputerTable(){
var tr = 10,
        td = 10,
        html = "",
        numCells = 10,
        numRows = 10,
        name = "computerTable",
        i = 0,
        j = 0;
    //create the initial table
	html += "<table id=\"" + name + "\">" ;
    
    //this creates the numbers across the top
    html += "<tr>";
    for (i = 0; i < tr; ++i)
        {
            html += "<th>" + (i+1)  + "</th>";
        }

	html += "</tr>";
    
   	 //This starts to create all the data cells
	for (i = 0; i < tr; ++i)
	{
       	 	//adds the tag for the row 
        	html += "<tr>";
			for (j = 0; j < td; j += 1)
			{
                html += "<td></td>";
			}
        	//add the closing tag for the row
        	html += "</tr>";
	}
    //closing tag for the table
    html += "</table>";
    
    return html;
}

//function that creates the table for the player
function placeHTMLPlayer(){
var doc = document.getElementById("Player");
doc.innerHTML = createPlayerTable();
}

//creates the table for the computer player
function placeHTMLComp(){
var doc = document.getElementById("Computer");
doc.innerHTML = createComputerTable();
}









var illegal = "Illegal placement, please try again";
var ready = false;
//INIT FUNCTIONS:

var counter = 5; // This will be the counter used when placing pieces
//Function make all cells in the tables clickable
function makeGridClick(time) {
    if (time == 0) { //The first time this gets run, to let player put pieces on board
        var playerArea = document.getElementById("Player");
        var table = playerArea.getElementsByTagName("table");
        var numRows = 11;
        var numCol = 10;
        for (var i = 0; i < numRows; ++i) {
            for (var j = 0; j < numCol; ++j) {
                table[0].rows[i].cells[j].onclick = function () {
                    var col = this.cellIndex;
                    var row = this.parentNode.rowIndex;
                    var orient = getOrient(); // This should come back horizontal or vertical
                    if (counter == 5) { // placing aircraft carrier (dont have to check is this place is already taken by another piece)
                        //check orientation 
                        //check size of the piece (usually the counter number, but will change later)
                        var size = counter; //This is the length of the piece

                        //if else statement for orientation 
                        //then can do math to see if all grid segments are legal
                        if (orient == "horizontal") {
                            if (checkHor(row, col, size)) { // if checkHor comes back true this runs
                                //need to shade in the boxes for the piece
                                for (var x = 0; x < size; ++x) {
                                    table[0].rows[row].cells[col + x].setAttribute("bgcolor", "0DAB50");
                                }
                                insertPiece(row, col, size, orient, counter);
                                --counter;
                            }
                            else {
                                window.alert(illegal);
                            }
                        }
                        else { //its vertical
                            if (checkVert(row, col, size)) {
                                for (var x = 0; x < size; ++x) {
                                    table[0].rows[row + x].cells[col].setAttribute("bgcolor", "0DAB50");
                                }
                                insertPiece(row, col, size, orient, counter);
                                --counter;
                            }
                            else {
                                window.alert(illegal);
                            }
                        }

                    }
                    else if (counter == 4) {
                        var size = counter;
                        if (orient == "horizontal") {
                            if (checkHor(row, col, size)) {
                                drawPiece(row, col, size, orient, table);
                                insertPiece(row, col, size, orient, counter);
                                --counter;
                            }
                            else {
                                window.alert(illegal);
                            }
                        }
                        else { //its vertical
                            if (checkVert(row, col, size)) {
                                drawPiece(row, col, size, orient, table);
                                insertPiece(row, col, size, orient, counter);
                                --counter;
                            }
                        }
                    }
                    else if (counter == 3) {
                        var size = counter;
                        if (orient == "horizontal") {
                            if (checkHor(row, col, size)) {
                                drawPiece(row, col, size, orient, table);
                                insertPiece(row, col, size, orient, counter);
                                --counter
                            }
                            else {
                                window.alert(illegal);
                            }
                        }
                        else { // its Vertical
                            if (checkVert(row, col, size)) {
                                drawPiece(row, col, size, orient, table);
                                insertPiece(row, col, size, orient, counter);
                                --counter
                            }
                            else {
                                window.alert(illegal);
                            }
                        }
                    }
                    else if (counter == 2) { //Now its the second size three piece so we have to change some variables to match that
                        var size = counter + 1;
                        if (orient == "horizontal") {
                            if (checkHor(row, col, size)) {
                                drawPiece(row, col, size, orient, table);
                                insertPiece(row, col, size, orient, counter);
                                --counter
                            }
                            else {
                                window.alert(illegal);
                            }
                        }
                        else{//Its vertical
                            if (checkVert(row, col, size)) {
                                drawPiece(row, col, size, orient, table);
                                insertPiece(row, col, size, orient, counter);
                                --counter
                            }
                            else {
                                window.alert(illegal);
                            }
                        }
                    }
                    else if(counter == 1){
                        var size = counter + 1;
                        if (orient == "horizontal") {
                            if (checkHor(row, col, size)) {
                                drawPiece(row, col, size, orient, table);
                                insertPiece(row, col, size, orient, counter);
                                --counter
                            }
                            else {
                                window.alert(illegal);
                            }
                        }
                        else{//Its vertical
                            if (checkVert(row, col, size)) {
                                drawPiece(row, col, size, orient, table);
                                insertPiece(row, col, size, orient, counter);
                                --counter
                            }
                            else {
                                window.alert(illegal);
                            }
                        }
                        var alertDiv = document.getElementById("alert");
                        alertDiv.innerHTML = "After selecting last piece, please click once more on the grid to finalize pieces and start game";
                    }
                    else if(counter == 0){ // This will be the code that then does all of the checking for pieces after play has started
                        if(compPiece == 0){
                            ready = true;
                            if(ready == true){
                                var turn = getRandomIntInclusive(0,1);
                                playBall();
                            }
                        }
                    }
                }
            }
        }
    }
}

var gRow, gCol;
var prevRow, prevCol;
function captureClick(r, c){
    //This function holds onto the last received coordinates from a glid click that we then
    gRow = r;
    gCol = c;
}

function waitForClick(){
    while(prevRow == gRow && prevCol == gCol){
    }
}


function setCompClick(){
    var compBoardHTML = document.getElementById("computerTable");
    for(var i = 0; i < 11; ++i){ // has to be 11 to account for the extra row of row numbers
        for(var j = 0; j < 10; ++j){
            compBoardHTML.rows[i].cells[j].onclick = function(){
                var r = this.parentNode.rowIndex;
                var c = this.cellIndex;
                captureClick(r, c);
            }
        }

    }
}


//This was taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//Search for RNG Javascript
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

var compPiece = 5;
function compPlace(){ // Function is currently pseudo infinite looping....need to fix.  
        //For Debugging:
        console.log("Calling compPlace for piece " + compPiece);
        //1.Generate Random Numbers for "Click"
        var row = getRandomIntInclusive(0,9);
        var col = getRandomIntInclusive(0,9);
        var orient = setOrient(getRandomIntInclusive(0,1));


        if(checkComp(row,col,pieceSize(compPiece), orient)){ //if this is a legal space
            insertComp(row, col, pieceSize(compPiece), orient, compPiece);
            --compPiece;
        }
}

function pieceSize(counterNum){
    if(counterNum == 5){
        return 5;
    }
    else if(counterNum == 4){
        return 4;
    }
    else if(counterNum == 3 || counterNum == 2){
        return 3;
    }
    else if(counterNum == 1){
        return 2;
    }
}

function setOrient(num){
    if(num == 0){
        return "horizontal";
    }
    else if(num == 1){
        return "vertical";
    }
}


//initializes the buttons on the page ( PLAY )
function btnInit(){
    var btn = document.getElementById("Play");
    btn.onclick = function(){
            
        var playArea = document.getElementById("playArea");
        //This adds in the divs and necessary structs for the game area after the play button has been clicked
        playArea.innerHTML += ('<h2>Computer Grid</h2><div id="Computer"></div><div id="ComputerText"></div><br><div id="turnArea"></div><h2>Player Grid</h2>    <div id="Player"></div><div id="PlayerText"></div>');
        

        
        //Make these display empty grids
        placeHTMLPlayer();
        placeHTMLComp();
        
        //This makes both of the grids clickable
        //parameter for this is 0, because its the first time its being run
        //allows pieces to be placed
        makeGridClick(0);
        setCompClick();


        var alert = document.getElementById("alert");
        alert.innerHTML = "<h2>Please place your pieces</h2>";
        alert.innerHTML = "<h2>Select a grid box to place your pieces</h2>";

    }
}

function getOrient(){
    var orient = document.getElementById("orienSelector").value;
    return orient;
}

function drawPiece(row, col, size, orient, tabl){
    var table = tabl;
    if(orient == "horizontal"){
        for(var x = 0; x < size; ++x){
            table[0].rows[row].cells[col+x].setAttribute("bgcolor", "0DAB50");
        }
    }
    else{
        for(var x = 0; x < size; ++x){
            table[0].rows[row+x].cells[col].setAttribute("bgcolor", "0DAB50");
        }
    }
}


//Marking functions
//This one is only for hits
function markHit(row, col, player){
    if(player == 0){//marking the players board
        var board = document.getElementById("playerTable");
        var td = board.getElementsByTagName("table");
        board.rows[row].cells[col].setAttribute("bgcolor", "red");   
    }
    else{
        var board = document.getElementById("computerTable");
        var td = board.getElementsByTagName("table");
        board.rows[row].cells[col].setAttribute("bgcolor", "red"); 
    }
}

function markMiss(row,col,player){
    if(player == 0){//marking the players board
        var board = document.getElementById("playerTable");
        var td = board.getElementsByTagName("table");
        board.rows[row].cells[col].setAttribute("bgcolor", "blue");   
    }
    else{
        var board = document.getElementById("computerTable");
        var td = board.getElementsByTagName("table");
        board.rows[row].cells[col].setAttribute("bgcolor", "blue"); 
    }
}

function turnDisplay(){
    var turnArea = document.getElementById("turnArea");
    if(turn == 0){
        turnArea.innerHTML = "Player Turn";
    }
    else{
        turnArea.innerHTML = "Computer Turn";
    }
}









//CALLED FUNCTIONS:
btnInit();


while(compPiece > 0){
    compPlace();
}



































//CODE GRAVEYARD
//
//
// //this function is now deprecated, no longer needed for login area of page
// function clearClick(){
//     var clear = document.getElementById("clear");
//     clear.onclick = function(){
//         var username = document.getElementById("Username");
//         var pass = document.getElementById("password");
        
//         username.value = "";
//         password.value = "";
//     }
// }


// //init the text box on the page for testing
// function txtInit(){
//     var txtBox = document.getElementById("test");
//     txtBox.onchange = function(){
//     var txt = document.getElementById("textboxtext");
//     txt.innerHTML = "<p>" + txtBox.value + "</p>";
//     }
// }

// //init the selection box on the page for testing.  
// function selectInit(){
//     var select = document.getElementById("pieceSelector");
//     select.onchange = function(){
//         var txt = document.getElementById("selectText");
//         txt.innerHTML = "<p>" + select.value.toUpperCase() + "</p>";
//     }
// }



// //The Functions here are necessary for page startup
// function submitClick()
// {
//     var submit = document.getElementById("Submit");
//     submit.onclick = function(){       
        
//         //get data to pass to the POST request
//         var username = document.getElementById("Username").value;
//         var password = document.getElementById("password").value;
//         var data = "userName="+username+"&password="+password;
        
//         //create a new XHR
//         var getReq = new XMLHttpRequest();
        
//         //Open the connection async
//         getReq.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", true);
        
//         //set the loading screen
//         var div = document.getElementById("test");
//         div.innerHTML = "<p>Loading...</p>";
        
//         getReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
//         getReq.onreadystatechange = function(){
//             //Only really care if it comes back and it worked, if it didnt it just wont do anything
//             if(getReq.readyState == 4 && getReq.status == 200){
                
//                 //if the result was valid...
//                 var valid = getReq.responseText;
//                 valid = JSON.parse(valid);
//                 if(valid.result == "valid"){
                    
                    
//                     //Then load the page:
//                     //This one initializes and puts the divs and placeholders for the future grids on the screen
//                     initView();
                    

//                     btnInit();
//                     txtInit();
//                     selectInit();
                    
//                     localStorage.setItem('login', JSON.stringify(valid));
                    
//                     //this should give me the object back from the localstorage
//                     var timestamp = JSON.parse(localStorage.getItem('login'));
//                     var userName = timestamp.userName;
//                     var time = timestamp.timestamp;
                
//                     var div = document.getElementById("test");
//                     div.innerHTML = "<p>" + username + " logged in at "+ time + "</p>";
                    
//                     var pleaseText = document.getElementById("please");
//                     pleaseText.innerHTML = "";
                    
                    
//                 }
//                 else if(valid.result == "invalid"){
//                     var div = document.getElementById("test");
//                     div.innerHTML = "<p>Invalid Login. Please try again.</p>";
                    
//                     var playArea = document.getElementById("playArea");
//                     playArea.innerHTML = "";
//                 }
//             } 
//         }
//         //actually send the username and password to the server
//         getReq.send(data);
//     }
// }



// function clearLocalStorage(){
//     var clearStorage = document.getElementById("clearLocalStorage");
//     clearStorage.onclick = function(){
//         console.log(localStorage.getItem('login')); //shows the login object before being deleted
//         localStorage.clear();
//         console.log(localStorage.getItem('login')); //shows the login object is no longer there
        
//         var div = document.getElementById("test");
//         div.innerHTML = "<p> Local Storage Cleared </p>";
//     }
// }




//        computerCells[i].onclick =  function(){
//            var col = this.cellIndex;
//            var row = this.parentNode.rowIndex;


// function hoverMulti(row, col){
//     var playerArea = document.getElementById("Player");
//     var playTable = playerArea.getElementsByTagName("table"); // this should get the table from the Player Area
    
//     var selectedPiece = document.getElementById("pieceSelector");
//     if(document.getElementById("radio1").checked){
//         var orientation = 0; // horizontal selected
//     }
//     else if (document.getElementById("radio2").checked){
//         var orientation = 1; //vertical selected
//     }

//     //need a way to access the column and row that we are hovering over, should do it the same way as the onclick event 
//     //so what I can do is get the column and row using this keyword
//     //then pass those into this function inside of the onblur function

//     playTable[0].rows[row].cells[col].style.backgroundColor = "grey";

// }


// //This is the function that gets called when a player clicks on a gamegrid
// //This is going to be the original onclick modifier, it will only work till the player is done placing
// //pieces, then it will switch to the other one to handle targeting
// //What if we just have an if statement
// //if player (time) == 0, the player has not placed piecs yet
// //player == 1, player has placed pieces and is now doing targeting
// function clickBait(r, column, player){ //REMEMBER player 0 is player, player 1 is computer
//     if(player == 1){ //computer side
//     var side = document.getElementById("Computer"); //get the player div
//     var grid = side.getElementsByTagName("table"); //get the the table in the player div
//     var cell = grid[0].rows[r].cells[column]; //have to say grid[0] because grid is a list of table elements of size 1
    
//     //Now check if its a hit or a miss.
        
//     if(getSquarePiece(r, column, 1) == true)//It was a piece
//     {
//         //It was a hit
//         //change the piece to say it has been hit (prevTargeted)
//         //place the graphic of a hit
//         cell.innerHTML = "<img src=hit.png alt=hit>";
//         compBoard[r][col].prevTargeted = true;
//     }
//     else{
//         //It was a miss
//         //change the grid to say that it has been targeted already
//         //place the miss graphic
//         cell.innerHTML = "<img src=miss.png alt=miss>";
//         compBoard[r][col] = 1;
//     }
    
//     }
//     else if(player == 0){
//     var side = document.getElementById("Player"); //get the player div
//     var grid = side.getElementsByTagName("table"); //get the the table in the player div
//     var cell = grid[0].rows[r].cells[column]; //have to say grid[0] because grid is a list of table elements of size 1
    
//     if(getSquarePiece(r,column, 0) == true)//player piece
//     {
//         cell.innerHTML = "<img src=hit.png alt=hit>";
//         playerBoard[r][col].prevTargeted = true;
//     }
//     else{
//         //It was a miss
//         cell.innerHTML = "<img src=miss.png alt=miss>";
//         playerBoard[r][col] == 1;
//         }
    
//     //Now need to display text of where the person clicked, for assignment 4
//     var putText = document.getElementById("PlayerText");
//     putText.innerHTML = "<p>You clicked row " + r + " column " + column +".</p>";
    
//     }
// }