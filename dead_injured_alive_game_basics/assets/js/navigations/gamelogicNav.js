export {toGameNavigation, toGame}
import{scriptMaker, hide, unhide, toggleStyle} from "../functions.js"
import { predictionNav } from "./predictionNav.js";
import {activateClickSound} from "../settings/audio.js" 

// GET THE HTML BODY TAG
const mainBody = document.querySelector('body');
//GET TOP DIV
const topContainer = document.querySelector('.top');
//GET ALL MODULES DIV
const modulesContainer = document.querySelector('.bottom');
//GET THE BACK BUTTON
const backButton = document.querySelector('.backButton');
//GET THE HOME BUTTON
const homeButton = document.querySelector('.homeButton');

// LET (difficultyHeader) HOLD THE DIFFICULTY TYPE
let difficultyTime;
let difficultyMoves;
let difficultyHeader = "EASY";
let difficultyAgents = 2;
let gameMode;

// PLAYER NAVIGATION TO GAME START============//
// STORE ALL THE DIFFICULTY TYPES AS AN ARRAY
let diffArray = ["EASY", "MEDIUM", "HARD",
        "DETECTIVE", "WIZARD"]; 
let diffColors = ["green", "yellow", "red", "purple", "white"]; 

function toGameNavigation() {
// 1-FIND AGENTS AND ONLINE MULTIPLAYER TO GAME START====================================//

let findAgentLink = document.querySelector('.modules .bottom #findAgents');
findAgentLink.addEventListener('click', () => {
        gameMode = "singlePlayer_findAgents";
});

let findAgentDiff = document.querySelectorAll('.modules .bottom .difficultyTable .difficulty');

// IF ANY OF THE AVAILABLE DIFFUCULTY IS CLICKED
        findAgentDiff.forEach(fad => {
                let difficultyHeaderDisplay = fad.querySelector('.difficultyHeader');
                let agentsAvailableDisplay = fad.querySelector('.agentsAvailable');
                let timeAvailableDisplay = fad.querySelector('.timeAvailable');
                let movesAvailableDisplay = fad.querySelector('.movesAvailable');
                let selectAgent = document.querySelectorAll('.selectAgent');
                let selectAgentUl = document.querySelectorAll('.selectAgentUl');
                let agentsForEndless = document.querySelectorAll('.selectAgentUl li');

                if (difficultyHeaderDisplay.innerHTML == "ENDLESS") {
                        agentsAvailableDisplay.innerHTML = 2;
                        timeAvailableDisplay.innerHTML  = "...";
                        movesAvailableDisplay.innerHTML  = "...";
                        difficultyTime = "0:00";difficultyMoves = "..."
                        // console.log(agentsAvailableDisplay.parentElement.parentElement.parentElement);  
// IF THE SINGLE PLAYER ENDLESS IS CLICKED
// UNHIDE/HIDE SELECT BUTTON                         
                        fad.addEventListener('click', () => {
                                difficultyHeader = "ENDLESS";
                                selectAgent.forEach(sat => {sat.style.opacity = "1";sat.style.zIndex = "1";});
                        });
                        
// IF THE SELECT BUTTTON IS CLICKED
// UNHIDE/HIDE UL DIV 
                        selectAgent.forEach(sat => {
                                sat.addEventListener('click', () => {
                                        selectAgentUl.forEach(satUl => {satUl.style.opacity = "1";satUl.style.zIndex = "1";});
                                });
                        });
// IF ANY OF THE UL LI IS CLICKED STORE THE VALUES
                        agentsForEndless.forEach(agent => {
                                agent.addEventListener('click', () => {
                                        agentsAvailableDisplay.innerHTML = agent.innerHTML;
                                        difficultyAgents = agent.innerHTML;
                                        difficultyHeader = "ENDLESS"
                                        selectAgentUl.forEach(satUl => {hide(satUl);});
                                });
                        });
                }else{

// CYCLE THROUGH THE (diffArray)
                for (let i = 0; i < diffArray.length; i++) {
// CHECK FOR THE DIFFICULTY SET IN THE SPECIFIC GAME
                        if (difficultyHeaderDisplay.innerHTML == diffArray[i]) {
// SET THE COLOR 
                                fad.style.background = diffColors[i];
// GET THE INDEX OF EACH DIFFICULTY TYPE IN THE (diffCheckArray).
                                let diffIndexFA = diffArray.indexOf(diffArray[i]);             
// SET THE DIFFICULTY(i.e numbers of spies to find)
                                        agentsAvailableDisplay.innerHTML = i + 2;
// SET THE DIFFICULTY TIME
// MAKE TIME WHOLE NUMBER IF DIFFICULTY IS (0, 2, 4) 
                                        if (diffIndexFA % 2 == 0) {timeAvailableDisplay.innerHTML  = (i + 1) * 60 + "s";}
// ELSE ADD 0.5 IF DIFFICULTY IS (1, 5) 
                                        else {timeAvailableDisplay.innerHTML  = (i + 0.5) * 60 + "s";}
                                        
// SET THE DIFFICULTY MOVES             
                                        movesAvailableDisplay.innerHTML  = i + 8;       
                                }
// DIFFICULTY ARRAY IF CHECK END
                }
// CYCLE THROUGH THE (diffArray) END.

// IF ENDLESS IS NOT CLICK START
// HIDE THE ENDLESS OPTIONS
                fad.addEventListener('click', () => {
                        selectAgent.forEach( sat => {sat.style.opacity = "0";sat.style.zIndex = "-1";});
                        selectAgentUl.forEach( satUl => {satUl.style.opacity = "0";satUl.style.zIndex = "-1";});
// SET A DEFAULT DISPLAY DIFFICULTY TIME
// IN minute:seconds FORMAT.
                        let minutesDisplay = Math.floor(parseInt(timeAvailableDisplay.innerHTML) / 60); 
                        let secondsDisplay = Math.floor(parseInt(timeAvailableDisplay.innerHTML) % 60);
                        if(secondsDisplay < 10){secondsDisplay = "0" + secondsDisplay;}
                        difficultyTime = minutesDisplay + ":" + secondsDisplay;
                });
// IF ENDLESS IS NOT CLICK END.
        }
// END ELSE FOR MODE CHECK

// IF ANY OF THE DIFFICULTY TYPE IS CLICKED START
                fad.addEventListener('click', () => {
// CHECK IF THE DIFFICULTY IS ONE OF THE APPROVED DIFFICULTY TYPE
                        if (diffArray.includes(difficultyHeaderDisplay.innerHTML) || difficultyHeaderDisplay.innerHTML == "ENDLESS") {
                                difficultyHeader = difficultyHeaderDisplay.innerHTML;
                                difficultyAgents = agentsAvailableDisplay.innerHTML; 
                                difficultyMoves = movesAvailableDisplay.innerHTML;
// ADD THE CLICK SOUND
                                activateClickSound(); 
// TOGGLE THE SCALE TO SIGNIFY SELECTION
                                toggleStyle(fad,"transform", "scale(1.1)", "scale(1)");  
// SCALE DOWN THE UNSELECTED DIFFICULTY TYPE BACK TO 1
                                findAgentDiff.forEach(fadscaledown => {
                                        let otherDifficultyHeader = fadscaledown.querySelector('.difficultyHeader').innerHTML;
                                        if ( otherDifficultyHeader != difficultyHeaderDisplay.innerHTML) {
                                                fadscaledown.style.transform = "scale(1)";
                                        }
                                });   
// SCALE DOWN THE UNSELECTED DIFFICULTY TYPE BACK TO 1 END                                
                        }
// CHECK IF THE DIFFICULTY IS ONE OF THE APPROVED DIFFICULTY TYPE END                      
                });
// IF ANY OF THE DIFFICULTY TYPE IS CLICKED START
        });
// 1-FIND AGENTS AND ONLINE MULTIPLAYER TO GAME END==========================================//

// STORY MODE FUNCTIONALITY START======================//
let storyMode = document.querySelector('#storyMode');
let storyModeLevels = document.querySelectorAll('.storyMode .level');
storyMode.addEventListener('click', () => { 
        gameMode = "singlePlayer_story"; 
});
let lvlsArray = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16],[17,18,19,20]];
storyModeLevels.forEach(lvl => {
        let lvlCode = parseInt(lvl.getAttribute('lvlCode'));
        for (let i = 0; i < lvlsArray.length; i++) {
                if (lvlsArray[i].includes(lvlCode)) {
                        lvl.style.background = diffColors[i];
                } 
        }
        lvl.addEventListener('click', () => { 
                lvlCode = parseInt(lvl.getAttribute('lvlCode'));
                for (let i = 0; i < lvlsArray.length; i++) {
                        if (lvlsArray[i].includes(lvlCode)) {
                                difficultyHeader = diffArray[i];
                        } 
                }
        });
});
// STORY MODE FUNCTIONALITY END======================//

