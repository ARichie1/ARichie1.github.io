export {hide, unhide, scriptMaker, scriptDestroyer, toggleStyle, toggleClassname, toggleContent, 
    conditionallyToggleContentUsingStyle,
    conditionallyToggleStyleUsingContent,
    moveInitiator, decreaseMoves, addMoves, 
    pauseMoves, pauseMovesForever,moveEffect, resetMoves,
    startTimeFunc, pauseTime, resumeTime, addTime, resetTime,
    outcome}
import { outcome } from "./logic/outcomes.js";
const mainBody = document.querySelector('body');

// HIDE AND SHOW START==================//
function hide(element) {
    element.style.opacity = "0";
    element.style.zIndex = "-1";}
function unhide(element) {
    element.style.opacity = "1";
    element.style.zIndex = "1";}
// HIDE AND SHOW END==================//

// SCRIPT TAG MAKER START=================//
function scriptMaker(source) {
    let maker = document.createElement('script');
    maker.setAttribute('src', source);
    maker.setAttribute('type', 'module');
    return maker;
}
// SCRIPT TAG MAKER END=================//

// SCRIPT TAG DESTROYER START=================//
function scriptDestroyer(source) {
    let gameScripts = mainBody.querySelectorAll('script');
    gameScripts.forEach(gs => {
    let scriptSource = gs.getAttribute("src");
            if (scriptSource == source) {
                    gs.remove();
            } 
    });   
}
// SCRIPT TAG DESTROYER END=================//

// =====TOGGLE FUNCTIONALITY START=====//
//Style Toggler
function toggleStyle(el, prop, style1, style2) {
	el.style[prop] = el.style[prop] === style1 ? style2 : style1;
}
//Class Toggler
function toggleClassname(el, class1, class2) {
	el.className = el.className === class1 ? class2 : class1;
}
//Content Toggler
function toggleContent(el, content1, content2) {
	el.innerHTML = el.innerHTML === content1 ? content2 : content1;
}
// =====TOGGLE FUNCTIONALITY END=====//

// =====CONDITIONAL TOGGLE FUNCTIONALITY START=====//
//Conditionally Content Toggler
function conditionallyToggleContentUsingStyle(del, prop, conditionOne, conditionTwo, el, content1, content2) {
//USE setInterval TO CHECK FOR CHANGES EVERY ONE SECOND(FOR UPDATES)
    setInterval(() => {
        if ( del.style[prop] == conditionOne || del.style[prop] == conditionTwo) {
            el.innerHTML = content1;
         }
         else{el.innerHTML = content2;}
    }, 1000);
}
//Conditionally Style Toggler
function conditionallyToggleStyleUsingContent(del, conditionOne, conditionTwo, el, prop, style1, style2) {
//USE setInterval TO CHECK FOR CHANGES EVERY ONE SECOND(FOR UPDATES)
    setInterval(() => {
        if ( del.innerHTML == conditionOne || del.innerHTML == conditionTwo) {
            el.style[prop] = style1;
         }
         else{el.style[prop] = style2;}
    }, 1000);
}
// =====CONDITIONAL TOGGLE FUNCTIONALITY END=====//

//=====TIME FUNCTIONALITY START=====//
// const timeDisplay = document.querySelector('.time');
let timeDisplay;
setInterval(() => {
    timeDisplay = document.querySelector('.yourTime');
}, 1000);

// THESE WILL HOLD THE CURRENT MINUTES AND SECONDS RESPECTIVELY
let currentMinutes;
let currentSeconds;

