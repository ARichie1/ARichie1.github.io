import {hide, unhide, toggleStyle} from "../functions.js";
import {activateClickSound} from "./audio.js";
export{hostSettings}

// =====HOST FUNCTIONALITY START=====//
function hostSettings(params) {
let multiplayerFaceOff = document.querySelector(".multiplayerFaceOff");
let hoster = document.querySelector(".hoster"); 
let joiner = document.querySelector(".joiner");
let hostSettingsButton = document.querySelector(".hostSettingsButton"); 
let hostSettings = document.querySelector(".hostSettings");

// ENABLE/DISABLE HOST SETINGS
// DEPENDING ON THE ON WHETHER 
// THE USER IS A HOST OR JOINED. 
hoster.addEventListener('click', () => {
// ENABLE/SHOW THE HOST SETTINGS
    unhide(hostSettingsButton);
});
joiner.addEventListener('click', () => {
// DISABLE/HIDE THE HOST SETTINGS
    hide(hostSettingsButton);
});
hostSettingsButton.addEventListener('click', () => {
        toggleStyle(hostSettings, "display", "flex", "none");
        toggleStyle(hostSettingsButton, "background",
         "var(--themeColor)", "transparent");
        toggleStyle(hostSettingsButton, "color",
         "var(--themeFontColor)", "var(--themeColor)");
        toggleStyle(multiplayerFaceOff, "opacity", "0.5", "1");
// ADD CLICK SOUND
        activateClickSound();
});

}
// =====THE HOST FUNCTIONALITY END=====//
