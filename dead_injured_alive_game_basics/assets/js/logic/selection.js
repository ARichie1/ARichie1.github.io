// GET THE DOM ASSETS=====================//
const mainGameDiv = document.querySelector('.mainGame'); 
let playerCodeSelection = document.querySelector('.modules .bottom .playerCodeSelection');

// GET THE THEME CUSTOMIZATION VARIABLES.
let btnHighlight = "var(--themeColor)";

// GET THE GAME (difficulty) VARIABLES 
// STORE THEM IN THE FOLLOWING VARIABLES RESPECTIVELY.
let diff;

// GET GAME ALERT DIV
//let gameAlert = document.querySelector(".gameAlert");

// PERFORM ACTIONS WHEN AN AGENT IS CLICKED(AMONGST THE 10 DIFERENT OPTIONS).
// GET THE BUTTONS(AGENTS)
const agentsButton = document.querySelectorAll('.agents .listed');

// USE (idIncrement) TO INCREMENT SO AS TO MATCH
// EACH RESPECTIVE BUTTON.
let idIncrement = 0;

// GET THE ELEMENTS FOR THE PLAYER SELETION
const selectedAgentsContainer = document.querySelector('.playerCodeSelection .playerSelection .codeout');

// LET (selectionPack) BE AN ARRAY THE ELEMENTS IN (selectedAgentsContainer)
let selectionPack = selectedAgentsContainer.children;

// (selection) WITH BE AN ARRAY OF ALL 
// MOST RECENTLY SELECTED ELEMENT(AGENTS) 
// IN (selectedAgentsContainer)
let selection = [];

// (currentlySelected) WIll HOLD THE EACH ELEMENT CLICKED
// THAT IS AMONGST THE 
// MOST RECENTLY SELECTED ELEMENT(AGENTS)  
let currentlySelected;

// CHECK IF THE AGENTS AMOUNT HAS BEEN SET
if (playerCodeSelection.hasAttribute("select") == true) {
        diff = parseInt(playerCodeSelection.getAttribute("select"));
// THE AGENT SELECTIONS FUNCTIONALLITY START===============//
// selectSuspects() WILL HOLD 
// THE FUNCTIONALLITY OF THE AGENT SELECTIONS
function selectCode() {
    agentsButton.forEach(abtn => {
// (abtn) REPRESENTS EACH BUTTON(AGENT)
// (agentId) WILL BE THE CORRESPONDING VALUES 
// EACH BUTTON HOLDS
        let agentId;
        abtn.setAttribute("value", idIncrement);
        agentId = abtn.getAttribute("value");
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
            const newSelection = document.createElement("div");
            newSelection.setAttribute("class", "codediv selected");
            newSelection.setAttribute("value", "_" + agentPicsValue);
            newSelection.innerHTML = "<img src=" + agentPicSource + " value=" + agentPicsValue + " class='code'/>";
// LET IT ALSO BE THE ONLY ELEMENT WITH AN ID
            let newSelectionId = newSelection.getAttribute("value");
// FOR EACH (newSelection) CREATED(SELECTED) ADD TO (selection)
// IF THE SUSPECT DOES NOT EXIST BEFORE
// AND OTHER CONDITIONS ARE MEETS.
        if (selection.includes(newSelectionId) == false && selectionPack.length < diff && abtn.style.opacity == "0.6") {
            selection.push(newSelectionId);
        }   
        
// IF THE ELEMENTS IN (selectedAgentsContainer) ARE
// GREATER THAN THE MAX SELECTION FOR THE CHOOSEN DIFFICULTY
// AND EACH BUTTON HAS AN OPACITY OF 0.6 
        if (selectionPack.length < diff && abtn.style.opacity == "0.6") {
// ADD EACH THAT MEETS THESE CONDITIONS TO (selectedAgentsContainer)     
            selectedAgentsContainer.appendChild(newSelection);
            abtn.style.setProperty("opacity", "1");
            abtn.style.boxShadow = "0 0 0.8em " + btnHighlight +  " inset";
// HIDE ANY ALERT
            // gameAlert.style.opacity = "0";      
        }
// END IF.

//ELSE
        else if (selection.includes("_" + agentId) == true && abtn.style.opacity == "1") {
//CHECK IF THE BUTTON EXIST IN (selectedAgentsContainer) AND IS SELECTED.
//LET (allSelected) HOLD ALL SELECTED ELEMENT(AGENTS)  
            let allSelected = selectedAgentsContainer.querySelectorAll(".selected");
            allSelected.forEach(sltd => {
// LET (selectedValue) HOLD THE VALUE OF EACH SELECTED BUTTON
                let selectedValue = sltd.getAttribute('value');
                if (selectedValue == '_' + agentId) {
                    currentlySelected = sltd;
                }
            });                
// REVERSE THE BUTTON STYLES
            abtn.style.setProperty("opacity", "0.6");
            abtn.style.boxShadow = "0 0 0.5em #000a inset";
// REMOVE THE UNSELECTTED ELEMENT(AGENT) FROM (selectedAgentsContainer).
            currentlySelected.remove();
// LET (removedselectionIndex) HOLD 
// THE INDEX OF THE REMOVED ELEMENT(UNSELETED)
// IN THE (selection) array
                let removedselectionIndex = selection.indexOf('_' + agentId);
// REMOVE FROM AND UPDATE THE (selection) ARRAY
// IF A BUTTON IS UNSELECTED.
// i.e REMOVED THE BUTTONS VALUE FROM (selection).                
                selection.splice(removedselectionIndex, 1);
        }
// END ELSE IF
        });
// END THE BUTTON CLICK EVENT.
    });
// END FOREACH (BUTTON LOOP).
}
// END SELECTION FUNCTION.

//CALL THE SELETION FUNCTION
selectCode();

// THE AGENT SELECTIONS FUNCTIONALLITY END=================//

// GET THE SAVE SELECTION BUTTON
const saveSelection = document.querySelector('.playerCodeSelection .saveSelection');
const playGame = document.querySelector('.playerCodeSelection .playGame');

saveSelection.addEventListener('click', () => {
    saveSelection.style.display = "none";
    playGame.style.display = "block";
});
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
                        playGame.style.display = "none";
                        saveSelection.style.display = "block";
                        saveSelection.style.opacity = "0.1";
                        saveSelection.style.zIndex = "-100";
                }
// MAX SELECTION DETECTION END.     
        }
// A BUTTON(Agent) IS CLICKED DETECTION END.

// DETECT IF SELECTION MEETS DIFFICULTY CONDITION
// AND THE RESULT DIV IS EMPTY.
        if (selectionPack.length == 0) {
                saveSelection.style.opacity = "1";
                saveSelection.style.zIndex = "1";
        }
        if (selectionPack.length == diff) {
                saveSelection.style.opacity = "1";
                saveSelection.style.zIndex = "1";
        }
// DETECT IF SELECTION MEETS DIFFICULTY CONDITION END
        });
});
// SELECTION DECTION END=================================//


//RESET GAME ELEMENTS START==============================//
function reset() {
        idIncrement = 0;
        selection = [];
        selectedAgentsContainer.innerHTML = "";
        agentsButton.forEach(abtn => {
                abtn.style.setProperty("opacity", "0.6");
                 abtn.style.boxShadow = "0 0 0.5em #000a inset";    
        });
}

// RESET IF (numbtnReset) IS CLICKED
let resetSelection = document.querySelector(".resetSelection");
resetSelection.addEventListener('click', () => {
        reset();
});
//RESET GAME ELEMENTS END==============================//
}
// CHECK IF AGENT AMOUNT HAS BEEN SET END.



