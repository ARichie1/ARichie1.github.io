import {activateClearSound} from "../settings/audio.js"
import {gameDifficulty} from "./values.js"
export {sendSelection, sendSelectedSuspect} 

// GET THE THEME CUSTOMIZATION VARIABLES.
let btnHighlight = "var(--themeColor)";

// GET THE difficulty VARIABLES 
// STORE THE VALUE IN (diff).
let diff;
setInterval(() => {diff = gameDifficulty();}, 1000);

// GET GAME ALERT DIV
let gameAlert = document.querySelector(".mainGame .gameAlert");

// PERFORM ACTIONS WHEN AN AGENT IS CLICKED(AMONGST THE 10 DIFERENT OPTIONS).
// GET THE BUTTONS(AGENTS)
const agentsButton = document.querySelectorAll('.agents .numbtn');

// USE (idIncrement) TO INCREMENT SO AS TO MATCH
// EACH RESPECTIVE BUTTON.
let idIncrement = 0;

// GET THE ELEMENTS FOR THE ACTIVE PREDICTIONS
const suspectedAgentsContainer = document.querySelector('.activePrediction .codeout');

// LET (suspectCell) BE AN ARRAY THE ELEMENTS IN (suspectedAgentsContainer)
let suspectCell = suspectedAgentsContainer.children;

// (selection) WITH BE AN ARRAY OF ALL 
// MOST RECENTLY SELECTED ELEMENT(AGENTS) 
// IN (suspectedAgentsContainer)
let selection = [];

// (selectedSuspect) WIll HOLD THE EACH ELEMENT CLICKED
// THAT IS AMONGST THE 
// MOST RECENTLY SELECTED ELEMENT(AGENTS)  
let selectedSuspect;

// THE AGENT SELECTIONS FUNCTIONALLITY START===============//
// selectSuspects() WILL HOLD 
// THE FUNCTIONALLITY OF THE AGENT SELECTIONS
// function selectSuspects() {
    agentsButton.forEach(abtn => {
// (abtn) REPRESENTS EACH BUTTON(AGENT)
// (agentId) WILL BE THE CORRESPONDING VALUES 
// EACH BUTTON HOLDS
        let agentId;
        abtn.setAttribute("value", idIncrement);
        agentId = abtn.getAttribute("value");
        let clickDisplay = abtn.querySelector(".clickNumber");
//ADD 1 TO (idIncrement) AND RESTART WHEN IT GETS TO 9
        if (idIncrement == 9) {idIncrement = -1}
        idIncrement++;

//GIVE ALL BUTTONS(AGENTS) A DEFAULT OPACITY
        abtn.style.opacity = "0.6";
//BEGIN THE CLICK EVENT
        abtn.addEventListener('click', (e) => {
//GET EACH BUTTON IMAGE AND ATTRIBUTES
            let agentPics = abtn.querySelector("img");
            agentPics.setAttribute("value", agentId);
            let agentPicsValue = agentPics.getAttribute("value");
            let agentPicSource = agentPics.getAttribute("src");

// THEN GET A DIV THAT HOLDS EACH SELECTION
// GIVE IT AN IMAGE AND ATTRIBUTES
            const newSuspect = document.createElement("div");
            newSuspect.setAttribute("class", "codediv");
            newSuspect.setAttribute("id", "_" + agentPicsValue);
            newSuspect.innerHTML = "<img src=" + agentPicSource + " value=" + agentPicsValue + " class='code'/>";
// LET IT ALSO BE THE ONLY ELEMENT WITH AN ID
            let newSuspectId = newSuspect.getAttribute("id");
// FOR EACH (newSuspect) CREATED(SELECTED) ADD TO (selection)
// IF THE SUSPECT DOES NOT EXIST BEFORE
// AND OTHER CONDITIONS ARE MEETS.
        if (selection.includes(newSuspectId) == false && suspectCell.length < diff && abtn.style.opacity == "0.6") {
            selection.push(newSuspectId);
        }        
// IF THE ELEMENTS IN (suspectedAgentsContainer) ARE
// GREATER THAN THE MAX SELECTION FOR THE CHOOSEN DIFFICULTY
// AND EACH BUTTON HAS AN OPACITY OF 0.6 
        if (suspectCell.length < diff && abtn.style.opacity == "0.6") {
// ADD EACH THAT MEETS THESE CONDITIONS TO (suspectedAgentsContainer)     
            suspectedAgentsContainer.appendChild(newSuspect);
            abtn.style.setProperty("opacity", "1");
            abtn.style.boxShadow = "0 0 0.8em " + btnHighlight +  " inset";
// HIDE ANY ALERT
            gameAlert.style.opacity = "0";      
        }
// END IF.

//ELSE
        else if (selection.includes("_" + agentId) == true && abtn.style.opacity == "1") {
//ELSE LET (selectedSuspect) HOLD EACH BUTTON CLICKED
// THAT IS AMONGST THE 
// MOST RECENTLY SELECTED ELEMENT(AGENTS)  
            selectedSuspect = suspectedAgentsContainer.querySelector('#_' + agentId);
                
//CHECK IF THE BUTTON EXIST IN (suspectedAgentsContainer) AND IS SELECTED.
                
// REVERSE THE BUTTON STYLES
            abtn.style.setProperty("opacity", "0.6");
            abtn.style.boxShadow = "0 0 0.5em #000a inset";
// REMOVE THE UNSELECTTED ELEMENT(AGENT) FROM (suspectedAgentsContainer).
            selectedSuspect.remove();
// LET (removedselectionIndex) HOLD 
// THE INDEX OF THE REMOVED ELEMENT(UNSELETED)
// IN THE (selection) array
                let removedselectionIndex = selection.indexOf('_' + agentId);
// REMOVE FROM AND UPDATE THE (selection) ARRAY
// IF A BUTTON IS UNSELECTED.
// i.e REMOVED THE BUTTONS VALUE FROM (selection).                
                selection.splice(removedselectionIndex, 1);

// ADD A CLEAR SOUND
                activateClearSound();
        }
// END ELSE IF
        });
// END THE BUTTON CLICK EVENT.
    });
