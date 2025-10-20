// IMPORT TOGGLE FUNCTIONS
import {toggleStyle} from "../functions.js";
import {gameSong, activateClickSound, pauseMusic, 
        resumeMusic, pauseSound, resumeSound} from "./audio.js";
import{defaultMode, darkMode, hideAll, showAll} from "./display.js";
import{ profileSettings} from "./profile.js"
import{ hostSettings} from "./host.js"

let themeColor = "var(--themeColor)";

// PROFILE SETTINGS
    profileSettings();

// HOST SETTINGS
    hostSettings();

// =====THE SWITCH FUNCTIONALITY START=====//
const switchButton = document.querySelectorAll('.switchButton');
switchButton.forEach(sb => {
    sb.addEventListener('click', () =>{
// ADD CLICK SOUND
        activateClickSound();

        toggleStyle(sb, "transition", "0.5s ease-in", "0.5s ease-in");
        toggleStyle(sb, "marginLeft", "0%", "50%");
        toggleStyle(sb, "background", themeColor,
        "radial-gradient(#fff," + themeColor + ",#fff)");

        if (sb.style.marginLeft == "0%") {
            switch (sb.id) {
                case "musicControl":
                    pauseMusic(); break;
                case "soundControl" :
                    pauseSound();break;
                case "darkModeControl":
                    darkMode();break;
                case "statusTextControl":
                    hideAll("statusText");break;
                case "emojiControl":
                    hideAll("statusEmoji");break;
                case "countryControl":
                    hideAll("Country");break;
                case "rankControl":
                    hideAll("Rank");break;
            }
        }else if(sb.style.marginLeft == "50%"){
            switch (sb.id) {
                case "musicControl":
                    resumeMusic();
                    gameSong(); break;
                case "soundControl": 
                    resumeSound();break;
                case "darkModeControl":
                    defaultMode();break;
                case "statusTextControl":
                    showAll("statusText");break;
                case "emojiControl":
                    showAll("statusEmoji");break;
                case "countryControl":
                    showAll("Country");break;
                case "rankControl":
                    showAll("Rank");break;
            }
        }
    });
});

// PLAY GAME MUSIC
    gameSong();
// =====THE SWITCH FUNCTIONALITY END=====//


