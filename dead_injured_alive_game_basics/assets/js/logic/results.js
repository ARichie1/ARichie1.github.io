// IMPORT FUNCTIONS FROM functions.js
import {moveEffect, toggleContent} from "../functions.js"
import { outcome } from "./outcomes.js";
import {theGencode, gameDifficulty} from "./values.js"
import {activateClickSound, pauseAudio, resumeAudio, theAudioState} from "../settings/audio.js"
import { sendSelection , sendSelectedSuspect} from "./selector.js";
export {theXCode} 

// LET (theSCode) HOLD THE SECRET COMBINATION CODE.
let theSCode;
setTimeout(() => {
        setInterval(() => {
                theSCode = theGencode();
        }, 1000);
}, 2000);

// GET THE difficulty VARIABLES 
// STORE THE VALUE IN (diff).
let diff;
setInterval(() => {diff = gameDifficulty();}, 1000);

// GET THE MAINGAME DIV=====================//
const mainGameDiv = document.querySelector('.mainGame');

// GET GAME ALERT DIV
let gameAlert = document.querySelector(".mainGame .gameAlert");

// PERFORM ACTIONS WHEN AN AGENT IS CLICKED(AMONGST THE 10 DIFERENT OPTIONS).
// GET THE BUTTONS(AGENTS)
const agentsButton = document.querySelectorAll('.agents .numbtn');

// GET THE ELEMENTS FOR THE CURRENT PREDICTIONS
const currentSelectionContainer  = document.querySelector('.currentPrediction');
const suspectedAgentsDisplay = document.querySelector('.currentPrediction .codeout');

// GET THE ELEMENTS FOR THE ACTIVE PREDICTIONS
const suspectedAgentsContainer = document.querySelector('.activePrediction .codeout');

// GET THE ELEMENTS FOR THE ALL YOUR PREDICTIONS
const allYourSelectionsMainContainer  = document.querySelector('.yourPrediction');
const allYourSelectionsContainer  = document.querySelector('.yourPrediction ol');

// GET THE ELEMENTS FOR THE OPPONENTS PREDICTIONS
const allOpponentSelectionsMainContainer = document.querySelector('.opponetsPrediction');
const allOpponentSelectionsContainer = document.querySelector('.opponetsPrediction ol');

// LET (suspectCell) BE AN ARRAY THE ELEMENTS IN (suspectedAgentsContainer)
let suspectCell = suspectedAgentsContainer.children;

// (selection) WITH BE AN ARRAY OF ALL 
// MOST RECENTLY SELECTED ELEMENT(AGENTS) 
// IN (suspectedAgentsContainer)

let selection = [];
let selectedSuspect;
setInterval(() => {
        selection  = sendSelection();
        selectedSuspect  = sendSelectedSuspect();
}, 1000);


// RESULT ASSETS CREATION START=========================//
// GET THE ELEMENTS FOR THE CURRENT PREDICTION RESULT DIV
let result = document.querySelector(".currentPrediction .result");

//(statusText) WILL REPRESENT EACH TEXT IN (statusTexts)
let statusText;
let statusTexts = ["D", "I", "A"];
// let statusTexts = ["Dead", "Injured", "Alive"];

//(statusEmoji) WILL REPRESENT EACH TEXT IN (statusEmojis)
let statusEmoji;
let statusEmojis = ["&#128128;", "&#129301;", "&#128519;"];

//(statusClass) WILL REPRESENT the CLASS EACH (selection) STATUS
let statusClass = ["dead", "injured", "alive"];

// THE NEXT THREE ARRAY WILL GROUP
// EACH (selection) TO THEIR RESPECTIVE STATUS.
let deadArray = [];
let injuredArray = [];
let aliveArray = [];

// (statusBinder) WILL BIND ALL THE STATUS AS AN ARRAY.
let statusBinder = [];
// RESULT ASSETS CREATION END=========================//


// SEND BUTTON FUNCTIONALITY START====================//
// (sInc) WILL INCREMENT SO WE CAN
// CYCLE THROUGH THE THE MAIN CODE.
let sInc = 0;
// GET THE SEND BUTTON
const numbtnSend = document.querySelector(".numbtnSend");