// END FOREACH (BUTTON LOOP).
// }
// // END SELECTION FUNCTION.
// selectSuspects();


// GET THE SEND BUTTON
const numbtnSend = document.querySelector(".numbtnSend");


// SELECTION DECTION START================================//
// DETECT AND UPDATE THE CURRENT SELECTIONS EVERY ONE SECOND
agentsButton.forEach(agb => {
        agb.addEventListener('click', () => {
// IF A BUTTON(Agent) IS CLICKED PERFOM THE FOLLLOWING ACTION
        if (selection.length > 0) {
                console.log("selection = " + selection);
// IF THE SELECTED BUTTONS(Agents) LESS THAN
// THE REQUIED MAX SELECTION 
                if (selection.length < diff) {
                        numbtnSend.style.opacity = "0.1";
                        numbtnSend.style.zIndex = "-100";
                }
// MAX SELECTION DETECTION END.     
        }
// A BUTTON(Agent) IS CLICKED DETECTION END.

// DETECT IF SELECTION MEETS DIFFICULTY CONDITION
// AND THE RESULT DIV IS EMPTY.
        if (suspectCell.length == 0) {
                numbtnSend.style.opacity = "1";
                numbtnSend.style.zIndex = "1";
        }
        if (suspectCell.length == diff) {
                numbtnSend.style.opacity = "1";
                numbtnSend.style.zIndex = "1";
        }
// DETECT IF SELECTION MEETS DIFFICULTY CONDITION END
        });
});
// SELECTION DECTION END=================================//

// RESET THE BUTTONS IF SEND BUTTON IS CLICKED
numbtnSend.addEventListener('click', () => {
        idIncrement = 0;
        selection = [];
        selectedSuspect = "";
});

// RESET IF (numbtnReset) IS CLICKED
let numbtnReset = document.querySelector(".numbtnReset");
numbtnReset.addEventListener('click', () => {
        idIncrement = 0;
        selection = [];
        selectedSuspect = "";
// ADD THE CLEAR SOUND
        activateClearSound();
});
// IF THE NEXT BUTTON IS CLICKED
let next = document.querySelector('.next');
next.addEventListener('click', () => {
        idIncrement = 0;selection = [];
        selectedSuspect = "";
});
// IF THE TRY AGAIN BUTTON IS CLICKED(RESET ALL)
let tryAgain = document.querySelector('.tryAgain');
tryAgain.addEventListener('click', () => {
        idIncrement = 0;selection = [];
        selectedSuspect = "";        
});

// SEND THE SELECTION VARIABLES
function sendSelection() {return selection;}
function sendSelectedSuspect () {return selectedSuspect;}
// THE AGENT SELECTIONS FUNCTIONALLITY END=================//