// SURVIVAL MODE FUNCTIONALITY START======================//
let survivalMode = document.querySelector('#survivalMode');
survivalMode.addEventListener('click', () => { 
        difficultyHeader = 'SURVIVAL';
        gameMode = "singlePlayer_survival"; 
});
// SURVIVAL MODE FUNCTIONALITY END======================//

// LOCAL MULTIPLAYER TO GAME START====================================//
let multiPlayerLocal = document.querySelector('.modules .bottom .local');
multiPlayerLocal.addEventListener('click', () => { 
        gameMode = "multiPlayer_local"; 
});
// LOCAL MULTIPLAYER TO GAME END====================================================//

// ONLINE MULTIPLAYER TO GAME START=================================================//
let  multiPlayerOnline = document.querySelector('.modules .bottom .online');
multiPlayerOnline.addEventListener('click', () => {
        gameMode = "multiPlayer_online";
});
// ONLINE MULTIPLAYER TO GAME END=====================================================//


// 3-LOCAL MULTIPLAYER JOIN TO GAME START====================================================//
let selectHost = document.querySelector('.modules .bottom .setHost .selectHost');
let selectedHostValue = document.querySelector('.modules .bottom .setHost .selectedHostValue');

let nextToHost = document.querySelector('.modules .bottom .setHost .nextToHost');