// =====THE TIME CORE START======================================//
function startTimer(duration, display) {
        var start = Date.now(),
            diff,minutes,seconds;

    function timer() {
// GET THE NUMBER OF SECONDS THAT HAVE ELAPSED SINCE
// startTimer() WAS CALLED.
        diff = duration - (((Date.now() - start) / 1000) | 0);

// MAKE THE TIME WHOLE NUMBERS,
// DOES THE SAME JOB AS parseInt TRUNCATES THE FLOAT
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

// MODIFY THE LOOK IF LESS THAN 10
        minutes = minutes < 10 ? minutes : minutes;
// PREFIX ZERO TO THE SECONDS IF IT IS LESS THAN 10
// SO IT LOOKS LIKE A DOUBLE DIGIT NUMBER
        seconds = seconds < 10 ? '0' + seconds : seconds;
// GET THE CURRENT MINUTES AND SECONDS
        currentMinutes = minutes;
        currentSeconds = seconds;
// IF THE NO MORE TIME
        if(seconds <= 0 && minutes <= 0){
// SEND THE OUTCOME
            outcome("timeup");
        }
// INSERT THE TIME TO THE SPECIFIED TIME ELEMENT.
        display.innerHTML = minutes + ':' + seconds;

        if (diff <= 0) {
// ADD ONE SECOND, SO THAT THE COUNT DOWN 
// STARTS AT THE FULL DURATION ; example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    }
// START THE TIMER IMMEDIATELY
// DON'T WANT TO WAIT A FULL SECOND BEFORE THE TIMER STARTS
    timer();
// GIVE THE TIMER AN INTERVAL AND AN INTERVAL NAME (myTimer) 
// SO WE CAN CONTROL IT LATER.
     window.myTimer = setInterval(timer, 1000);
}
// =====THE TIME CORE END======================================//

// =====START TIME FUNCTIONALITY START=====================// 
function startTimeFunc(time) {
    var duration = 60 * time,
    display = document.querySelector('#time');
	startTimer(duration, timeDisplay);
};
// =====START TIME FUNCTIONALITY END=====================//

// =====PAUSE TIME FUNCTIONALITY START=====================//
function pauseTime() {
    if(window.myTimer) {
        clearInterval(window.myTimer);
        window.myTimer = null;
    }
}
// =====PAUSE TIME FUNCTIONALITY END=====================//

// =====RESUME TIME FUNCTIONALITY END=====================//
function resumeTime() {
        let currentTime = (currentMinutes * 60) + (currentSeconds);
        let newTime = currentTime / 60;
        startTimeFunc(newTime);
}
// =====RESUME TIME FUNCTIONALITY END=====================//


// =====ADD TIME FUNCTIONALITY END=====================//
function addTime(addedTime) {
    let currentTime = (currentMinutes * 60) + (currentSeconds);
    let oldTime = currentTime / 60;
    startTimeFunc(oldTime + addedTime);
}
// =====ADD TIME FUNCTIONALITY END=====================//

// =====RESET TIME FUNCTIONALITY END=====================//
function resetTime(rTime) {
    let currentTime = (currentMinutes * 60) + (currentSeconds);
    let oldTime = currentTime / 60;
    let diffInTime = rTime - oldTime;
    startTimeFunc(oldTime + diffInTime);
}
// =====RESET TIME FUNCTIONALITY END=====================//
//=====TIME FUNCTIONALITY END=====//


// MOVES DISPLAY FUNCTIONALITY START===================//
let movesDisplay;
setInterval(() => {
    movesDisplay = document.querySelector('.yourMoves');
}, 1000);
// let movesDisplay = document.querySelector('.yourMoves');
let movesCnt = 0;
let theMoves;

// MOVE INITIATOR START==============//
function moveInitiator(initial) {
    theMoves = initial;
    movesDisplay.innerHTML = initial;
}
// MOVE INITIATOR END==============//

// SUBSTRACT FORM MOVES BY ONE START==============//
function decreaseMoves() {
    let moves = theMoves;
    movesCnt = parseInt(movesCnt) + parseInt(1);
    movesDisplay.innerHTML = moves - movesCnt;
// IF THE NO MORE MOVES(moves = 0)
	if (movesCnt >= moves) {
// SEND THE OUTCOME
            outcome("empty");
	}
}
// SUBSTRACT FORM MOVES BY ONE END==============//

// ADD TO MOVES START===========================//
function addMoves(addedMoves) {
    let currentMoves = parseInt(movesDisplay.innerHTML);
    movesDisplay.innerHTML = currentMoves + addedMoves;
    theMoves = currentMoves + addedMoves;
    movesCnt = 0;
}
// ADD TO MOVES END===========================//

// RESET MOVES START===========================//
function resetMoves(rMoves) {
    let currentMoves = parseInt(movesDisplay.innerHTML);
    let diffInMoves = rMoves - currentMoves;
    movesDisplay.innerHTML = currentMoves + diffInMoves;
    theMoves = currentMoves + diffInMoves;
    movesCnt = 0;
}
// RESET MOVES END===========================//

// PAUSE MOVES START===========================//
// Get the move activator
let activator = document.querySelector('.activator');
// SET THE ACTIVATOR TO "reduce", SO THAT BY DEFAULT
// THE MOVE WILL REDUCE WHEN THE SEND BUTTON IS CLICKED
activator.innerHTML = "reduce";

// BUILD THE PAUSE MOVE FUNCTION
function pauseMoves() {
// CHANGE THE MOVE ACTIVATOR TO ENABLE PAUSE ONLY
    activator.innerHTML = "pause";
// GET AND SET THE CURRENT MOVE TO BE UNCHANGEABLE
// FOR X SECONDS
    let currentMoves = parseInt(movesDisplay.innerHTML);
    movesDisplay.innerHTML = currentMoves;
// AFTER 60 SECONDS ENABLE THE ACTIVATOR TO REDUCE ONLY
    setTimeout(() => {
        activator.innerHTML = "reduce";
    }, 60000);
}
// PAUSE MOVES END===========================//


// PAUSE MOVES FOREVER START===========================//
// BUILD THE PAUSE MOVE FUNCTION
function pauseMovesForever() {
// CHANGE THE MOVE ACTIVATOR TO ENABLE PAUSE ONLY
    activator.innerHTML = "pause";
// GET AND SET THE CURRENT MOVE TO BE UNCHANGEABLE
// FOR X SECONDS
    let currentMoves = parseInt(movesDisplay.innerHTML);
    movesDisplay.innerHTML = currentMoves;
}
// PAUSE MOVES FOREVER END===========================//

// REDUCE THE MOVES IF THE MOVE ACTIVATOR IS REDUCE
// i.e IF THE wizrad powerUp is not fired.
function moveEffect() {
    if (activator.innerHTML == "reduce") {
        decreaseMoves();
        console.log(activator.innerHTML);
    }else{
        return;
    }
}
// MOVES DISPLAY FUNCTIONALITY END===================//