// BEGIN ACTIONS IF SEND BUTTON IS CLICKED
numbtnSend.addEventListener('click', () => {
// IF SELECTION IS EQUAL TO THE 
// REQUIRED MAXIMUM SELECTION FOR THE 
// CURRENT DIFFICULTY
        if(selection.length == diff){
// HIDE ALERT
                gameAlert.style.opacity = "0";

                suspectedAgentsDisplay.innerHTML = suspectedAgentsContainer.innerHTML;
        
// FOR EACH SELECTION ELEMENT AS SELECTED
                selection.forEach(selected => {
// IF SELECTED MEETS A CONDITION ADD THE A STATUS ARRAY
                        if (theSCode.includes(selected) && selected === theSCode[sInc]) {
                                deadArray.push("dead");}
                        if (theSCode.includes(selected) && selected !== theSCode[sInc]) {
                                injuredArray.push("injured");}
                        if (theSCode.includes(selected) == false) {
                                aliveArray.push("alive");
                        }
 
// PERFOM ACTION IF (sInc) IS GREATER THAN
// (selection) LENGTH
                        sInc = sInc + 1;
                        if (sInc == selection.length) {sInc = 0};
                });
                       
// SELECTION FOREACH LOOP END.

// BIND ALL THE STATUS ARRAY TOGETHER
                statusBinder = deadArray.concat(injuredArray).concat(aliveArray);

//CYCLE THROUGH THE STATUS (statusBinder) TO GET STATUS
                        for (let i = 0; i < statusBinder.length; i++) {
// CREATE THE DIV (statusHolder) THAT HOLDS EACH RESPECTIVE STATUS
                                const statusHolder = document.createElement("div");
// GIVE (statusHolder) IT CLASS,
// LET (statusBinder[i]) DEFINE THE STATUS,
// WHERE i REPRESENT EACH ELEMENT IN (statusBinder).
                                statusHolder.setAttribute("class", "status " + statusBinder[i]);

// GIVE EACH (statusHolder) A (statusText) AND A (statusEmoji)
// DEPENDING ON THE CLASS IT HAS.
                                if (statusHolder.classList.contains(statusClass[0])) {
                                        statusText = statusTexts[0];
                                        statusEmoji = statusEmojis[0];
                                }
                                else if (statusHolder.classList.contains(statusClass[1])){
                                        statusText = statusTexts[1];
                                        statusEmoji = statusEmojis[1];
                                }
                                else{
                                        statusText = statusTexts[2];
                                        statusEmoji = statusEmojis[2];
                                }
                                statusHolder.innerHTML = "<p class='statusText'>" + statusText + "</p><span class='statusEmoji'>" + statusEmoji + "</span>";           
// FOR EACH (statusHolder) CREATED ADD TO CURRENT (result)
// CLEAR THE RESULT DIV FIRST AFTER 0.1 SECONDS
// SO IT CAN BE ADDED QUICKLY TO THE PREDICTIONS LIST.
                                setTimeout(() => {
                                        result.innerHTML = "";
                                }, 100);
// ALSO WAIT FOR 2 SECONDS WHILE THE RESULT DIV IS BEING CLEARED
// THEN ADD TO CURRENT (result)
                                setTimeout(() => {
                                        result.appendChild(statusHolder);

// IF ALL AGENTS ARE DEAD AND MEETS NECCESARY CONTIONS
// SEND THE CONGRATULATIONS MESSAGE. 
                                        if (deadArray.length == diff) {
                                                outcome("terminated");
                                        }
                                }, 200);
// HIDE THE SEND BUTTON                
                                numbtnSend.style.opacity = "0.1";
                                numbtnSend.style.zIndex = "-100";
                        }
//CYCLE THROUGH THE STATUS (statusBinder) END
        }
// (numbtnSend) MAX IF CHECKER END.

// ELSE IF SELECTION IS LESS THAN THE 
// REQUIRED MAXIMUM SELECTION FOR THE 
// CURRENT DIFFICULTY
        else{
// DISPLAY ALERT
                gameAlert.style.opacity = "1";
                gameAlert.innerHTML = "add more selection";
        }
// (numbtnSend) MAX ELSE IF CHECKER END.

// CREATE A NEW li AND LET IT HOLD THE 
// CURRENT PREDICTION CONTENT
setTimeout(() => {
        let newSelections = document.createElement("li");
        newSelections.innerHTML = currentSelectionContainer.innerHTML;
// ADD THE CURRENT CONTENT TO ALL YOUR PREDICTION UL 
// AFTER 0.2S SECONDS, SAME TIME AS WHEN THE RESULTS WHERE CREATED.
        allYourSelectionsContainer.appendChild(newSelections);
        allYourSelectionsMainContainer.scrollTop = allYourSelectionsMainContainer.scrollHeight;
}, 200);

// CHECK IF USER DID NOT SELECT ENDLESS
if (!mainGameDiv.classList.contains("ENDLESS") && selection.length == diff) {
// MOVES COUNTDOWN i.e SUBSTARCT FROM THE MOVES BY 1
        moveEffect('reduce');
}  
// RESET ALL THE BUTTONS AND ACTIVE PREDICTION TO DEFAULT
        resetButtons();  
});
// SEND BUTTON ONCLICK ACTION END.
// SEND BUTTON FUNCTIONALITY END==========================//