// IF ANY OF CUSTOM SEETINGS IS CLICKED
selectHost.addEventListener('click', () => {
// ADD THE CLICK SOUND
        activateClickSound(); 
        let hostList = selectHost.querySelector('ul');
        let hostListItems = selectHost.querySelectorAll('ul li');
// TOGGLE THE DISPLAY FOR ITS CONTENT
        toggleStyle(hostList, "opacity", "1", "0");
        toggleStyle(hostList, "zIndex", "1", "-1");

        // FOR EACH VALUE SELECTED 
        hostListItems.forEach(hli => {
                hli.addEventListener('click', () => {
// STORE THE VALUE IN THE (localHostSeletedValue)
                        selectedHostValue.innerHTML = hli.innerHTML;
                });
        });
});
// 3-LOCAL MULTIPLAYER JOIN TO GAME END====================================================//

// MULTIPLAYER TO SELECTION START
// GET AND HIDE THE SECRET CODE SELECTIN DIV
let playerCodeSelection = document.querySelector('.modules .bottom .playerCodeSelection');
let selectionToGame = playerCodeSelection.querySelector('.playGame');
selectionToGame.addEventListener('click', () => {
        playerCodeSelection.style.display = "none";
        topContainer.style.display = "none";
        modulesContainer.style.height = "100%";
// ADD THE CLICK SOUND
        activateClickSound(); 
});

// IF THE PLAY BUTTON FOR LOCAL MULTIPLAYER IS CLICKED
// EVEN WITHOUT CUSTOM SETTINGS
// SET THE DIFFICULTY TO ENDLESS(difficulty = 2).
// i.e SET A DEFAULT VALUE.
let selectYourCode = document.querySelector('.selectYourCode');
selectYourCode.addEventListener('click', () => { 
// SET THE NUMBER OF AGENT THAT CAN BE SELECTED
// TO BUILD A SECRET COMBINATION 
        playerCodeSelection.setAttribute("select", difficultyAgents);
        let agentsToSelect = playerCodeSelection.querySelector(".agentAmount");
        agentsToSelect.innerHTML = difficultyAgents;
// ADD THE SCRIPT TO ENABLE SELECTION FUNCTIONALITY
        mainBody.appendChild(scriptMaker("assets/js/logic/selection.js"));
        backButton.style.display = "none";
// ADD THE CLICK SOUND
        activateClickSound(); 
});
// MULTIPLAYER TO SELECTION END.
}


