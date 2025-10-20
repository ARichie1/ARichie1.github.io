export{gameSong, activateClickSound, activateClearSound, 
    gameOverSong, codecrackedSong,
    pauseMusic,  resumeMusic,
    pauseSound, resumeSound,
    pauseAudio, resumeAudio,
    theAudioState}

//=====DEALING WITH SOUND=====//
let buttonSound = document.querySelector(".buttonSound");
let buttonSoundSource = document.querySelector(".buttonSoundSource");

let clickSound = document.querySelector(".clickSound");
let clickSoundSource = document.querySelector(".clickSoundSource");

let gameMusic = document.querySelector(".gameMusic");
let gameMusicSource = document.querySelector(".gameMusicSource");

let soundState = "play";
let musicState = "play";
let audioState = "play";
function pauseMusic() {musicState = "pause";gameMusic.pause();}
function resumeMusic() {musicState = "play";gameMusic.play();}
function pauseSound() {soundState = "pause"}
function resumeSound() {soundState = "play"}

function pauseAudio() {pauseMusic();pauseSound();audioState = "pause";}
function resumeAudio() {resumeMusic(); resumeSound();audioState = "play";}

function activateClickSound() {
    if (soundState == "play") {
        clickSoundSource.src = "assets/sounds/click.wav";
        clickSound.load();
        clickSound.removeAttribute("loop");
    }
}

function activateClearSound() {
	clickSoundSource.src = "assets/sounds/cancel.wav";
	clickSound.load();
	clickSound.removeAttribute("loop");
}

function gameOverSong() {
	clickSoundSource.src = "assets/sounds/gameover.wav";
	clickSound.load();
}

function gameSong() {
    if (musicState == "play") {
        gameMusicSource.src = "assets/sounds/gametune1.mp3";
        gameMusic.load();
        gameMusic.setAttribute('loop','');
    }
}

function codecrackedSong() {
    clickSoundSource.src = "assets/sounds/codecrackedb.wav";
    clickSoundSource.setAttribute("loop", "3");
    clickSound.load();
}

function theAudioState() {
    return audioState;
}