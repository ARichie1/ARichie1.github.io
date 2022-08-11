// GET THE HTML BODY TAG
const mainBody = document.querySelector('body');

//GET ALL MODULES DIV
const modulesContainer = document.querySelector('.modules');
//GET THE BACK BUTTON
const backButton = document.querySelector('.backBtn');
const homeBtn = document.querySelector('.homeBtn');

// CREATE THE PATH VARIABLES
//HOLDS AN ARRAY OF THE NEXT PATH
let pathNext = ["home"];

//HOLDS THE CURRENT PATH
let pathCurrent = pathNext[pathNext.length - 1];

//HOLDS AN ARRAY OF THE PREVIOUS PATHS
let pathPrev = [];

// SELECT ALL MODALLINKS AS GROUP.        
const modalLink = document.querySelectorAll('.modalLink');
// PERFORM ACTIONS ON EACH MODALLINKS CLICKED=================//
modalLink.forEach(link => {
        link.addEventListener('click', () =>{
// CREATE A VARIABLE(linkTarget) AND LET IT HOLD THE Target modal OF EACH MODALLINK CLICKED.
                let linkTarget = link.getAttribute("target");
// CREATE A VARIABLE(targetModal) AND 
// LET IT HOLD THE TARGET MODAL CORRESPONDING 
// TO EACH MODALLINK CLICKED.
                let targetModal = document.querySelector("#" + linkTarget);
// DISPLAY THE TARGET MODAL.
                targetModal.style.opacity = "1";
                targetModal.style.zIndex = "1";

//LET (targetModalId) HOLD EACH TARGET MODAL ID
                let targetModalId = targetModal.id;
//LET (pathNextLastElement) HOLD THE (pathnext) ARRAY
//LAST VARIABLE AND LET IT STORE EACH RESPECTIVE MODAL ID.
                pathNextLastElement = pathNext[pathNext.length - 1];
                pathNextLastElement = targetModalId;
// ADD (pathNextLastElement) TO (pathNext)
                pathNext.push(pathNextLastElement);
//LET (pathCurrent) HOLD (pathnext) LAST ELEMENT;
                pathCurrent = String(pathNext[pathNext.length - 1]);
//LET (linkModal) HOLD THE MODAL THE 
// MODAL LINK IS INSIDE OF.
                let linkModal = link.closest('.modal');
                let linkModalId = linkModal.id;
// ADD THE linkModalId TO THE pathPrev ARRAY
                pathPrev.push(linkModalId);
// HIDE THE linkModal
                linkModal.style.opacity = "0";
                linkModal.style.zIndex = "-1";
// DISPLAY THE BACKBUTTON
                backButton.style.opacity = "1";
                backButton.style.zIndex = "2";
        });
// MODALLINKS CLICK EVENT END.  
});
// MODALLINKS FORLOOP END===================================// 


// BACK BUTTON FUNCTIONALITY================================//
backButton.addEventListener('click', () => {
// LET (pathlast) HOLD THE (pathPrev) LAST ELEMENT 
        let pathLast = pathPrev[pathPrev.length - 1];
// LET (prevElement) HOLD THE MODAL CORRESPONDING TO (pathLast) 
        let prevElement = document.querySelector("#" + pathLast);
// REMOVE THE LAST ELEMENT FROM (prevElement) 
// SO (pathLast) can move two steps backwards
// i.e if pathprev = ["home","settings"]
// pathLast = "settings"
//with pop(), pathPrev = ["home"] and
//pathLast = "home"; 
        pathPrev.pop();

// LET (currentModal) HOLD THE MODAL CORRESPONDING 
// TO (pathCurrent)
        let currentModal = document.querySelector("#" + pathCurrent);

// REMOVE THE LAST ELEMENT FROM (pathNext)
        pathNext.pop();

// CHECK IF THE USER IS AT THE HOME PAGE
        if (pathLast == "home") {
                pathCurrent = "home";
// HIDE THE BACKBUTTON
                backButton.style.opacity = "0";
                backButton.style.zIndex = "-1";
        }
// ADD THE CURRENT MODAL TO THE pathNext ARRAY
// BEFORE GOING BACKWARDS
        pathCurrent = String(pathNext[pathNext.length - 1]);
// HIDE THE CURRENT MODAL BEFORE GOING BACKWARDS
        currentModal.style.opacity = "0";
        currentModal.style.zIndex = "-1";
// DISPLAY THE PREVIOUS MODAL
        prevElement.style.opacity = "1";
        prevElement.style.zIndex = "1";
});
// BACK BUTTON FUNCTIONALITY==========================//

// HOME BUTTON FUNCTIONALITY==========================//
homeBtn.addEventListener('click', () => {
        console.log('yes');
        location.reload();
    });
// HOME BUTTON FUNCTIONALITY==========================//
    
