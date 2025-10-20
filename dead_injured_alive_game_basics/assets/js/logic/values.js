export {theGencode, gameValueLogic, gameDifficulty, gameDifficultyTime, gameDifficultyMoves}
import { codeGenerator } from "./codeGenerator.js";
import {startTimeFunc, resumeTime, resetTime,
         moveInitiator, decreaseMoves, resetMoves} from "../functions.js"
import { powerUps } from "./powerups.js";

// SET A DEFAULT VALUE FOR THE DIFFICULTY VARIABLES
let difficulty = null;
let difficultyTime = null;
let difficultyMoves = null;

let secretCode;

function gameValueLogic() {
// STORE ALL THE DIFFICULTY TYPES AS AN ARRAY
let diffCheckArray = ["EASY", "MEDIUM", "HARD",
        "DETECTIVE", "WIZARD"];
// GET THE MAINGAME DIV=====================//
    const mainGameDiv = document.querySelector('.mainGame'); 
    let diffLevelDisplay = document.querySelector('.agentToSelect'); 
// GET DIFFICULTY VALUES START=====================//
// CHECK IF USER SELECT ENDLESS
    if (mainGameDiv.classList.contains("ENDLESS")){
        let chosenAgents = mainGameDiv.getAttribute("agents")
// SET THE DIFFICULTY(i.e numbers of spies to find)
        difficulty = parseInt(chosenAgents);
// SET THE DIFFICULTY TIME
        difficultyTime = "...";
// SET THE DIFFICULTY MOVES
        difficultyMoves = "...";
    }else if (mainGameDiv.classList.contains("SURVIVAL")){
        let chosenAgents = mainGameDiv.getAttribute("agents")
// SET THE DIFFICULTY(i.e numbers of spies to find)
        difficulty = parseInt(chosenAgents);
// SET THE DIFFICULTY TIME
        difficultyTime = 5;
// SET THE DIFFICULTY MOVES
        difficultyMoves = 40;
        moveInitiator(difficultyMoves);
    }else{

// CYCLE THROUGH THE (diffCheckArray) TO SET DIFFICULTY 
        for (let i = 0; i < diffCheckArray.length; i++) {
// CHECK FOR THE DIFFICULTY SET IN THE SPECIFIC GAME
// IT IS STORED AS A CLASS IN THE (mainGameDiv). 
            if (mainGameDiv.classList.contains(diffCheckArray[i])) {
// GET THE INDEX OF EACH DIFFICULTY TYPE IN THE (diffCheckArray).
                    let diffIndex = diffCheckArray.indexOf(diffCheckArray[i]);             
// SET THE DIFFICULTY(i.e numbers of spies to find)
                    difficulty = i + 2;
// SET THE DIFFICULTY TIME
// MAKE TIME WHOLE NUMBER IF DIFFICULTY IS (0, 2, 4) 
                    if (diffIndex % 2 == 0) {difficultyTime = i + 1;}
// ELSE ADD 0.5 IF DIFFICULTY IS (1, 5) 
                    else {difficultyTime = i + 0.5;}
// SET THE DIFFICULTY MOVES
                    difficultyMoves = i + 8;       
                }
// DIFFICULTY ARRAY IF CHECK END=========================//
            }
// DIFFICULTY ARRAY FOR LOOP END==========================//
        }
// GET DIFFICULTY VALUES END==============================//

// IF USER DIDNT CHOOSE ENDLESS MODE
// SET AND START THE TIME AND MOVES.
    if (!mainGameDiv.classList.contains("ENDLESS")) {
// LOAD THE MOVES 
        moveInitiator(difficultyMoves);
// START THE TIME
        startTimeFunc(difficultyTime);

// LOAD POWERUPS
        powerUps(difficulty);
    }
// DISPLAY THE CURRENT DIFFICULTY
        diffLevelDisplay.innerHTML = difficulty;

// GENERATE A SECRET CODE BASED ON THE DIFFICULTY
        secretCode = codeGenerator(difficulty);
}

// SENDS THE DIFFICULTY VALUES TO OTHER FILES
function gameDifficulty() {return difficulty;}
function gameDifficultyTime() {return difficultyTime;}
function gameDifficultyMoves() {return difficultyMoves;}

// CALL AND SET THE GAME VALUES
gameValueLogic();

// IN SURVIVAL MODE START===================//
let next = document.querySelector('.next');
let theExtraMessage = document.querySelector('.theExtraMessage h3');
// LET (diffInc) INCREASE THE DIFFICULTY 
// EACH TIME THE NEXT BUTTON IS CLICKED
let diffInc = 3;
next.addEventListener('click', () => {
        let diffLevelDisplay = document.querySelector('.agentToSelect'); 
// LEVEL UP THE DIFFICULTY VARIABLES
        difficulty = diffInc;
        diffLevelDisplay.innerHTML = difficulty;
// CONTINUE THE TIME
        resumeTime();
// GENERATE A NEW CODE
        secretCode = codeGenerator(difficulty);
// GET THE SEND BUTTON
        const numbtnSend = document.querySelector(".numbtnSend");
        numbtnSend.addEventListener('click', () => {decreaseMoves();});
// INCREASE THE DIFFICULTY EACH TIME        
        diffInc++;
// IF USER REACH LAST DIFFICULTY FOR SURVIVAL MODE
// SEND THE ACCOLADES
        if (difficulty == 6) {theExtraMessage.innerHTML = 'WIZARD';}
});
// IN SURVIVAL MODE END===================//

// TRY AGAIN START===================//
let tryAgain = document.querySelector('.tryAgain');
tryAgain.addEventListener('click', () => {
// RESET FOR SURVIVAL MODE START
        const mainGameDiv = document.querySelector('.mainGame'); 
        let diffLevelDisplay = mainGameDiv.querySelector('.agentToSelect'); 
        let gameMode = mainGameDiv.getAttribute('mode');
        if (gameMode == 'singlePlayer_survival') {
                difficulty = 2;diffLevelDisplay.innerHTML = difficulty;
        }
// RESET FOR SURVIVAL MODE END

        if (!mainGameDiv.classList.contains("ENDLESS")) {
// RESET THE TIME AND MOVES
                resetTime(difficultyTime);
                resetMoves(difficultyMoves);       
        }
// GENERATE A NEW CODE
        secretCode = codeGenerator(difficulty);
// GET THE SEND BUTTON
        const numbtnSend = document.querySelector(".numbtnSend");
        numbtnSend.addEventListener('click', () => {decreaseMoves();});
});
// TRY AGAIN END===================//

// SEND THE GENERATED CODE
function theGencode() {return secretCode;}

