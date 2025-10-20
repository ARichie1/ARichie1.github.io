export{codeGenerator}

// THE MAIN CODE GENERATAION START========================//
function codeGenerator(diff) {
// CREATE THE SECRET CODE VARIABLE.
    let theCode;

// LET (genCode) HOLD THE ARRAY OF RANDOM NUMBERS(CODES)
    let genCode;
    
//=====RANDOM CODE GENARATION START=====//
// generateRandomNumber(min,max) WILL RETURN A RANDOM NUMBER
    function generateRandomNumber(min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
// uniqueRangeGenerator(rength,min,max) WILL RETURN A RANGE
// OF UNIQUE NUMBERS, EACH BETWEEN "MIN AND MAX"
//WITH RANGE LENGTH(rength) EQUAL TO THE DIFFICULTY.
    function uniqueRangeGenerator(rength,min,max) {
        const range = []
        while (range.length < (rength)) {
            var randomNumber = "_" + generateRandomNumber(min, max)
            if (range.indexOf(randomNumber) === -1) {
                    if (range.includes(randomNumber) == false) {
                            range.push(randomNumber); 
                    }
            }
        }
        return range
    }
// GENERATE THE CODE DEPENDING ON THE DIFFICULTY
    for (let i = 1; i < 7; i++) {
        if (diff == i) {
            genCode = uniqueRangeGenerator(i,0,9);
        }
    }
//=====RANDOM CODE GENERATION END=====//

// GET THE RANDOM GENERATED CODE TO BUILD THE MAIN CODE
// EACH IS MADE AN ARRAY SO WHEN WE CONCATENATE
// EACH BECOMES IT OWN ELEMENT IN THE MAIN CODE. 
    let a = [String(genCode[0])];
    let b = [String(genCode[1])];
    let c = [String(genCode[2])];
    let d = [String(genCode[3])];
    let e = [String(genCode[4])];
    let f = [String(genCode[5])];

// BUILD THE MAIN CODE 
    theCode = [];

// BUILD DIFFICULTY CODE
    let easy = a.concat(b);
    let medium = a.concat(b).concat(c);
    let hard = a.concat(b).concat(c).concat(d);
    let detective = a.concat(b).concat(c).concat(d).concat(e);
    let wizard = a.concat(b).concat(c).concat(d).concat(e).concat(f);

    // STORE ALL THE DIFFICULTY AS AN ARRAY
    let difficultyArray = [
        "", "", easy, medium, hard,
            detective, wizard
    ];

// CREATE THE MAIN CODE BASED ON THE DIFFICULTY
    for (let i = 2; i < difficultyArray.length; i++) {
            if (diff == i) {
                theCode = difficultyArray[i];
            }
    }
    console.log("theCode = " + theCode);
    return theCode;
// THE MAIN CODE GENERATAION END========================//
}
    
