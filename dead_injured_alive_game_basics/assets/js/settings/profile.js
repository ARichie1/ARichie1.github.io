import {hide, unhide, toggleStyle} from "../functions.js";
export{ profileSettings}

// PROFILE SETTINGS START==================//
function  profileSettings() {
    
// PROFILE PICTURE FUNCTIONALITIES START===============//
const avatarImageWrapper = document.querySelector(".avatarImageWrapper");
const avatarImageWrapperImages = document.querySelectorAll(".avatarImageWrapper img");
const controlLeft = document.querySelector(".controlLeft");
const controlRight = document.querySelector(".controlRight");

let positionInc = 0;
avatarImageWrapperImages.forEach( image => {
    image.style.left = positionInc + "%";
    positionInc = positionInc + 100;
});
let firstAvatarImg = avatarImageWrapper.firstElementChild;
let lastAvatarImg = avatarImageWrapper.lastElementChild;

controlLeft.addEventListener('click', () => {
    avatarImageWrapperImages.forEach(pf => {
        let currentPos = parseInt(pf.style.left);
        let goBack = currentPos - 100;
        pf.style.left = goBack + '%';
        if (pf.style.left == "0%") {pf.style.opacity = "1";}
        else if (pf.style.left != "0%") {pf.style.opacity = "0.2";}
        unhide(controlRight);
        if (lastAvatarImg.style.left == "0%"){hide(controlLeft);}
        else{unhide(controlLeft);}
    });
});
controlRight.addEventListener('click', () => {
    avatarImageWrapperImages.forEach(pf => {
        let currentPos = parseInt(pf.style.left);
        let goBack = currentPos + 100;
        pf.style.left = goBack + '%';
        if (pf.style.left == "0%") {pf.style.opacity = "1";}
        else if (pf.style.left != "0%") {pf.style.opacity = "0.2";}
        unhide(controlLeft);
        if (firstAvatarImg.style.left == "0%"){hide(controlRight);}
        else{unhide(controlRight);}
    });
});
// PROFILE PICTURE FUNCTIONALITIES END===============//

// PROFILE PASSWORD RESET FUNCTIONALITIES START===============//
const changePasswordButton = document.querySelector(".profilePasswordDiv button");
const profilePasswordReset = document.querySelector(".profilePasswordReset");
changePasswordButton.addEventListener('click', () => {
    toggleStyle(profilePasswordReset, "opacity", "1", "0");
    toggleStyle(profilePasswordReset, "zIndex", "3", "-3");
});
// PROFILE PASSWORD RESET FUNCTIONALITIES END===============//
}
// PROFILE SETTINGS END==================//