export {powerUps}
// IMPORT FUNCTIONS FROM functions.js
import {toggleStyle, addMoves, pauseMoves, pauseTime,
        resumeTime, addTime} from "../functions.js";
import {theXCode} from "./results.js";
     
function powerUps(theGameDiff) {
// GAME POWERUPS START==================================//
let powerUpLoader = document.querySelector('.mainGame .powerUpsLoader');
let powerUpContainer = document.querySelector('.mainGame .powerUps');
// ALL THE POWERUPS AS A FOREACH ARRAY
let powerUps = document.querySelectorAll('.mainGame .powerUp');

// POWER UPS DIVS======================================//
let timeFreezer = document.querySelector('.mainGame .timeFreezer'); 
let timeBooster = document.querySelector('.mainGame .timeBooster');
let moveBooster = document.querySelector('.mainGame .moveBooster');
let dectectiveMode = document.querySelector('.mainGame .dectectiveMode');                                 
let wizardMode = document.querySelector('.mainGame .wizardMode'); 

// ANIMATE LAYERS
let powerLayerTime = document.querySelector('.powerLayerTime');
let powerLayerMoves = document.querySelector('.powerLayerMoves');

// USE (powerUpDelay) TO DELAY THE POWER UPS WHEN DISPLAYING
let powerUpDelay = 0.2;
// IF THE POWERUP LOADER IS CLICKED START=================// 
        powerUpLoader.addEventListener('click', () => {
    // GET EACH POW
            powerUps.forEach(power => {
                    toggleStyle(power,'transition','0.2s','0.2s');
                    toggleStyle(power,'transitionDelay',
                            powerUpDelay + 's', powerUpDelay + 's');
                    toggleStyle(power, 'opacity', '1', '0');
                    powerUpDelay = powerUpDelay + 0.2;
                    if (powerUpDelay > 1) {
                            powerUpDelay = 0.2;
                    }
            });
    });
// IF THE POWERUP LOADER IS CLICKED END=================// 

// ALL POWER UP CLICK FUNCTIONALITY START================// 
function powerUpTimer(el, fillerTime ) {
// GET THE POWER TIME DIV(PTD).
        let powerTime = el.querySelector('.powerTime');
// ANMIME THE (PTD) DOWN, DRAIN IT.
        powerTime.style.animation = "powerDrainer " + fillerTime + "s linear 1 forwards";
// CHANGE THE Z-INDEX SO ITS NOT CLICKABLE.
        el.style.zIndex = "-1";
        el.style.opacity = "0.5";

// THEN AFTER DRAINING FOR (fillerTime) SECONDS, ANIMATE THE (PTD) BACK UP, FILL IT.
        setTimeout(() => {
                powerTime.style.animation = "powerFiller " + fillerTime + "s linear 1 forwards";
        }, fillerTime*1000);

// AFTER 20 SECONDS, i.e after draining and filling the (PTD)
// CHANGE THE Z-INDEX OF THE POWERUP, SO IT BECOMES CLICKABLE
        setTimeout(() => {el.style.zIndex = "1";el.style.opacity = "1";}, fillerTime*1000*2);

}
// ALL POWER UP CLICK FUNCTIONALITY END================// 


// TIME FREEZER START==============================//
    timeFreezer.addEventListener('click', () => {
// PAUSE/FREEZE TIME
        pauseTime();
// SET THE FILL TIME AND MAKE IT CLICKABLE
        powerUpTimer(timeFreezer, 10);
// ANIMATE THE MOVE LAYER
        powerLayerTime.innerHTML= "Freeze";
        powerLayerTime.style.animation = "powerLayerAnimation 3s linear 1";

// RESUME THE TIME AFTER 20 SECONDS
        setTimeout(() => {
                resumeTime();
        }, 20000);
});
// TIME FREEZER END==============================//

// TIME BOOSTER START==============================//
// IF TIME BOOSTER IS CLICKED  
timeBooster.addEventListener('click', () => {
// PAUSE TIME TO GET THE CUURENT TIME
        pauseTime();
// USE addTime() TO ADD X AMOUNT TO THE TIME
        addTime(0.5);
// SET THE FILL TIME AND MAKE IT CLICKABLE
        powerUpTimer(timeBooster, 15);
// ANIMATE THE TIME LAYER
        powerLayerTime.innerHTML= "+30s";
        powerLayerTime.style.animation = "powerLayerAnimation 3s linear 1";
});
// TIME BOOSTER END==============================//

let movePowerTime = moveBooster.querySelector('.powerTime');
let sendBtn = document.querySelector('#btnx2');
let moveslide = 1;
// MOVE BOOSTER START==============================//
    moveBooster.addEventListener('click', () => {
// INCREASE THE CURRENT MOVES A CERTAIN AMOUNT
        addMoves(3);
// CHANGE THE Z-INDEX SO ITS NOT CLICKABLE.
        moveBooster.style.zIndex = "-1";
        moveBooster.style.opacity = "0.5";
// ANIMATE THE MOVE LAYER
        powerLayerMoves.innerHTML= "+3";
        powerLayerMoves.style.animation = "powerLayerAnimation 3s linear 1";
// THEN WHEN THE SEND BUTTON IS CLICKED
        sendBtn.addEventListener('click', () => {
// CHECK THE (moveslide) IS < 4 i.e 1, 2, 3
                if (moveslide < 4 ) {
// USE EACH (moveslide) VALUE TO INCREMENT 
// (movePowerTime) TOP PROPERTY
                        movePowerTime.style.top = moveslide*(100/3) + "%";
                }
// INCREMENT THE (moveslide) BY 1 EACH TIME
                moveslide++;
// CHECK IF THE MOVESLIDE IS EQUAL TO 4
// i.e the bonus moves are exhausted.
                if (moveslide == 4) {
// TOTALLY DRAIN (movePowerTime).
                        movePowerTime.style.top = "100%";
// THEN AFTER 2 SECONDS 
// ANIMATE (movePowerTime) UP, FILL IT BACK UP.
                        setTimeout(() => {
                                movePowerTime.style.top = "0%";                                
                        }, 2000);
// DE-ACTIVATE THE BONUS MOVE (movePowerTime) ANIMATION
                        moveslide = 5;
                }
// END IF.
        });
// END SEND BUTTON CLICK.
});
// MOVE BOOSTER END==============================//

// DETECTIVE MODE START==============================//
    dectectiveMode.addEventListener('click', () => {
        const hintContainer = document.querySelector('.hintPredicted');
        let hintCodeout = document.querySelector('.hintPredicted .codeout');
        let hintResult = document.querySelector('.hintPredicted .result');


        dectectiveMode.style.zIndex = '-1';
        dectectiveMode.style.opacity = '0.5';
        // USE generateRandomNumber() TO GET A RANDOM NUMBER
        function generateRandomNumber(min,max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // CALL AND STORE THE SECRET CODE GENERATED 
        // FROM THE gamelogic.js file SO WE WONT HAVE A NEW SECRET CODE
        let allHint = theXCode();
        // GET A RANDOM ELEMENT OF THE SECRET CODE
        let hintNumber = allHint[generateRandomNumber(0, allHint.length - 1)];
        // GET THE INDEX OF THAT RANDOM ELEMENT
        let hintNumberIndex = allHint.indexOf(hintNumber);

        // GET THE IMAGE OF THE BUTTON(AGENT) THAT HAS AN ID 
        // SIMILAR TO THE SECRET CODE ELEMENT,
        // i.e if secret code element is (_2) 
        // get image with id = _2_
        // THIS WILL GET THE ELEMENTS POSITION
        let deadAgent = document.querySelector('#' + hintNumber + '_');
        // GET THE IMAGE SOURCE
        let deadAgentImage = deadAgent.getAttribute('src');

        // GET THE GAME DIFFICULTY
        let theDiff = theGameDiff;

        // CREATE ELEMNETS SO WE CAN 
        // DISPLAY A DEAD AGENT FOR THE USER 
                for (let i = 0; i < theDiff; i++) {
        // CREATE ELEMENTS TO DISPLAY THE AGENTS IMAGE
        // AND DISPLAY IT.
                const hintDiv = document.createElement("div");
                hintDiv.setAttribute("class", "codediv");
                hintCodeout.appendChild(hintDiv);
        // CREATE ELEMENTS TO DISPLAY THE RESULTS
        // AND DISPLAY IT.                
                const hintStatus = document.createElement("div");
                hintStatus.setAttribute("class", "status dead");
                hintResult.appendChild(hintStatus);
        }


        let hintDiv = "<img src=" + deadAgentImage + " class='code'/>";     
        // GET THE ELEMENT WITH THE POSITION 
        // RELATING TO THE CHOSEN SECRET CODE
        let hintCodeDiv = hintCodeout.querySelectorAll('.codediv')[hintNumberIndex];
        // ADD AN THE AGENT'S IMAGE
        hintCodeDiv.innerHTML = hintDiv;

        // LET ONLY THE DEAD AGENT HAVE A RESULT
        // SO THAT ITS POSITION IS CLEAR
        let hintStatus = "<p class='statusText'>D</p><span class='statusEmoji'>&#128128;</span></div>";     
        // GET THE STATUS WITH THE POSITION 
        // RELATING TO THE CHOSEN SECRET CODE
        let hintDeadStatus = hintResult.querySelectorAll('.status')[hintNumberIndex];
        // ADD AN THE AGENT'S STATUS AND MAKE IT DEAD
        hintDeadStatus.innerHTML = hintStatus;

        setTimeout(() => {
                hintContainer.style.opacity = "0.1";
                hintContainer.style.zIndex = "-1";
        }, 5000);
    });
// DETECTIVE MODE END==============================//

// WIZARD MODE START==============================//
    wizardMode.addEventListener('click', () => {
// PAUSE/FREEZE TIME
        pauseTime();
        pauseMoves();
// SET THE FILL TIME AND MAKE IT CLICKABLE
        powerUpTimer(wizardMode, 30);
// ANIMATE THE MOVE LAYER
        powerLayerTime.innerHTML= "Freeze";
        powerLayerTime.style.animation = "powerLayerAnimation 3s linear 1";

// ANIMATE THE MOVE LAYER
        powerLayerMoves.innerHTML= "Freeze";
        powerLayerMoves.style.animation = "powerLayerAnimation 3s linear 1";

// RESUME THE TIME AFTER 60 SECONDS
        setTimeout(() => {
                resumeTime();
        }, 60000);
    });
//  WIZARD MODE END==============================//
}    
// GAME POWERUPS END==================================//