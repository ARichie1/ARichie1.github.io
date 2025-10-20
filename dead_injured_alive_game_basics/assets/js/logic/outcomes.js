// IMPORT TOGGLE FUNCTIONS
import {pauseTime, resumeTime, startTimeFunc,
        pauseMovesForever, addMoves,  moveEffect} from "../functions.js";
import {codecrackedSong, gameOverSong} from "../settings/audio.js";
export{outcome}

// OUTCOME DISPLAY FUNCTIONALITY START===================//
let outcomeDisplayDiv = document.querySelector('.outcomeDisplayDiv');
let theMessage = outcomeDisplayDiv.querySelector('.theMessage h1');
let theExtraMessage = outcomeDisplayDiv.querySelector('.theExtraMessage h3');
let theMessageGraphics = outcomeDisplayDiv.querySelector('.theMessageGraphics');
let theCombinationDiv = outcomeDisplayDiv.querySelector('.theCombination');
let theCombination = outcomeDisplayDiv.querySelector('.theCombination .codeout');
let saveMe = outcomeDisplayDiv.querySelector('.saveMe');
let tryAgain = outcomeDisplayDiv.querySelector('.tryAgain');
let next = outcomeDisplayDiv.querySelector('.next');
let menu = outcomeDisplayDiv.querySelector('.menu');
let activator = document.querySelector('.activator');
let outcomeArray;
let mode;
// let gameDiff;
// setInterval(() => {gameDiff = gameDifficulty();}, 1000);
function outcome(message) {
    const mainGame = document.querySelector('.mainGame');
    mode = mainGame.getAttribute('mode');
    const secretCombination = document.querySelector('.currentPrediction .codeout');
// LET (outcomeArray) HOLD THE ARRAY OF OUTCOME MESSAGES.
    outcomeArray = {
        terminated : "Congratulations <br> You cracked it.",
        timeup : "Oops!! <br> Out of Time",
        empty : "Oops!! <br> Out of Moves",
        exit : "Oops!! <br> Wanna Quit??"
    }
// SEND THE OUTCOME MESSAGE
    theMessage.innerHTML = outcomeArray[message];
// DISPLAY THE SECRET COMBINATION
    theCombination.innerHTML = secretCombination.innerHTML;

// DIM THE mainGame DIV
    mainGame.style.opacity = "0.5";
    mainGame.style.zIndex = "-1";
// DISPLAY THE OUTCOME DIV
    outcomeDisplayDiv.style.opacity = "1";
    outcomeDisplayDiv.style.zIndex = "1";

// PAUSE THE TIME REMAINING
    pauseTime();

// PAUSE THE MOVE/MOVES REMAINING
    pauseMovesForever();
    moveEffect();

    if (theMessage.innerHTML == outcomeArray["terminated"]) {
        saveMe.style.display = "none";
        theMessageGraphics.style.display = "none";
        codecrackedSong();
        if (mode == "singlePlayer_survival") {
            next.style.display = "flex";
            next.addEventListener('click', () => { 
                // HIDE THE OUTCOME DIV
                    outcomeDisplayDiv.style.opacity = "0";
                    outcomeDisplayDiv.style.zIndex = "-1";
                // DISPLAY THE mainGame DIV
                    mainGame.style.opacity = "1";
                    mainGame.style.zIndex = "1";
            });
            if (theExtraMessage.innerHTML == 'WIZARD') {
                next.style.display = "none";
            }
        }
    }
    if (theMessage.innerHTML == outcomeArray["timeup"]) {
        theMessageGraphics.innerHTML  = "&#128347;";
        theCombinationDiv.style.display = "none";
        gameOverSong();
    }
    if (theMessage.innerHTML == outcomeArray["empty"]) {
        theMessageGraphics.innerHTML  = "&#128580;";
        theCombinationDiv.style.display = "none";
        gameOverSong();
    }
    if (theMessage.innerHTML == outcomeArray["exit"]) {
        saveMe.style.display = "none";
        theCombinationDiv.style.display = "none";
        theMessageGraphics.innerHTML  = "&#128565;";
    }
}

// IF THE SAVE ME BUTTON IS CLICKED
saveMe.addEventListener('click', () => {
    const mainGame = document.querySelector('.mainGame');
// IF OUTCOME IS TIME UP
    if (theMessage.innerHTML == outcomeArray["timeup"]) {
// ADD EXTRA TIME
        startTimeFunc(0.5);
    }
// IF OUTCOME IS EMPTY(NO MORE MOVES)
    else if (theMessage.innerHTML == outcomeArray["empty"]) {
// ADD EXTRA MOVES
        addMoves(4);
    }

// RE-ACTIVATE THE TIME AND MOVE FUNCTIONS
    resumeTime();
    activator.innerHTML = "reduce";

// HIDE THE OUTCOME DIV
    outcomeDisplayDiv.style.opacity = "0";
    outcomeDisplayDiv.style.zIndex = "-1";
// DISPLAY THE mainGame DIV
    mainGame.style.opacity = "1";
    mainGame.style.zIndex = "1";

// HIDE THE SAVE ME BUTTON
    saveMe.style.display = "none";
// DISPLAY THE SECRET COMBINATION
    theCombinationDiv.style.display = "flex";
});

// IF THE TRY AGAIN BUTTON IS CLICKED
tryAgain.addEventListener('click', () => {
    const mainGame = document.querySelector('.mainGame');
// PAUSE THE TIME REMAINING
    pauseTime();
// PAUSE THE MOVE/MOVES REMAINING
    pauseMovesForever();
    moveEffect();
// HIDE THE OUTCOME DIV
    outcomeDisplayDiv.style.opacity = "0";
    outcomeDisplayDiv.style.zIndex = "-1";
// DISPLAY THE mainGame DIV
    mainGame.style.opacity = "1";
    mainGame.style.zIndex = "1";
});

// IF THE MENU BUTTON IS CLICKED
menu.addEventListener('click', () => {
    location.reload();
});
// OUTCOME DISPLAY FUNCTIONALITY END===================//