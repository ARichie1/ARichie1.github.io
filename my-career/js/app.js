
// ===== NEEDED FUNCTIONS START=========================//
// =====TOGGLE FUNCTIONALITY START=====//
function toggleStyle(el, prop, style1, style2) {
	el.style[prop] = el.style[prop] === style1 ? style2 : style1;
}

//Content Toggler
function toggleContent(el, content1, content2) {
	el.innerHTML = el.innerHTML === content1 ? content2 : content1;
}
// =====TOGGLE FUNCTIONALITY END=====//

//=====RANDOM INDEXES GENARATION START=====//
// LET (genIndex) HOLD THE ARRAY OF RANDOM NUMBERS(index)
let genIndex;
    
// generateRandomNumber(min,max) WILL RETURN A RANDOM NUMBER
function generateRandomNumber(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
    
// uniqueRangeGenerator(rength,min,max) WILL RETURN A RANGE
// OF UNIQUE NUMBERS, EACH BETWEEN "MIN AND MAX"
//WITH RANGE LENGTH(rength) EQUAL TO THE CHOSEEN ARRAY LENGTH.
function uniqueRangeGenerator(rength,min,max) {
    const range = []
    while (range.length < (rength)) {
        var randomNumber = generateRandomNumber(min, max)
        if (range.indexOf(randomNumber) === -1) {
                if (range.includes(randomNumber) == false) {
                        range.push(randomNumber); 
                }
        }
    }
    return range
}
//=====RANDOM INDEXES GENERATION END=====//

//=====ARRAY ELEMENT REMOVER START=======//
function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}
//=====ARRAY ELEMENT REMOVER END=======//

// =====CONVERT A SENTENCE OR WORD TO CAMELCASE START=====//
function camalize(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}
// =====CONVERT A SENTENCE OR WORD TO CAMELCASE END=====//

// =====ARRAY DUPLICATES REMOVER START=====// 
function removeDuplicates(data) {
    return data.filter((value, index) => data.indexOf(value) === index);
}
// =====ARRAY DUPLICATES REMOVER  END=====//

// =====ARRAY BINDER START=====//
function arrayBinder(array) {
    let binded = array.reduce((a, b) => a + b);
    return binded;
}
// =====ARRAY BINDER END=====//
// ===== NEEDED FUNCTIONS END=========================//


// =========HOME MODULE FUNCTIONALITIES START======================//
// GET THE NECCESSARY DOM ELEMENTS.
let appName = document.querySelectorAll('.appName');
let start = document.querySelector('.start');
let homeButton = document.querySelector('.homeBtn');
let backBtn = document.querySelector('.backBtn');

let alertBox = document.querySelector('.alertBox');
let alertCancel = document.querySelector('.alertCancel');
let alertMessage = document.querySelector('.alertMessage');

appName.forEach(an => {
    an.textContent = "CAREER FINDER";
});

start.addEventListener('click', () => {
// DISPLAY THE HOME BUTTON
    homeButton.style.opacity = '1';
    homeButton.style.zIndex = '3';
    backBtn.style.opacity = '0';
    backBtn.style.zIndex = '-1';
});

alertCancel.addEventListener('click', () => {
// DISPLAY THE HOME BUTTON
    alertBox.style.opacity = '0';
    alertBox.style.zIndex = '-1';
});
// =========HOME MODULE FUNCTIONALITIES START======================//
// ==================================================================//
// ==================================================================//

// GENERATE THE INDEXES AND STORE THE GENERATED ARRAY 
// OF RANDOM NUMBERS(INDEXES)
let genTraitIndex = uniqueRangeGenerator(30,0,29);

