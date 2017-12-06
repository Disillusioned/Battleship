//GAMESTATE INFO
var turn = 1; //0 for player, 1 for comp

var playerHealth =  17;
var opponentHealth = 17;

var gameOver = false;

//Players gain shots as they destroy more ships, but the standard is 1
var playerShotsRemaining = 1;
var aiShotsRemaining = 1;

//Gameboard arrays
var playerBoard = [[],[],[],[],[],[],[],[],[],[]];
var compBoard = [[],[],[],[],[],[],[],[],[],[]];

//misc necessary variables
var boardWidth = 10;
var boardHeight = 10;
var i = 0;
var j = 0;






//GAMESTATE CTORS

//object ctor for game pieces.  
//Orien is horizontal or vertical orientation
function piece(type, orien){
    this.type = type; // refer to comments at bottom for type definition
    
    this.sizeOf = function(){
        if(type == 5){
            return 5;
        }
        else if(type == 4){
            return 4;
        }
        else if(type == 3){
            return 3;
        }
        else if(type == 2){
            return 3;
        }
        else if(type == 1){
            return 2;
        }
        else{
        return 0;
        }
    }
    this.orientation = orien; //0 = horizontal, 1 = vertical
    this.prevTargeted == false; //this can be modified to true later on after it has been hit by the computer
    this.isPiece == true;
    //Type to Name def
    //5 -- Carrier
    //4 -- Battleship
    //3 -- Submarine
    //2 -- Destroyer
    //1 -- Patrol
}


function initArrays(){
    for(i = 0; i < boardWidth; ++i){
        for(j = 0; j < boardHeight; ++j){ //init both arrays at zeroes meaning there are no pieces yet.
            playerBoard[i][j] = 0;
            compBoard[i][j] = 0;
        }
    }
}





//GAMESTATE INFORMATION RETRIEVAL (GAMESTATE -> VIEW)
function getSquarePiece(row, col, player){
	if(col == 10 || row == 10){}
	else{

			if(player == 0) //PLAYER IS #0
			{
                if(playerBoard[row][col] == 0)
                {
                    return false;
                }
                else 
                {
                    return true;
                }
			}
			else //COMPUTER IS 1
			{
                if(compBoard[row][col] == 0)
                {
                    return false; //its not a hit
                }
                else
                {
                    return true;
                }
			}
		}
}

function prevTargeted(row, col, player){
	if(col >= 10 || row >= 10){}// do nothing, its out of the bounds of the board
	else{

			if(player == 0) //HUMAN
			{
                if(playerBoard[row][col] == 0 || playerBoard[row][col].prevTargeted == 0)
                {return false;}
                else{return true;}
			}
			else // cOMPUTER
			{
                if(compBoard[row][col] == 0 || compBoard[row][col].prevTargeted == 0)
                {return false;}
                else {return true;}
			}
		}
}


function checkHor(row, col, length){
    var legal = false;
    --row; // have to decrement by one because of the way that the number row show up....
    for(var i = 0; i < length; ++i){
        if(col + i>9){
            return legal = false;
        }
        if(playerBoard[row][col + i] == 0){
            legal = true;
        }
        else {
            legal = false;
            return legal;
        }    
    }

    return legal;
}

function checkVert(row, col, height){
    var legal = false;
    --row; // have to decrement by one because of the way that the number row show up....
    for(var i = 0; i < height; ++i){
        if(row + i > 9){
            return legal=false;
        }
        if(playerBoard[row + i][col] == 0){
            legal = true;
        }
        else{
            legal = false;
            return legal;
        }
    }
    return legal;
}


function checkComp(row, col, size, orient){
    var legal = false;
    if(orient == "horizontal"){
        for(var i = 0; i <size; ++i){
            if(col + i > 9){
                legal = false;
                return legal;
            }
            if(compBoard[row][col+i] == 0){
                legal = true;
            }
            else{
                legal = false;
                return legal;
            }
        }
    }
    else{
        for(var i = 0; i <size; ++i){
            if(row + i > 9){ // this is the case where the piece will go off the board
                legal = false;
                return legal;
            }
            if(compBoard[row+i][col] == 0){
                legal = true;
            }
            else{
                legal = false;
                return legal;
            }
        }
    }

    return legal;
}