// IF A TO GAME BUTTON IS CLICKED START=====================================================// 
function toGame(game) {
// GET THE TIME AND MOVES FUNCTIONS VALUES
        let topStatsMoves = topContainer.querySelector('.movesFrame');
        let topStatsTime = topContainer.querySelector('.timeFrame');

// GET THE TWO GAME TYPES
        const multiPlayerMainGame = document.querySelector('.multiPlayerMainGame');
        const singlePlayerMainGame = document.querySelector('.singlePlayerMainGame');

// GET ALL THE (toGame) BUTTONS        
        let  continueToGame = document.querySelectorAll('.modules .bottom .toGame');
        continueToGame.forEach(cTogame => {
                cTogame.addEventListener('click', () => {
                        if (cTogame.getAttribute("id") == "multiPlayerMainGame") {
// HIDE THE TOP DIV AND DISPLAY THE MULPTIPLAYER DIV
                                topContainer.style.display = "none";
                                modulesContainer.style.height = "100%";
                                multiPlayerMainGame.style.display = "block";
// GET THE MULTIPLAYER TIME AND MOVES FRAME
                                let playerMoves =  multiPlayerMainGame.querySelector('.yourStats .playerMoves');
                                let playerTime =  multiPlayerMainGame.querySelector('.yourStats .playerTime'); 
// SET THE MOVES AND CLEAR THE TOP DIV TIME AND MOVE HOLDER
// SO THERE EXIST ONLY ONE TIME AND MOVE HOLDER,
// ALSO USE (difficultyTime & difficultyMoves) TO SET 
// A START VALUE FOR THE TIME AND MOVES RESPECTIVELY.
                                playerTime.innerHTML = topStatsTime.innerHTML;
                                topStatsTime.innerHTML = "";
                                
                                playerMoves.innerHTML = topStatsMoves.innerHTML;
                                topStatsMoves.innerHTML = "";
                                let playerMovesAmount =  multiPlayerMainGame.querySelector('.yourStats .playerMoves .yourMoves');
                                playerMovesAmount.innerHTML =  difficultyMoves;
                                    
// GET AND DISPLAY THE MAINGAME DIV.
                                let multiPlayerGameScene =  multiPlayerMainGame.querySelector('.gameScene'); 
                                multiPlayerGameScene.innerHTML = game;
                        }else if (cTogame.getAttribute("id") == "singlePlayerMainGame") {
// GET AND DISPLAY THE MAINGAME DIV.
                                singlePlayerMainGame.style.display = "block";
                                singlePlayerMainGame.innerHTML = game;
                                const mainGameBtnLeft = document.querySelector('.btnLeft');
                                mainGameBtnLeft.style.display = "none";
                        }
                        const mainGame = document.querySelector('.mainGame');
// ADD A CLASS CORRESPONDING TO THE DIFFICULTY.
                        mainGame.classList.add(difficultyHeader);
// ADD A CLASS TO SIGNIFY THE AMOUNT OF AGENTS CHOSEN
// FOR ENDLESS RUN.
                        mainGame.setAttribute("agents", difficultyAgents);
                        mainGame.setAttribute("mode", gameMode);
                        console.log(mainGame);
                        
                        mainBody.appendChild(scriptMaker("assets/js/logic/selector.js"));
                        mainBody.appendChild(scriptMaker("assets/js/logic/results.js"));
                       
// =====LOAD PREDICTION NAVIGATIONS
                        predictionNav();
// ADD THE CLICK SOUND  
                        activateClickSound(); 
                }); 
        });
}
// IF A TO GAME BUTTON IS CLICKED END======================//


// PLAYER NAVIGATION TO GAME END============//
