// GET THE SCENE
const scene = document.querySelector('.scene');

// STORE THE DIFFERENT PROPERTY TYPES
// A PROPERTY CAN HAVE.
let hatType = ['baseball', 'gangstar', 'chinese'];
let face = 'face';
let eyesType = ['circle', 'square', 'oval'];
let noseType = ['clown', 'flat', 'star'];
let mouthType = [ 'happy', 'neutral', 'sad'];

// GET A RANDOM ELEMENT START==========================//
function ran(arrayType) {
// GET A RANDOM NUMBER WITHIN A GIVEN RANGE
    function generateRandomNumber(min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
// STORE A RANDOM NUMBER BASED ON THE ARRAY LENGTH
    let randomNumber = generateRandomNumber(0, arrayType.length - 1);
// GET A RANDON ELEMENT FROM THE ARRAY
    let randomElement = arrayType[randomNumber];
// SEND THAT RANDOM ELEMENT
    return randomElement;
}
// GET A RANDOM ELEMENT END============================//

// CONSTRUCT A LOOK(CREATE LOOK CLASS) START============//
// let the construtor take parameter,
// so you can build new looks instantly.
var Look = function (name, hat, face, eyes, nose, mouth) {
// CREATE PROPERTIES FOR THE LOOK
    this.name = name;
    this.hat = hat;
    this.face = face;
    this.eyes = eyes;
    this.nose = nose;
    this.mouth = mouth;
// BUILD THE LOOK
    this.build = function (containerName) {
// CREATE THE LOOK SKIN
        let theLook = document.createElement('div');
        theLook.setAttribute('class', 'look ');
// FORM THE NAME
        let theName = document.createElement('div');
        theName.setAttribute('class', 'name ' + this.name); 
        theName.innerHTML = this.name;
// FORM THE HAT
        let theHat = document.createElement('div');
        theHat.setAttribute('class', 'hat ' + this.hat); 
// FORM THE FACE
        let theFace = document.createElement('div');
        theFace.setAttribute('class', this.face);  
// FORM THE EYES      
        let theEyes = document.createElement('div');
        theEyes.setAttribute('class', 'eyes ' + this.eyes);
// ADD BOTH EYES
        for (let i = 0; i < 2; i++) {
            let theEye = document.createElement('div');
            theEye.setAttribute('class', 'eye');
            theEyes.appendChild(theEye);
        }
// FOEM THE NOSE
        let theNose = document.createElement('div');
        theNose.setAttribute('class', 'nose ' + this.nose);
// FOEM THE MOUTH
        let theMouth = document.createElement('div');
        theMouth.setAttribute('class', 'mouth ' + this.mouth);

// FORM THE FACE
        theFace.appendChild(theEyes);
        theFace.appendChild(theNose);
        theFace.appendChild(theMouth);

// FORM THE LOOK, COMBINE THE PROPERTIES.
        theLook.appendChild(theName);
        theLook.appendChild(theFace);
        theLook.appendChild(theHat);

// ADD THE NEW LOOK TO AN ELEMENT (container)      
        let container = document.querySelector('.' + containerName);
        container.appendChild(theLook);
    }
// THE LOOK BUILD FUNCTION END.
}
// CONSTRUCT A LOOK(CREATE LOOK CLASS) END============//

// EMPTY A CHOSEN ELEMENT=================//
function clear(containerName) {
    let container = document.querySelector('.' + containerName);
    container.innerHTML = '';
}


// HOLD THE INDIVIDUAL LOOK PROPERTIES
let currentName;
let currentHat;
let currentFace;
let currentEyes;
let currentNose;
let currentMouth;

// DISPLAY THE CREATE FORM
let createPanelDiv = document.querySelector('.left');
let createdLookContainer = document.querySelector('.right');
let createNewFaceButton = document.querySelector('.createNewFaceLabel');

// CREATE DEFAULT LOOK START===================//
let properties = document.querySelector('.properties');
let creationName = document.querySelector('.creationName');

let registerFaceName = document.querySelector('.registerFaceName');
let theLookName = document.querySelector('.lookName .lookNameInput');
let sendName = document.querySelector('.sendName');

let createButton = document.querySelector('.createButton');

// IF THE CREATE NEW FACE BUTTON IS CLICKED 
sendName.addEventListener('click', () => {
// CREATE A NEW INSTANCE OF THE LOOK CLASS
    let newFace = new Look();
// CHECK IF THE INPUT IS EMPTY
// i.e check if the look has been given a name.
    if (theLookName.value != '') {
// STORE THE IN (currentName) 
        currentName = theLookName.value;
        creationName.innerHTML = currentName;
// STORE A DEFAULT FACE TYPE IN (currentFace) 
        currentFace = 'face';
// THE AFTER 1S 
        setTimeout(() => {
// LET THAT INPUT VALUE BE THE LOOK NAME
            newFace.name = currentName;
            newFace.face= currentFace;
// THE BULID AND DISPLAY THE NEW LOOK
// its going have just the DEFAULT properties.
            newFace.build('head');
        }, 10);
        registerFaceName.style.zIndex = '-1';
        registerFaceName.style.display = 'none';
        // GET EACH THE PROPERTY AND IT NAME
        properties.style.display = 'block';

        createPanelDiv.style.width = '49%';
        createdLookContainer.style.display = 'block';
    }
// END IF CHECK
});
// CREATE DEFAULT LOOK END========//

// SET THE LOOK PROPERTIES START===========================//
let theProperty = document.querySelectorAll('.property');
// GET EACH THE PROPERTY AND IT NAME
theProperty.forEach(property => {
    let thePropertyName = property.querySelector('.propertyName');
    let thePropertyType = property.querySelectorAll('.propertyType');
// GET EACH PROPERTY TYPE(propertyType) OF EACH PROPERTY(property)
    thePropertyType.forEach(propertyType => {
// IF A PROPERTY TYPE IS CLICKED/SELECTED
        propertyType.addEventListener('click', () => {
// CLEAR THE DISPLAY DIV(head)
            clear("head");
//  RE-INSTANTIATE THE LOOK(update the look)
            newFace = new Look();
// STORE EACH PROPERTY BASED ON THE 
// PROPERTY AND PROPERTY TYPE CLICKED
            if (thePropertyName.id == 'hat') {
                currentHat = String(propertyType.id);
            }
            else if (thePropertyName.id == 'eye') {
                currentEyes = String(propertyType.id);
            }
            else if (thePropertyName.id == 'nose') {
                currentNose = String(propertyType.id);
            }
            else if (thePropertyName.id == 'mouth') {
                currentMouth = String(propertyType.id);
            }
// SET EACH PROPERTY 
            newFace.name = currentName;
            newFace.hat = currentHat;
            newFace.face = currentFace;
            newFace.eyes = currentEyes;
            newFace.nose = currentNose;
            newFace.mouth = currentMouth;
// THEN UPDATE,BUILD AND DISPLAY THE LOOK 
// BASED ON THE NEW PROPERTIES
            newFace.build('head');
        });
// PROPERTY TYPE CLICK END
    });
// PROPERTY TYPE SELECTION END
});
// PROPERTY SELECTION END
// SET THE LOOK PROPERTIES END===========================//

// SEND THE NEW LOOK TO A DOWNLOAD CONTAINER
let createdLook = document.querySelector('.right .head');
let downloadDiv = document.querySelector('.downloadDiv');
let downloadContainer = document.querySelector('.newlyCreated');

// CREATE BUTTON CLICK START
createButton.addEventListener('click', () => {
// CREATE DOWNLOAD ASSETS
    let downloadContainerHead = document.createElement('div');
    downloadContainerHead.setAttribute('class', 'head');
    downloadContainer.appendChild(downloadContainerHead);
    downloadContainerHead.innerHTML = createdLook.innerHTML;

    let downloadContainerButton = document.createElement('div');
    downloadContainerButton.setAttribute('class', 'download');
    downloadContainer.appendChild(downloadContainerButton);
    downloadContainerButton.innerHTML = 'Download';

    let downloadContainerCancel = document.createElement('div');
    downloadContainerCancel.setAttribute('class', 'cancel');
    downloadContainer.appendChild(downloadContainerCancel);
    downloadContainerCancel.innerHTML = 'X';

// DISPLAY THE DOWNLOAD DIV
    downloadDiv.style.zIndex = '3';
    downloadDiv.style.opacity = '1';
    createPanelDiv.style.opacity = '0.2';
    createdLookContainer.style.opacity = '0.2';

// HIDE THE DOWNLOAD DIV AND DISPLAY THE CREATE PANEL
    downloadContainerCancel.addEventListener('click', () => {
        if (downloadDiv.style.zIndex == '3') {
            downloadDiv.style.zIndex = '-1';
            downloadDiv.style.opacity = '0';
// HIDE THE CREATION DIVS
            createPanelDiv.style.opacity = '1';
            createdLookContainer.style.opacity = '1';
// CLEAR THE DOWNLOADS
            downloadContainerHead.innerHTML = '';
        }
// END IF
    });
// HIDE THE DOWNLOAD DIV END====================//
});
// CREATE BUTTON CLICK END====================//