// MAIN NAVIGATION AJAX CALL START===================================================//
var http = new XMLHttpRequest();
http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200){
        var response = http.responseText;
        let data = JSON.parse(response);
// GET AND STORE THE ARRAY OF TRAITS.
        const trait = data.personalities;
// GET AND STORE THE CARRERS OF THE PERSONALITIES.
        const careerArray = data.careerArray;
// GET AND HOLD THE WORDS MEANING FROM THE DICTIONARY
        const meanings = data.dictionary;

// =========TRAIT SELECTION MODULE FUNCTIONALITIES START======================//
// GET THE NECCESSARY DOM ELEMENTS.

let traitContainer = document.querySelectorAll('.traitContainer');
let traitBox = document.querySelectorAll('.traitBox');

let traitBox1 = document.querySelector('#traitBox1 .traitWord');
let traitBox2 = document.querySelector('#traitBox2 .traitWord');
let traitBox3 = document.querySelector('#traitBox3 .traitWord');
let traitBox4 = document.querySelector('#traitBox4 .traitWord');

let nextTraits = document.querySelector('.nextTraits');
let submitTraits = document.querySelector('.submitTraits');
let prevTraits = document.querySelector('.prevTraits');
let wordCount = document.querySelector('.wordCount');
let progressThumb = document.querySelector('.progressThumb');

// GIVE THE PROGRESS BAR THUMB A DEFAULT WIDTH
progressThumb.style.width = "3%";

// HOLDS THE SELECTED WORD/WORDS TEMPORARILY
let selectChecker = [];
// STORES THE SELECTED WORD/WORDS AND MAKES THEM THE CHOSEN WORD/WORDS
let chosenWords = [];
// HELPS CYCLE BACK AND FRONT THE genIndex ARRAY
// TO LOAD NEW WORDS OR GET THE PREVIOUS WORDS.
let personaityInc = 0;

// ON MODULE LOAD ADD THE FIRST WORDS TO THE traitBoxes
traitBox1.innerHTML = trait['p1'][genTraitIndex[personaityInc]];
traitBox2.innerHTML = trait['p3'][genTraitIndex[personaityInc]];
traitBox3.innerHTML = trait['p0'][genTraitIndex[personaityInc]];
traitBox4.innerHTML = trait['p2'][genTraitIndex[personaityInc]];

// ON MODULE LOAD HIDE THE PREVIOUS BUTTON
prevTraits.style.opacity = "0";
prevTraits.style.zIndex = "-1";

// ===========================================================//

// PERFORM ACTION EACH traitBox START======================//
traitBox.forEach(tb => {
// SET ALL THE traitBoxes state TO unselected.
    tb.setAttribute('state', 'unselected');
// IF A traitBox IS CLICKED START
    tb.addEventListener('click', () => {
// GET THE WORD IN EACH traitBox 
        let traitBoxWord = tb.querySelector('.traitWord').textContent;
        if (tb.getAttribute('state') == 'unselected'){
            tb.setAttribute('state', 'selected');
// GET THE BACKGROUND COLOR TO SIGNIFY SELECTION
        tb.style.background = 'var(--theme-color)';
// IF THE WORD HAS NOT BEEN SELECTED BEFORE
            if (selectChecker.includes(traitBoxWord) == false) {
// ADD THE SELECTED traiBox WORD TEMPORARILY
// TO THE selectChecker ARRAY. 
                selectChecker.push(traitBoxWord);
            }
// CHECK IF THE SELECTED WORD/WORDS HAS BEEN CHOSEN 
// BEFORE ADDING IT TO THE chosenWord ARRAY.
            for (let i = 0; i < selectChecker.length; i++) {
                if (chosenWords.includes(selectChecker[i]) == false) {
                    chosenWords.push(selectChecker[i]);
                    console.log(chosenWords);
                }    
            }
        }
// END IF (for selected state).

// ELSE IF THE STATE IS ALREADY SELECTED 
        else if (tb.getAttribute('state') == 'selected') {
// CHANGE THE STATE TO UNSELECTED(state and background)
            tb.setAttribute('state', 'unselected');
            tb.style.background = 'transparent';
// REMOVE THE traitBox WORD FROM
// THE selectChecker AND chosenWords ARRAY.
            selectChecker = arrayRemove(selectChecker, traitBoxWord);
            chosenWords = arrayRemove(chosenWords, traitBoxWord);
        }
// END IF (for unselected state).
    });
// END CLICK EVENT.
});
// PERFORM ACTION EACH traitBox END=====================//

// =========================================================//

// IF THE NEXT BUTTON IS CLICKED START=================//
nextTraits.addEventListener('click', () => {
// INCREMENT THE personaityInc TO ADD NEW WORDS 
    personaityInc++;
// SET ALL THE traitBoxes state TO unselected.
    traitBox.forEach(tb => {
        tb.setAttribute('state', 'unselected');
    });
// CHECK IF ANY OF THE NEXT WORDS AS BEEN CHOSEN BEFORE
// AND EXIST IN THE chosenWords ARRAY.
// SET TIMOUT TO WAIT FOR THE NEXT WORDS TO LOAD.
setTimeout(() => {
    traitBox.forEach(tb => {
        tb.setAttribute('state', 'unselected');
        let traitBoxWord = tb.querySelector('.traitWord').textContent;
// CHECK IF A traitBox word IS IN THE CHOSEN WORD ARRAY
// (i.e has been chosen before).        
        if (chosenWords.includes(traitBoxWord)) {
// CHANGE THE BACKGROUND COLOR TO SIGNIFY SELECTION
            tb.style.background = 'var(--theme-color)';
        }
        else{
            tb.style.background = 'transparent';
        }
// END ELSE
    });
// END triatBox FOR EACH        
}, 10);
// END SET TIMEOUT.

// ADD NEW WORDS TO THE traitBox
    traitBox1.innerHTML = trait['p1'][genTraitIndex[personaityInc]];
    traitBox2.innerHTML = trait['p3'][genTraitIndex[personaityInc]];
    traitBox3.innerHTML = trait['p0'][genTraitIndex[personaityInc]];
    traitBox4.innerHTML = trait['p2'][genTraitIndex[personaityInc]];


// IF THE LAST SET OF WORDS ARE DISPLAY(i.e at the ending)
    if (personaityInc == 29) {
// HIDE THE NEXT BUTTON
        nextTraits.style.opacity = "0";
        nextTraits.style.zIndex = "-1";
// DISPLAY THE SUBMIY BUTTON
        if (chosenWords.length > 4) {
            submitTraits.style.opacity = "1";
            submitTraits.style.zIndex = "1";
        }  
        else{
            alertBox.style.opacity = "1";
            alertBox.style.zIndex = "3";
            alertMessage.innerHTML = 
            "<p>SELECT AT LEAST FIVE WORDS TO CONTINUE.</p>";
        }
    }
// END IF

// DISPLAY THE PREVIOUS BUTTON
    prevTraits.style.opacity = "1";
    prevTraits.style.zIndex = "1";
// ADJUST THE PROGRESS BAR THUMB WIDTH FORWARDS
    progressThumb.style.width = parseInt(progressThumb.style.width) + 3 + "%";
});
// IF THE NEXT BUTTON IS CLICKED END========================//

// DISPLAY THE AMOUNT OF WORDS CHOSEN START=======================//
setInterval(() => {
    wordCount.innerHTML = chosenWords.length;
}, 1000);
// DISPLAY THE AMOUNT OF WORDS CHOSEN END========================//

// ============================================================//

// IF THE PREVIOUS BUTTON IS CLICKED START=================//
prevTraits.addEventListener('click', () => {
// DECREMENT THE personaityInc TO GET THE PREVIOUS WORDS 
    personaityInc--;
// CHECK IF ANY OF THE PREVOIUS WORDS AS BEEN CHOSEN BEFORE
// AND EXIT IN THE chosenWords ARRAY.
// SET TIMOUT TO WAIT FOR THE PREVIOUS WORDS TO LOAD.
    setTimeout(() => {
// FOR EACH traitBox
    traitBox.forEach(tb => {
// GET THE traitBox Word
            tb.style.background = 'transparent';
            let traitBoxWord = tb.querySelector('.traitWord').textContent;
// CHECK IF A traitBox word IS IN THE CHOSEN WORD ARRAY
// (i.e has been chosen before).
            if (chosenWords.includes(traitBoxWord)) {
// CHANGE THE STATE AND BACKGROUND COLOR TO SIGNIFY SELECTION
                tb.setAttribute('state', 'selected');
                tb.style.background = 'var(--theme-color)';
// ELSE IF THE WORD HAS NOT BEEN CHOSEN
            }else if (chosenWords.includes(traitBoxWord)){
// CHANGE THE BACKGROUND COLOR TO SIGNIFY UNSELECTION
                tb.style.background = 'transparent';
            }
// END ELSE IF
        });
// END triatBox FOR EACH        
    }, 10);
// END SET TIMEOUT.

// LOAD THE PREVIOUS WORDS.
    traitBox1.innerHTML = trait['p1'][genTraitIndex[personaityInc]];
    traitBox2.innerHTML = trait['p3'][genTraitIndex[personaityInc]];
    traitBox3.innerHTML = trait['p0'][genTraitIndex[personaityInc]];
    traitBox4.innerHTML = trait['p2'][genTraitIndex[personaityInc]];


// IF WORDS ARE DISPLAY(i.e user is at the beginning)
    if (personaityInc == 0) {
// HIDE THE PREVIOUS BUTTON
        prevTraits.style.opacity = "0";
        prevTraits.style.zIndex = "-1";
    }
// END IF

// DISPLAY THE NECT BUTTON
    nextTraits.style.opacity = "1";
    nextTraits.style.zIndex = "1";
// HIDE THE SUBMIT BUTTON
    submitTraits.style.opacity = "0";
    submitTraits.style.zIndex = "-1";
// HIDE THE alertBox IF DISPLAYED BUTTON
    alertBox.style.opacity = "0";
    alertBox.style.zIndex = "-1";

// ADJUST THE PROGRESS BAR THUMB WIDTH BACKWARDS
    progressThumb.style.width = parseInt(progressThumb.style.width) + (-3) + "%";
});
// IF THE PREVIOUS BUTTON IS CLICKED END=================//


// FETCH THE MEANING OF THE WORDS FROM THE DICTIONARY START=====//
function fecthMeanings() {
    traitContainer.forEach(tc => {
        let traitWord = tc.querySelector('.traitWord').textContent;
        let traitMeaning = tc.querySelector('.traitMeaning');
// (triatWordKey) WILL BE USED TO GET 
// THE triatWord MEANING FROM THE DICTIONARY
        let traitWordKey;
// CHECK IF THE traitWord has a space 
// i.e if it is a sentence or multiple words.
       if (traitWord.includes(" ")) {
// IF IT IS TURN IT TO CAMEL CASE 
            traitWordKey = camalize(traitWord);
        }
        else{
            traitWordKey = traitWord;
        }

// INSERT THE MEANING TO THE MEANING DISPLAY DIV
        traitMeaning.innerHTML = "<h4 class='word'>" + traitWord 
                                    + "</h4><br><h5 class='meaning'>" 
                                    + meanings[traitWordKey] + "</h5>";
    });
}
// FETCH THE MEANING OF THE WORDS FROM THE DICTIONARY END=====//

// HIDE AND SHOW THE MEANING IF THE MEANING BUTTON IS CLICKED START=====//
traitContainer.forEach(tc => {
    let traitMeaning = tc.querySelector('.traitMeaning');
    let traitMeaningBtn = tc.querySelector('.traitMeaningBtn');

    traitMeaningBtn.addEventListener('click', () => {
        toggleStyle(traitMeaning, 'opacity', '1', '0');
        toggleStyle(traitMeaning, 'zIndex', '1', '-1');  

// RE-SCAN FOR NEW WORDS AND FECTH THE MEANINGS INSTANTLY.
        function displayMeaning() {
            if (traitMeaning.style.opacity == "1") {
                fecthMeanings();
            }else{
                return;
            }
        }
// DISPLAY THE MEANING IF HIDDEN
        displayMeaning();
    });
});
// HIDE AND SHOW THE MEANING IF THE MEANING BUTTON IS CLICKED END=====//
// =========TRAIT SELECTION MODULE FUNCTIONALITIES END======================//
// =================================================================//
// =================================================================//
// =========RESULTS MODULE FUNCTIONALITIES START======================//

// CREATE THE PERSONALITY HOLDERS AND TYPE.
let personalities = [[],[],[],[]];
let personalityType = [
    "Accomodating Harmonious",
    "Engaging Spontaneous",
    "Directive Objective",
    "Methodical Objective"
];
// RE-ARRANGE THE (pLengthArray) FROM HIGHEST TO LOWEST NUMBER
// THIS WILL HELP TO IDENTIFY DOMINANCE IN EACH PERSONALITY.
let pSortedLengthArray = [];

// GET THE RESULTS DIVS
let resultStats = document.querySelector('.resultStats');
let personalityStatsBox = document.querySelectorAll('.personalityStats');
let pBox0 = document.querySelector('.sOne');
let pBox1 = document.querySelector('.sTwo');
let pBox2 = document.querySelector('.sThree');
let pBox3 = document.querySelector('.sFour');

// IF THE SUBMIT BUTTON IS CLICKED START=====//
submitTraits.addEventListener('click', () => {
// DISPLAY THE BACK BUTTON
    backBtn.style.opacity = '1';
    backBtn.style.zIndex = '3';
// RESET THE chosenWords By removing duplicates
    chosenWords = removeDuplicates(chosenWords);
// CLEAR ALL THE PERSONALITY ARRAY(personalities)
// SO THAT WHEN WE RECYCLE THROUGH THE chosenWords ARRAY
// THE PERSONALITY ARRAY(personalities) WON'T HAVE 
// DUPLICATES ELEMENTS(traits)
    for (let i = 0; i < personalities.length; i++) {
        personalities[i] = [];
    }  
    
// THEN AFTER FEW SECONDS CYCLE THROUGH THE chosenWords ARRAY
// AND DISPLAY THE RESULT.
setTimeout(() => {
// CHECK IF THE SELECTED WORD/WORDS HAS BEEN CHOSEN 
// BEFORE ADDING THE LAST WORD TO THE chosenWord ARRAY.
    for (let i = 0; i < selectChecker.length; i++) {
        if (chosenWords.includes(selectChecker[i]) == false) {
            chosenWords.push(selectChecker[i]);
        }    
    }
    console.log("chosenWords(" + chosenWords.length + ") = " + chosenWords);

// CYCLE TROUGH chosenWords ARRAY TO CHECK WHICH 
// PERSONALITY THE CHOSEN TRAIT REPRESENTS OR FALL UNDER. 
    for (let i = 0; i < chosenWords.length; i++) {
        for (let j = 0; j < 4; j++) {
            if (trait["p" + j].includes(chosenWords[i])) {
                personalities[j].push(chosenWords[i]);
            }            
        }
    }

    console.log("AH(" + personalities[0].length + ") = " + personalities[0]);
    console.log("ES(" + personalities[1].length + ") = " + personalities[1]);
    console.log("DO(" + personalities[2].length + ") = " + personalities[2]);
    console.log("MO(" + personalities[3].length + ") = " + personalities[3]);

// STORE THE LENGTH OF EACH personalities ARRAY
// subArray(each personality).
    let pLengthArray = [];
    for (let i = 0; i < personalities.length; i++) {
        let pLength = personalities[i].length;
        pLengthArray.push(pLength);
    }

// RE-ARRANGE THE (pLengthArray) FROM HIGHEST TO LOWEST NUMBER
// THIS WILL HELP TO IDENTIFY DOMINANCE IN EACH PERSONALITY.
    pSortedLengthArray = pLengthArray.sort((a, b) => b - a);

// LET (pNames) HOLD THE PERSONALITY TYPES 
// FROM HIGHEST TO LOWEST DOMINANCE.
    let pNames = ["", "", "", ""];

// ARRANGE THE (pNames) ARRAY 
// FROM HIGHEST TO LOWEST DOMINANCE.
    for (let i = 0; i < personalities.length; i++) {
// GET THE INDEX OF EACH PERSONALITY
        let pIndex = personalities.indexOf(personalities[i]);

// IF THE PERSONALITY HAS THE HIGHEST LENGTH(MOST DOMINANT)
// MAKE IT THE FIRST ELEMENT IN THE (pNames) ARRAY.
        if (personalities[i].length == pSortedLengthArray[0]) {
// POSITION LOGIC {IF THERE ARE OTHER PERSONALITY WITH THE SAME LENGTH
// SET THEM AS THE NEXT ELEMENTS OF THE (pNames) ARRAY}
            if (pNames.includes(personalityType[pIndex]) == false) {
                if (pNames[0] == "") {
                    pNames[0] = personalityType[pIndex];   
                }
                else if (pNames[1] == "") {
                    pNames[1] = personalityType[pIndex];   
                }
                else if (pNames[2] == "") {
                    pNames[2] = personalityType[pIndex];   
                }
                else if (pNames[3] == "") {
                    pNames[3] = personalityType[pIndex];   
                }
            }
        }
// IF THE PERSONALITY HAS THE 2ND HIGHEST LENGTH(2ND DOMINANT)
// MAKE IT THE 2ND ELEMENT IN THE (pNames) ARRAY.
        if (personalities[i].length == pSortedLengthArray[1]) {
// POSITION LOGIC
            if (pNames.includes(personalityType[pIndex]) == false) {
                if (pNames[1] == "") {
                    pNames[1] = personalityType[pIndex];   
                }
                else if (pNames[2] == "") {
                    pNames[2] = personalityType[pIndex];   
                }
                else if (pNames[3] == "") {
                    pNames[3] = personalityType[pIndex];   
                }
            }
        } 
// IF THE PERSONALITY HAS THE 3RD HIGHEST LENGTH(3RD DOMINANT)
// MAKE IT THE 3RD ELEMENT IN THE (pNames) ARRAY.
        if (personalities[i].length == pSortedLengthArray[2]) {
// POSITION LOGIC
            if (pNames.includes(personalityType[pIndex]) == false) {
                if (pNames[2] == "") {
                    pNames[2] = personalityType[pIndex];   
                }
                else if (pNames[3] == "") {
                    pNames[3] = personalityType[pIndex];   
                }
            }
        } 
// IF THE PERSONALITY HAS THE 4TH HIGHEST LENGTH(4TH DOMINANT)
// MAKE IT THE 4TH ELEMENT IN THE (pNames) ARRAY.
        if (personalities[i].length == pSortedLengthArray[3]) {
// POSITION LOGIC
            if (pNames.includes(personalityType[pIndex]) == false) {
                if (pNames[3] == "") {
                    pNames[3] = personalityType[pIndex];   
                }
            }
        } 
    }
    console.log(pNames);


// DISPLAY THE PERSONALITIES FROM THE 
// MOST DOMINANT TO THE LEAST DOMINANT.

// LOGIC { FOR EACH OF THE PERSONALITY BOXES,
// SET THE PERSONALITY IN ORDER OF THE (pNames) ARRAY
// THEN GET THE INDEX OF EACH OF THE PERSONALITY
// IN THEIR ORDER IN THE (personalityType) ARRAY,
// THEN SET THE DOMINANCE AMOUNT TO THE 
// LENGTH OF THAT PERSONALITY}
    pBox0.querySelector('.personality').innerHTML = pNames[0];
    let dominantOne = personalityType.indexOf(pNames[0]);
    pBox0.querySelector('.amount').innerHTML =  personalities[dominantOne].length;
    
    pBox1.querySelector('.personality').innerHTML = pNames[1];
    let dominantTwo = personalityType.indexOf(pNames[1]);
    pBox1.querySelector('.amount').innerHTML =  personalities[dominantTwo].length;

    pBox2.querySelector('.personality').innerHTML = pNames[2];
    let dominantThree = personalityType.indexOf(pNames[2]);
    pBox2.querySelector('.amount').innerHTML =  personalities[dominantThree].length;
    
    pBox3.querySelector('.personality').innerHTML = pNames[3];
    let dominantFour = personalityType.indexOf(pNames[3]);
    pBox3.querySelector('.amount').innerHTML =  personalities[dominantFour].length;
}, 10);
// END SET TIMEOUT
});
// IF THE SUBMIT BUTTON IS CLICKED END=====//
// =========RESULTS MODULE FUNCTIONALITIES END======================//
// =======================================================================//
// =======================================================================//
// =========CAREER DISPLAY MODULE FUNCTIONALITIES START======================//

// GET THE CAREER DIV ELEMENTS
let showListBtn = document.querySelector('.showListBtn');
let dominanceList = document.querySelectorAll('.dominanceList');
let mostDominantList = document.querySelector('.mostDominantList')
let lessDominantList = document.querySelector('.lessDominantList')

let dominanceSwitch = document.querySelector('.dominanceSwitch');
let checkLessDominant = document.querySelector('.checkLessDominant');

// USE (mostDomBox ) AND (mostDomBox ) 
// TO GIVE EACH PERSONALITY A UNIQUE CLASS
// i.e ld1, ld2, ... or md1, md2, ...
let mostDomBox = 1;
let lessDomBox = 1;

// IF THE CAREERS SHOW BUTTON IS CLICKED START===========//
showListBtn.addEventListener('click', () => {
// RESET THE DOMINANCE LIST 
    dominanceList.forEach(domlist => {
        domlist.innerHTML = "";
        mostDomBox = 1;
        lessDomBox = 1;
    });
// THEN QUICKLY ADD THE CAREERS
setTimeout(() => {
// CYCLE THROUGH THE RESULTS GOTTEN        
    for (let i = 0; i < personalities.length; i++) {
// CREATE A NEW DIV TO DISPLAY THE PERSONALITY DETAILS
        let newDomList = document.createElement('div');
// CONVERT EACH OF THE PERSONALITY NAMES TO UPPERCASE
// TO BE DISPLAY AS THE TITLE.
        let theTitle = personalityType[i].toUpperCase();

// CONVERT EACH OF THE PERSONALITY NAMES TO LOWERCASE 
// SO THAT THEY CAN BE CONVERTED EASILY TO CAMEL CASE 
        let personalityLowerCase = personalityType[i].toLowerCase();
// CONVERT TO CAMELCASE SO WE CAN CYCLE THROUGH THE carrerArray 
        let personalityCamelCase = camalize(personalityLowerCase);

// LET (theSummary) HOLD THE GENERAL OVERVIEW OF EACH PERSONALITY
        let theSummary = careerArray[personalityCamelCase][0];

// LET (listContent) HOLD THE (newDomList) CONTENT. 
        let listContent = 
        "<h3 class='personalityTitle'>" + theTitle + " (" + personalities[i].length + ")" + "</h3>" +
        "<h4 class='personalityInfo'>(" + theSummary + ")</h4>" +
        "<p>You should pursue any of the following careers</p>" +
        "<ul class='list'></ul>";

// INSERT THE (listContent) TO THE (newDomList)
// FOR EACH PERSONALITY.
        newDomList.innerHTML = listContent;

// FECTH THE PERSONALITY UL
        let theList = newDomList.querySelector('.list');
// CREATE NEW LIST ELEMENTS AND LET THE HOLD THE CAREERS
// RELATED TO THAT PERSONALITY
// REMEMBER THE CAREERS START FROM 
        for (let j = 1; j < careerArray[personalityCamelCase].length; j++) {
            let newLi = document.createElement('li');
            newLi.innerHTML = careerArray[personalityCamelCase][j];
// ADD THE LIST TO THE PERSONALITY UL
            theList.appendChild(newLi);
        }
// IF PERSONALITY IS THE MOST DOMINANT
// ADD TO THE MOST DOMIMANT DIV  
        if (personalities[i].length == pSortedLengthArray[0]) {
            newDomList.setAttribute('class', 'careerList mostDominant md' + mostDomBox);
            newDomList.setAttribute('id', personalityType[i]);
            mostDominantList.appendChild(newDomList);
            mostDomBox++;
        }
// ELSE ADD TO THE LESS DOMIMANT DIV 
        else{
            newDomList.setAttribute('class', 'careerList lessDominant ld' + lessDomBox);
            newDomList.setAttribute('id', personalityType[i]);
            lessDominantList.appendChild(newDomList);
            lessDomBox++;
        }
    }
}, 10);
// END SET TIMEOUT
});
// IF THE CAREERS SHOW BUTTON IS CLICKED END===========//

// IF THE CHECK BUTTON IS CLICKED
checkLessDominant.addEventListener('click', () => {
    toggleContent(dominanceSwitch, 'most dominant personality', 'less dominant personalities');
    toggleStyle(mostDominantList,'opacity','0','1');
    toggleStyle(mostDominantList,'zIndex','-1','1');
    toggleStyle(lessDominantList,'opacity','1','0');
    toggleStyle(lessDominantList,'zIndex','1','-1');

// SET THE SCROLL POINT TO THE DEFAULT
dominanceList.forEach(domlist => {
        domlist.scrollLeft = 0;
        domlist.scrollTop = 0;
    });
});
// =========CAREER DISPLAY MODULE FUNCTIONALITIES END======================//
        }
// MAIN NAVIGATION READYSTATE AND STATUS CHECK END.    
}
// MAIN NAVIGATION ONREADYSTATE FUNCTION END.
http.open('GET','js/traits.json', true);
http.send();
// MAIN NAVIGATION AJAX CALL END===================================================//