//This is the function called to insert pieces into the board
//Size is the size of the piece, orient is orientation, and type is the piece number 1-5 
//as numbered in the piece CTOR
function insertPiece(row, col, size, orient, type){
    --row;
    if(orient == "horizontal"){
        for(var x = 0; x < size; ++x){
            playerBoard[row][col + x] = new piece(type, orient);
        }
    }
    else{
        for(var x = 0; x < size; ++x){
            playerBoard[row + x][col] = new piece(type, orient);
        }
    }
}

function insertComp(row, col, size, orient, type){
    if(orient == "horizontal"){
        for(var x = 0; x < size; ++x){
            compBoard[row][col + x] = new piece(type, orient);
        }
    }
    else{
        for(var x = 0; x < size; ++x){
            compBoard[row + x][col] = new piece(type, orient);
        }
    }
}





//GAMESTATE INFORMATION MODIFICATION (VIEW -> GAMESTATE)

function attack(row, col, player) {
    if (player == 0) { //attacking the player
        //Check if it was a hit or miss
        if (playerBoard[row][col].isPiece == true) {
            playerBoard[row][col].prevTargeted = true;
            //call a function that marks it on the board
            markHit(row, col, player);
            --playerHealth;
            if (playerHealth == 0) {
                gameOver = true;
            }
        }
        else {//it was a miss
            playerBoard[row][col] = 1;
            markMiss(row, col, player);
        }
    }
    else {
        //Check if it was a hit or miss
        if (compBoard[row][col].isPiece == true) {
            compBoard[row][col].prevTargeted = true;
            //call a function that marks it on the board
            markHit(row, col, player);
            --compHealth;
            if (compHealth == 0) {
                gameOver = true;
            }
        }
        else {//it was a miss
            compBoard[row][col] = 1;
            markMiss(row, col, player);
        }
    }
}


//GAMEPLAY FUNCTIONS
function playBall(){
    turnDisplay();
    while(gameOver == false){
        if(turn == 0){ //player is 0
            //wait for player to click
            waitForClick();
            //See where the player selects on grid
            //validate, if good then mark if not then ask to try again
            while(prevTargeted(gRow, gCol, 1) == true){ // the number one signifies that we are checking the computers board
                //Alert the player that it has already been selected...
                window.alert("Already selected, please try another grid cell");
            }
            attack(gRow, gCol, 1);
            turn = 1;
            turnDisplay();
        }
        else{ //computer turn
            //generate random numbers for a space
            var row, col;
            var attackSpace = false;
            do{
                row = getRandomIntInclusive(0,9);
                col = getRandomIntInclusive(0,9);
                attackSpace = prevTargeted(row, col, 0);
            }while(attackSpace == true);
            attack(row, col, 0);
            turn = 0;
            turnDisplay();
        }
    }
}






//PROCEDURAL CODE
initArrays();





























