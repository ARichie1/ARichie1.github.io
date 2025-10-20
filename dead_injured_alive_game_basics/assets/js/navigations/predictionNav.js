export {predictionNav}
import {toggleStyle, 
    conditionallyToggleContentUsingStyle} from "../functions.js"
import {activateClickSound} from "../settings/audio.js" 

function predictionNav() {
//GET THE MAIN GAME DOM ELEMENTS
        const mainGameBtnLeft = document.querySelector('.btnLeft');
        const mainGameBtnRight = document.querySelector('.btnRight');
//GET THE PREDICTIONS DIV
        const opponetsPrediction = document.querySelector('.opponetsPrediction');
        const currentPrediction = document.querySelector('.currentPrediction');
        const yourPrediction = document.querySelector('.yourPrediction');

//PERFORM ACTIONS ON CLICK THE PREDICTIONS CONTROLS BUTTON(LEFT)
        mainGameBtnLeft.addEventListener('click', () => {
            toggleStyle(opponetsPrediction,
                 "left", "0%", "-100%");
                 toggleStyle(currentPrediction,
                    "left", "100%", "0%");
                    toggleStyle(yourPrediction,
                        "left", "200%", "100%");
                conditionallyToggleContentUsingStyle(
                    opponetsPrediction,"left", "0%", "-200%",
                    mainGameBtnLeft, "C", "O", 
                );
// ADD THE CLICK SOUND
            activateClickSound();
        });
//PERFORM ACTIONS ON CLICK THE PREDICTIONS CONTROLS BUTTON(LEFT) END.
   
//PERFORM ACTIONS ON CLICK THE PREDICTIONS CONTROLS BUTTON(RIGHT)
        mainGameBtnRight.addEventListener('click', () => {
            toggleStyle(opponetsPrediction,
                "left", "-200%", "-100%");
                toggleStyle(currentPrediction,
                   "left", "-100%", "0%");
                   toggleStyle(yourPrediction,
                       "left", "0%", "100%");
            conditionallyToggleContentUsingStyle(
                yourPrediction,"left", "0%", "200%",
                mainGameBtnRight, "C", "Y", 
            );
// ADD THE CLICK SOUND
            activateClickSound();
        });
//PERFORM ACTIONS ON CLICK THE PREDICTIONS CONTROLS BUTTON(RIGHT) END.
}