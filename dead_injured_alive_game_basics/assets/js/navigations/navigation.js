export{navigation}
import{scriptMaker} from "../functions.js"
import {gameSong, activateClickSound} from "../settings/audio.js" 

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

function navigation(ui) {
// CREATE THE PATH VARIABLES
//HOLDS AN ARRAY OF THE NEXT PATH
let pathNext = ["home"];

//HOLDS THE CURRENT PATH
let change = 1;
let pathCurrent = pathNext[pathNext.length - change];

//HOLDS AN ARRAY OF THE PREVIOUS PATHS
let pathPrev = [];

// GET MODALS FROM ui.html
        modulesContainer.innerHTML = ui;
// SELECT ALL MODALLINKS AS GROUP.        
       const modalLink = document.querySelectorAll('.modalLink');
// PERFORM ACTIONS ON EACH MODALLINKS CLICKED=================//
       modalLink.forEach(e => {
          e.addEventListener('click', () =>{
// ADD THE CLICK SOUND
        activateClickSound();
// CREATE A VARIABLE(linkId) AND LET IT HOLD THE I.D OF EACH MODALLINK CLICKED.
                let linkId = e.getAttribute("id");
// CREATE A VARIABLE(modal) AND 
// LET IT HOLD THE ClASS OF A MODAL CORRESPONDING 
// TO EACH MODALLINK CLICKED.
                let modal = document.querySelector("." + linkId);
// DISPLAY THE MODAL.
                modal.style.display = "block";
//LET (modalClassName) HOLD EACH MODAL CLASSNAME
                let modalClassName = modal.className;
//LET (pathNextLastElement) HOLD THE (pathnext) ARRAY
//LAST VARIABLE AND LET IT STORE EACH RESPECTIVE MODAL CLASS.
                let pathNextLastElement = pathNext[pathNext.length - 1];
                pathNextLastElement = modalClassName;
// ADD (pathNextLastElement) TO (pathNext)
                pathNext.push(pathNextLastElement);
//LET (pathCurrent) HOLD (pathnext) LAST ELEMENT;
                pathCurrent = String(pathNext[pathNext.length - change]);
//LET (parentHolder) HOLD A MODAL LINK MAINPARENT CLASSNAME(immediate parent after the modules div).
                let parentHolder = e.parentNode.parentElement.className;
//LET (parentElement) HOLD A MODAL LINK MAINPARENT(immediate parent after the modules div).
                let parentElement = document.querySelector("." + parentHolder);
// CHECK (pathPrev) ARRAY 
// IF A MODALLINK PARENTCLASS(parentholder) EXIST.
                if (pathPrev.includes(parentHolder) == false) {
// IF MODALLINK PARENTCLASS(parentholder) DOES NOT EXIT
// ADD THE MODALLINK PARENTCLASS(parentholder) 
// TO THE (pathPrev) ARRAY.
                        pathPrev.push(parentHolder);
                }
// (pathPrev) ARRAY CHECK END

// HIDE THE MODALLINK PARENT(parentElement)
                parentElement.style.display = "none";
                backButton.style.display = "flex";
                homeButton.style.display = "flex";
        });
// MODALLINKS CLICK EVENT END.  
});
// MODALLINKS FORLOOP END===================================// 

// BACK BUTTON FUNCTIONALITY================================//
backButton.addEventListener('click', (e) => {
// ADD CLICK SOUND
        activateClickSound();
// LET (pathlast) HOLD THE (pathPrev) LAST ELEMENT 
        let pathLast = pathPrev[pathPrev.length - 1];

// LET (prevElement) HOLD THE MODAL CORRESPONDING TO (pathLast) 
        let prevElement = document.querySelector("." + pathLast);

// REMOVE THE LAST ELEMENT FROM (prevElement) 
// SO (pathLast) can move two steps backwards
// i.e if pathprev = ["home","settings"]
// pathLast = "settings"
//with pop(), pathPrev = ["home"] and
//pathLast = "home"; 
        pathPrev.pop();

// LET (currentElement) HOLD THE MODAL CORRESPONDING TO (pathCurrent)
        let currentElement = document.querySelector("." + pathCurrent);

// REMOVE THE LAST ELEMENT FROM (pathNext)
        pathNext.pop();

// CHECK IF (pathNext) IS AT THE HOME PAGE
        if (pathNext.length < 1) {
                pathCurrent = "home";
                backButton.style.opacity = "0";
        }else{
                pathCurrent = String(pathNext[pathNext.length - change]);
                prevElement.style.display = "block";
                currentElement.style.display = "none";
        }

});
// BACK BUTTON FUNCTIONALITY==========================//

// HOME BUTTON FUNCTIONALITY START==========================//
homeButton.addEventListener('click', () => {
// ADD CLICK SOUND
        activateClickSound();
        location.reload();
});
// HOME BUTTON FUNCTIONALITY END==========================//

// ENABLE PROFILE SETTINGS AND GAMELOGIC FUNCTIONALITY START============//
mainBody.appendChild(scriptMaker("assets/js/settings/settings.js"));
// ENABLE PROFILE SETTINGS AND GAMELOGIC FUNCTIONALITY END==============//

// IF A TO GAME BUTTON IS CLICKED START=======================//
const continueToGame = document.querySelectorAll('.modules .bottom .toGame');
        continueToGame.forEach(cTogame => {
                cTogame.addEventListener('click', () => {
                        if (cTogame.getAttribute("id") == "singlePlayerMainGame") {
                                let inGameValues = document.querySelectorAll('.top .inGameValues');
                                inGameValues.forEach(ingv => {
                                        ingv.style.display = "flex";
                                });
                        }
        // HIDE THE BACK BUTTON AND THE LAST MODULE 
        // BEFORE THE MAINGAME WAS DISPLAYED.
                        let lastModuleBeforeGame = document.querySelector('.' + pathCurrent);
                        lastModuleBeforeGame.style.display = 'none';
                        backButton.style.display = 'none';
                        homeButton.style.display = 'none';
                }); 
        });
// IF A TO GAME BUTTON IS CLICKED END=======================//
}