//CODE GRAVEYARD
//object ctor for game object
//function battleship()
//{
//    
//    this.playerHealth = 17, //health is 17 because that is the sum total of the health of all pieces, used to calc EOG
//        this.aiHealth = 17,
//        this.nextPlayer = 0,
//        this.shotsRemain = 1;
//    
//    //Sizes of arrays
//    var width = 11,
//        height = 11;
//    
//    //These are all the two dimensional arrays for the boards
//    //TODO: switch 4 2d arrays to 1 composed of GameBoard obj
//     this.aiPieces = [],      //these two are for the piece positions
//        this.playerPieces = [],
//        this.aiHit = [],         //These two are for the hit and miss markers
//        this.playerHit = [];
//    
//    //should initialize all parts of the array to zeroes signifying the boards are empty
//    //DONE
//    this.initArray = function(){
//        for(var i = 0;i < width; ++i)
//            {
//                //first creates the array at location i
//                this.aiPieces[i] = [];
//                this.playerPieces[i] = [];
//                this.aiHit[i] = [];
//                this.playerHit[i] = [];
//                for(var j = 0; j < height; ++j)
//                    {
//                        //then it fills the created array with 0s
//                        this.aiPieces[i][j] = 0;
//                        this.playerPieces[i][j] = 0;
//                        this.aiHit[i][j] = 0;
//                        this.playerHit[i][j] = 0;
//                    }
//            }
//    }
//    
//    //controller function to place pieces on the board
//    //DONE
//    this.placePiece =function(newPiece, xlocation, ylocation, player){
//        //player = 0 - human, player = 1 - AI
//        if(player == 0){
//            if(newPiece.orientation == 0)
//                {
//                    for(var i = 0;i<newPiece.sizeOf;++i)
//                        {
//                            this.playerPieces[xlocation + i][ylocation] = newPiece;
//                        }
//                }
//            else if(newPiece.orientation == 1)
//                {
//                    for(var i =0;i<newPiece.sizeOf;++i)
//                        {
//                            this.playerPieces[xlocation][ylocation + i] = newPiece;
//                        }
//                }  
//        }
//        else if(player == 1)
//            {
//                if(newPiece.orientation ==0)
//                {
//                    for(var i = 0;i<newPiece.sizeOf;++i)
//                        {
//                            this.aiPieces[xlocation + i][ylocation] = newPiece;
//                        }
//                }
//                else if(newPiece.orientation == 1)
//                {
//                    for(var i =0;i<newPiece.sizeOf;++i)
//                        {
//                            this.aiPieces[xlocation][ylocation + i] = newPiece;
//                        }
//                }  
//            }
//    }
//    
//    
//    this.hit = function(column,row,player){
//        if(player == 0){
//            aiHit[row][column] = 1;
//        }
//        else if(player == 1){
//            playerHit[row][colum] = 1;
//        }
//    }
//}
//
//var playerPieceGrid = [[0,0,0,0,"BATTLE","BATTLE","BATTLE","BATTLE",0,"CARRIER"], [0,0,0,0,0,0,0,0,0,"CARRIER"],[0,0,0,0,0,0,0,0,0,"CARRIER"], [0,0,0,0,0,0,0,0,0,"CARRIER"], [0,0,0,0,0,0,0,0,0,"CARRIER"],["PATROL",0,0,0,0,0,0,0,0,0], ["PATROL",0,0,0,0,0,0,0,0,0], [0,0,"SUB",0,0,0,0,0,0,0], [0,0,"SUB",0,0,0,0,0,0,0], [0,0,"SUB",0,0,0,0,"DESTROY","DESTROY","DESTROY"]];
//var playerHitGrid = [[0,0,-1,0,0,0,0,-1,-1,0], [0,0,0,0,0,-1,0,-1,-1,0], [-1,-1,0,0,0,0,0,0,0,0,], [-1,-1,0,0,0,0,0,0,0,0,], [0,0,0,1,-1,0,-1,0,0,0], [0,0,0,-1,-1,0,0,0,-1,-1], [0,0,0,0,0,0,0,0,-1,-1], [-1,-1,0,0,0,-1,-1,0,0,0], [-1,-1,0,0,0,-1,-1,0,0,0], [0,0,0,0,0,0,0,0,0,0]];
//var compPieceGrid = [[0,0,0,0,0,0,0,0,0,"DESTROY"], [0,0,0,0,0,0,0,0,0,"DESTROY"], [0,0,0,0,0,0,0,0,0,"DESTROY"], [0,0,0,0,0,0,0,0,0,0], [0,0,0,"PATROL","PATROL",0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], ["CARRIER","CARRIER","CARRIER","CARRIER","CARRIER",0,0,0,0,0], [0,0,0,0,0,0,0,"SUB",0,0], [0,0,0,0,0,0,0,"SUB",0,0], ["BATTLE","BATTLE","BATTLE","BATTLE",0,0,0,"SUB",0,0]];
//var compHitGrid = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]];
