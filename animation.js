var boat, msPerFrame, frameCount, moveDist, boatImgDivHeight;
var boatsTopSize;
var margin = 10;
var leftRight = 0;
var leftTolerance = 100,
    rightTolerance = -100;
function startMove() {
    boat = document.getElementById("aniBoat");

    msPerFrame = 100;

    moveDist = 10;

    var botDiv = document.getElementById("AnimationSection");
    boatImgDivHeight = botDiv.offsetHeight;

    boatsTopSize = 0;//how much space the animation has moved
    setTimeout(boatAnimation, msPerFrame);
}

function boatAnimation() {
    boatsTopSize +=  moveDist;
    boat.style.top = boatsTopSize + "px";

    if (boatsTopSize < boatImgDivHeight - boat.height - margin) {
	setTimeout(boatAnimation, msPerFrame);
    }
}

startMove();