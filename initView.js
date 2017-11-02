//DO NOT TRY TO UNDERSTAND THE BELOW FUNCTION
//IT SIMPLY ALLOWS THE USER TO VIEW THE ACTUAL GAME AFTER LOGGING IN SUCCESSFULLY
//IT HOLDS ALL OF THE HTML DATA TO PUT ON THE PAGE AFTER VALIDATION HAS PASSED
//IF NOT, NOTHING WILL SHOW ON THE PAGE

function initView(){
    var playArea = document.getElementById("playArea");
    playArea.innerHTML = '<br><button id="Play">Play</button> <button id="reset">Reset</button><p>Select a piece to place:</p><select id="pieceSelector"><option value="battleship">Battleship</option><option value="carrier">Aircraft Carrier</option><option value="destroyer">Destroyer</option><option value="submarine">Submarine</option><option value="patrol">Patrol</option></select>';

}