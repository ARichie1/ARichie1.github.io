import {toggleStyle, toggleContent} from "../functions.js";
export{defaultMode, darkMode, hideAll, showAll}

// LANGUAGE FUNCTIONS
let displayLanguage = document.querySelector(".displayLanguage");
let selectedLanguage = document.querySelector(".selectedLanguage");
let languagesContainer = document.querySelector(".languages");
let languages = document.querySelectorAll(".languages li");
let choosenLanguage;

displayLanguage.addEventListener('click', () => {
    toggleStyle(languagesContainer, "opacity", "1", "0");
    toggleStyle(languagesContainer, "zIndex", "3", "-3");
});
languages.forEach(language => {
    language.addEventListener('click', () => {
        selectedLanguage.innerHTML =  language.innerHTML;
        choosenLanguage =  language.innerHTML;
    });
});

// THEME FUNCTIONS
let root = document.querySelector(":root");
let mainBody = document.querySelector("body");
let themeText = document.querySelector(".displayThemeDark p");
let themeColor = "skyblue";

// Default Mode
function defaultMode() {
    mainBody.style.background = "#333";
    themeText.innerHTML = "Switch To Dark Mode";
}
// Dark Mode
function darkMode() {
    mainBody.style.background = "#000";
    themeText.innerHTML = "Switch To Light Mode";
}

// THEME CUSTOMIZER START=======================//
let settingsCustomize = document.querySelector(".settingsCustomize");
let themeCustomizer = document.querySelector(".themeCustomizer");
let customizers = document.querySelectorAll(".custom");

let colors = ['skyblue', '#000', 'orange', 'red', 'purple', 'pink', 'lightgreen' ];

// AUTOMATICALLY ADD THE DIFFERENT CUSTOM COLORS
// AS ELEMENTS TO THE THEME CUSTOMIZER
customizers.forEach(customizer => {
    let colorsHolder = document.createElement('div');
    colorsHolder.setAttribute('class', 'colorsHolder');
    customizer.appendChild(colorsHolder);

    colors.forEach(color => {
        let colorPicker = document.createElement('div');
        colorPicker.setAttribute('class', 'colorPicker');
        colorPicker.style.background = color;
        colorsHolder.appendChild(colorPicker);
    });
});

// GET ALL THE COLOR PICKERS
let colorPickers = document.querySelectorAll('.colorPicker');
colorPickers.forEach(colorPicker => {
    colorPicker.addEventListener('click', () => {
        let customId = colorPicker.parentElement.parentElement.id;
        let theColor = colorPicker.style.background;
        colorPicker.style.boxShadow = "var(--shadow)";
// UNSELECT THE UNCHOSEN COLORS
        colorPickers.forEach(picked => {
            let cycledCustomId = picked.parentElement.parentElement.id;
            if (cycledCustomId == customId && picked.style.background != theColor) {
                picked.style.boxShadow = "none";
            }
        });
// SET THE CUSTOM STYLE
        root.style.setProperty('--' + customId, theColor);
    });
});

// IF THE RESET BUTTON IS CLICKED
let resetCustomColors = document.querySelector('.resetCustomColors');
resetCustomColors.addEventListener('click', () => {
    root.style.setProperty('---backgroundColor', "#333");
    root.style.setProperty('--headerColor', '#000');
    root.style.setProperty('--headerFontColor', themeColor);
    root.style.setProperty('--themeColor', themeColor);
    root.style.setProperty('--themeFontColor', '#000');
// RESET ALL THE CUSTOM COLORS TO UNSELECTED
    colorPickers.forEach(picked => {
       picked.style.boxShadow = "none";
    });
});
// IF THE EDIT BUTTON IS CLICKED
settingsCustomize.addEventListener('click', () => {
    toggleStyle(themeCustomizer, "display", "block", "none");
    toggleStyle(themeCustomizer, "zIndex", "3", "-3");
    toggleContent(settingsCustomize,'Edit &#10004;', 'Edit &#10036;');
});
// THEME CUSTOMIZER END=======================//

// HIDE ITEMS
function hideAll(element) {
    root.style.setProperty('--' + element, 'none');
}
// SHOW ITEMS
function showAll(element) {
    root.style.setProperty('--' + element, 'block');
}