// SELECTION DECTION START================================//
// DETECT AND UPDATE THE CURRENT SELECTIONS EVERY ONE SECOND
// setInterval(() => {
agentsButton.forEach(agb => {
        agb.addEventListener('click', () => {
// IF A BUTTON(Agent) IS CLICKED PERFOM THE FOLLLOWING ACTION
        if (selection.length > 0) {
// IF THE SELECTED BUTTONS(Agents) LESS THAN
// THE REQUIED MAX SELECTION 
                if (selection.length < diff) {
                        numbtnSend.style.opacity = "0.1";
                        numbtnSend.style.zIndex = "-100";
// CLEAR THE STATUS ARRAYS AND THE STATUS BINDER
                        deadArray = [];injuredArray = [];aliveArray = [];
                        statusBinder = [];
// CLEAR THE RESULT DIV
                        // result.innerHTML = "";
                }
// MAX SELECTION DETECTION END.     
        }
// A BUTTON(Agent) IS CLICKED DETECTION END.

// DETECT IF SELECTION MEETS DIFFICULTY CONDITION
// AND THE RESULT DIV IS EMPTY.
        if (suspectCell.length == 0) {
                numbtnSend.style.opacity = "1";
                numbtnSend.style.zIndex = "1";
// CLEAR THE STATUS ARRAYS AND THE STATUS BINDER
                deadArray = [];injuredArray = [];aliveArray = [];
                statusBinder = [];
                // result.innerHTML = "";
        }
        if (suspectCell.length == diff) {
                numbtnSend.style.opacity = "1";
                numbtnSend.style.zIndex = "1";
        }
// DETECT IF SELECTION MEETS DIFFICULTY CONDITION END
        });
});
// }, 1000);
// SELECTION DECTION END=================================//



//RESET GAME ELEMENTS START==============================//
//RESET BUTTON FUNCTIONS
function resetButtons() {
        // idIncrement = 0;
        selection = [];selectedSuspect = "";
        suspectedAgentsContainer.innerHTML = "";
        agentsButton.forEach(abtn => {
                abtn.style.setProperty("opacity", "0.6");
                abtn.style.boxShadow = "0 0 0.5em #000a inset";    
        });
}
// RESET ONLY THE RESULT STATUS FUNCTION
function resetStatus() {
        deadArray = [];injuredArray = [];aliveArray = [];
        statusBinder = [];result.innerHTML = "";           
}
// RESET ALL FUNCTION
function resetAll() {resetButtons();resetStatus();}
let next = document.querySelector('.next');
next.addEventListener('click', () => {
        suspectedAgentsDisplay.innerHTML = "";
        deadArray = [];injuredArray = [];aliveArray = [];
        statusBinder = [];result.innerHTML = "";         
});

// IF THE TRY AGAIN BUTTON IS CLICKED(RESET ALL)
let tryAgain = document.querySelector('.tryAgain');
tryAgain.addEventListener('click', () => {
        selection = [];selectedSuspect = "";
        suspectedAgentsContainer.innerHTML = "";
        agentsButton.forEach(abtn => {
                abtn.style.setProperty("opacity", "0.6");
                abtn.style.boxShadow = "0 0 0.5em #000a inset";    
        });
        suspectedAgentsDisplay.innerHTML = "";
        deadArray = [];injuredArray = [];aliveArray = [];
        statusBinder = [];result.innerHTML = "";  
        allYourSelectionsContainer.innerHTML = "";       
});
// RESET IF (numbtnReset) IS CLICKED
let numbtnReset = document.querySelector(".numbtnReset");
numbtnReset.addEventListener('click', () => {
        suspectedAgentsDisplay.innerHTML = "";
        resetAll();
});
//RESET GAME ELEMENTS END==============================//

// GAME SOUNDS
let gameButtons = document.querySelectorAll('.numbtn');
gameButtons.forEach(gameButton => {
        gameButton.addEventListener('click', () => {
// ADD THE CLEAR SOUND
                activateClickSound();
        });
});

// MUTE AND UNMUTE AUDIO BUTTON START=============================//
let mainnGameAudio = document.querySelector('.mainGame .mainnGameAudio');
mainnGameAudio.addEventListener('click', () => {
        activateClickSound();
        let gameAudioState = theAudioState();
        if (gameAudioState === "play") {mainnGameAudio.innerHTML = "&#128264;";pauseAudio();}
        else if (gameAudioState === "pause") {mainnGameAudio.innerHTML = "&#128266;";resumeAudio();}
});
// MUTE AND UNMUTE AUDIO BUTTON END=================================//

// RESTART THE GAME START IF EXIT BUTTON IS CLICKED=============================//
let exitButton = document.querySelector('.mainGame .exit');
exitButton.addEventListener('click', () => {
        activateClickSound();
        outcome("exit");
});
// RESTART THE GAME END=================================//
// CREATE THE GAME LOGIC END===================================//

// SEND THE SECRET CODE SO OTHER FILES USE IT.
function theXCode() {
        return theSCode;
}


