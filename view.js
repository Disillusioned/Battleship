//TODO: Create a function to let the player place pieces


//creates the player grid
function createPlayerTable(){
var tr = 10,
        td = 10,
        html = "",
        numCells = 10,
        numRows = 10,
        name = "table",
        i = 0,
        j = 0;
    //create the initial table
	html += "<table>" ;
    
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
        name = "table",
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

//Function make all cells in the tables clickable
function makeGridClick(){  
    
    //This makes the computer side clickable
    var computer = document.getElementById("Computer");
    var computerCells = computer.getElementsByTagName("td");
    var numCells = 100; //number of cells in the whole table
    for(var i = 0; i < numCells; ++i){
        computerCells[i].onclick =  function(){
            var col = this.cellIndex;
            var row = this.parentNode.rowIndex;
            clickBait(row, col, 1);
        }
        //computerCells[i].onblur
    }
    
    //This makes the player side clickable
    var player = document.getElementById("Player");
    var playerCells = player.getElementsByTagName("td"); //should now create an array that has all of the cells in it.
   
    for(var i = 0; i < numCells; ++i){
        
        playerCells[i].onclick = function(){
            var col = this.cellIndex;               //These two lines of code work, even though the auto finisher didnt pick up 
            var row = this.parentNode.rowIndex;     // the names of cellIndex and rowIndex.
            clickBait(row, col, 0);
        }
    }
}

//This is the function that gets called when a player clicks on a gamegrid
function clickBait(r, column, player){ //REMEMBER player 0 is player, player 1 is computer
    if(player == 1){ //computer side
    var side = document.getElementById("Computer"); //get the player div
    var grid = side.getElementsByTagName("table"); //get the the table in the player div
    var cell = grid[0].rows[r].cells[column]; //have to say grid[0] because grid is a list of table elements of size 1
    
    //Now check if its a hit or a miss.
        
    if(getSquarePiece(r,column, 1) == "CARRIER" || getSquarePiece(column,r, 1) == "BATTLE" || getSquarePiece(column,r, 1) == "PATROL" || getSquarePiece(column,r, 1) == "DESTROY" || getSquarePiece(column,r, 1) == "SUB") // IF IT WAS A PIECE
    {
        //It was a hit
        cell.innerHTML = "<img src=hit.png alt=hit>";
    }
    else{
        //It was a miss
        cell.innerHTML = "<img src=miss.png alt=miss>";
        if(getSquareHit(column,r,1) == 0){
            hit(column,r,1);
        }
    }
    
    }
    else if(player == 0){
    var side = document.getElementById("Player"); //get the player div
    var grid = side.getElementsByTagName("table"); //get the the table in the player div
    var cell = grid[0].rows[r].cells[column]; //have to say grid[0] because grid is a list of table elements of size 1
    cell.innerHTML = "<p>You clicked me!</p>";
    
    //Now need to display text of where the person clicked, for assignment 4
    var putText = document.getElementById("PlayerText");
    putText.innerHTML = "<p>You clicked row " + r + " column " + column +".</p>";
    
    }
}

//initializes the buttons on the page ( RESET AND PLAY )
function btnInit(){
    var btn = document.getElementById("Play");
    btn.onclick = function(){
            
        var playArea = document.getElementById("playArea");
        //This adds in the divs and necessary structs for the game area after the play button has been clicked
        playArea.innerHTML += ('<h2>Computer Grid</h2><div id="Computer"></div><div id="ComputerText"></div><br><h2>Player Grid</h2>    <div id="Player"></div><div id="PlayerText"></div><div id="AnimationSection"><img id="aniBoat" src="aniBoat.png" alt="boat"></div>');
        

        
        //Make these display empty grids
        placeHTMLPlayer();
        placeHTMLComp();
        
        //This makes both of the grids clickable
        makeGridClick();
        
        var alert = document.getElementById("alert");
        alert.innerHTML = "<h2>Please place your pieces</h2>";

        
        document.getElementById("login").innerHTML = "";

        //HERE WE WILL ASK THE PLAYERS TO PLACE THE PIECES..
        //TODO: Move all of this to another function, then reference the function here

    }
    
    var rst = document.getElementById("reset");
    rst.onclick = function(){
        window.alert("Trying to reset?");
    }
}

//init the text box on the page for testing
function txtInit(){
    var txtBox = document.getElementById("test");
    txtBox.onchange = function(){
    var txt = document.getElementById("textboxtext");
    txt.innerHTML = "<p>" + txtBox.value + "</p>";
    }
}

//init the selection box on the page for testing.  
function selectInit(){
    var select = document.getElementById("pieceSelector");
    select.onchange = function(){
        var txt = document.getElementById("selectText");
        txt.innerHTML = "<p>" + select.value.toUpperCase() + "</p>";
    }
}



//The Functions here are necessary for page startup
function submitClick()
{
    var submit = document.getElementById("Submit");
    submit.onclick = function(){       
        
        //get data to pass to the POST request
        var username = document.getElementById("Username").value;
        var password = document.getElementById("password").value;
        var data = "userName="+username+"&password="+password;
        
        //create a new XHR
        var getReq = new XMLHttpRequest();
        
        //Open the connection async
        getReq.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", true);
        
        //set the loading screen
        var div = document.getElementById("test");
        div.innerHTML = "<p>Loading...</p>";
        
        getReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
        getReq.onreadystatechange = function(){
            //Only really care if it comes back and it worked, if it didnt it just wont do anything
            if(getReq.readyState == 4 && getReq.status == 200){
                
                //if the result was valid...
                var valid = getReq.responseText;
                valid = JSON.parse(valid);
                if(valid.result == "valid"){
                    
                    
                    //Then load the page:
                    //This one initializes and puts the divs and placeholders for the future grids on the screen
                    initView();
                    

                    btnInit();
                    txtInit();
                    selectInit();
                    
                    localStorage.setItem('login', JSON.stringify(valid));
                    
                    //this should give me the object back from the localstorage
                    var timestamp = JSON.parse(localStorage.getItem('login'));
                    var userName = timestamp.userName;
                    var time = timestamp.timestamp;
                
                    var div = document.getElementById("test");
                    div.innerHTML = "<p>" + username + " logged in at "+ time + "</p>";
                    
                    var pleaseText = document.getElementById("please");
                    pleaseText.innerHTML = "";
                    
                    
                }
                else if(valid.result == "invalid"){
                    var div = document.getElementById("test");
                    div.innerHTML = "<p>Invalid Login. Please try again.</p>";
                    
                    var playArea = document.getElementById("playArea");
                    playArea.innerHTML = "";
                }
            } 
        }
        //actually send the username and password to the server
        getReq.send(data);
    }
}

function clearClick(){
    var clear = document.getElementById("clear");
    clear.onclick = function(){
        var username = document.getElementById("Username");
        var pass = document.getElementById("password");
        
        username.value = "";
        password.value = "";
    }
}

function clearLocalStorage(){
    var clearStorage = document.getElementById("clearLocalStorage");
    clearStorage.onclick = function(){
        console.log(localStorage.getItem('login')); //shows the login object before being deleted
        localStorage.clear();
        console.log(localStorage.getItem('login')); //shows the login object is no longer there
        
        var div = document.getElementById("test");
        div.innerHTML = "<p> Local Storage Cleared </p>";
    }
}


function hoverMulti(){
    
}



//called functions section
//These are the only functions that are called when the game originally starts
clearClick();
submitClick();
clearLocalStorage();


